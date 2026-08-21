#!/usr/bin/env python3
"""Small dependency-free validation suite for the static directory."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"


class DocumentAudit(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.local_assets: list[str] = []
        self.has_title = False
        self.has_description = False
        self.has_canonical = False

    def handle_starttag(self, tag: str, attrs):
        data = dict(attrs)
        if data.get("id"):
            self.ids.append(data["id"])
        if tag == "title":
            self.has_title = True
        if tag == "meta" and data.get("name") == "description" and data.get("content"):
            self.has_description = True
        if tag == "link" and data.get("rel") == "canonical" and data.get("href"):
            self.has_canonical = True
        for key in ("src", "href"):
            value = data.get(key, "")
            if value and not value.startswith(("http://", "https://", "#", "mailto:", "tel:", "data:")):
                self.local_assets.append(value.split("?", 1)[0].split("#", 1)[0])


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def audit_html() -> None:
    parser = DocumentAudit()
    parser.feed(INDEX.read_text(encoding="utf-8"))

    duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
    if duplicates:
        fail(f"duplicate HTML ids: {', '.join(duplicates)}")
    if not (parser.has_title and parser.has_description and parser.has_canonical):
        fail("index.html must include title, meta description, and canonical URL")

    missing = sorted({asset for asset in parser.local_assets if asset and not (ROOT / asset).exists()})
    if missing:
        fail(f"missing local assets: {', '.join(missing)}")


def audit_catalog() -> None:
    files = [ROOT / "js/platforms.js", ROOT / "js/catalog-updates.js", ROOT / "js/ai-catalog.js"]
    text = "\n".join(path.read_text(encoding="utf-8") for path in files)
    if "http://" in text:
        fail("catalog contains non-HTTPS links")
    if text.count("https://") < 100:
        fail("catalog unexpectedly contains fewer than 100 HTTPS resources")

    # Catch accidental placeholder URLs or development hosts.
    forbidden = re.findall(r"https://[^\s'\"]*(?:example\.com|localhost|127\.0\.0\.1)[^\s'\"]*", text, re.I)
    if forbidden:
        fail(f"placeholder URLs found: {forbidden}")


def main() -> None:
    audit_html()
    audit_catalog()
    print("Static validation passed.")


if __name__ == "__main__":
    main()
