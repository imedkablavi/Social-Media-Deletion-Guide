#!/usr/bin/env python3
"""Dependency-free release validation for the static directory."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
CANONICAL = "https://imedkablavi.github.io/Social-Media-Deletion-Guide/"


class DocumentAudit(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: list[str] = []
        self.local_assets: list[str] = []
        self.scripts: list[dict[str, str | None]] = []
        self.language_option_tags: list[str] = []
        self.has_title = False
        self.has_description = False
        self.canonical: str | None = None
        self.app_version: str | None = None

    def handle_starttag(self, tag: str, attrs):
        data = dict(attrs)
        if data.get("id"):
            self.ids.append(data["id"])
        classes = set((data.get("class") or "").split())
        if "language-option" in classes:
            self.language_option_tags.append(tag)
        if tag == "title":
            self.has_title = True
        if tag == "meta" and data.get("name") == "description" and data.get("content"):
            self.has_description = True
        if tag == "meta" and data.get("name") == "app-version":
            self.app_version = data.get("content")
        if tag == "link" and data.get("rel") == "canonical" and data.get("href"):
            self.canonical = data["href"]
        if tag == "script" and data.get("src"):
            self.scripts.append(data)
        for key in ("src", "href"):
            value = data.get(key, "") or ""
            if value and not value.startswith(("http://", "https://", "#", "mailto:", "tel:", "data:")):
                self.local_assets.append(value.split("?", 1)[0].split("#", 1)[0])


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def audit_html() -> None:
    html = INDEX.read_text(encoding="utf-8")
    parser = DocumentAudit()
    parser.feed(html)

    duplicates = sorted({item for item in parser.ids if parser.ids.count(item) > 1})
    if duplicates:
        fail(f"duplicate HTML ids: {', '.join(duplicates)}")
    if not (parser.has_title and parser.has_description and parser.canonical):
        fail("index.html must include title, meta description, and canonical URL")
    if parser.canonical != CANONICAL:
        fail(f"unexpected canonical URL: {parser.canonical}")
    if len(parser.language_option_tags) != 4 or any(tag != "button" for tag in parser.language_option_tags):
        fail("all four language choices must be semantic buttons")
    if 'id="languageBtn"' not in html or 'aria-expanded="false"' not in html:
        fail("language menu button must expose collapsed aria-expanded state")
    if "css/components.css" in html:
        fail("unused legacy components.css must not be shipped in the render path")

    missing = sorted({asset for asset in parser.local_assets if asset and not (ROOT / asset).exists()})
    if missing:
        fail(f"missing local assets: {', '.join(missing)}")

    blocking = [script.get("src") for script in parser.scripts if "defer" not in script and "async" not in script]
    if blocking:
        fail(f"blocking external/local scripts found: {', '.join(str(item) for item in blocking)}")

    sources = [str(script.get("src") or "").split("?", 1)[0] for script in parser.scripts]
    required = ["js/ai-catalog.js", "js/catalog-maintenance.js", "js/brand-icons.js", "js/language-manager.js", "js/ui-manager.js", "js/pro-ui.js", "js/app.js"]
    for source in required:
        if source not in sources:
            fail(f"required runtime layer not loaded: {source}")
    if not (sources.index("js/ai-catalog.js") < sources.index("js/catalog-maintenance.js") < sources.index("js/brand-icons.js")):
        fail("catalog maintenance must load after AI additions and before UI rendering")

    if "css/a11y.css" not in html:
        fail("final accessibility focus layer is not loaded")

    ld_blocks = re.findall(r'<script\s+type="application/ld\+json">(.*?)</script>', html, re.S | re.I)
    if not ld_blocks:
        fail("index.html is missing JSON-LD structured data")
    for block in ld_blocks:
        try:
            json.loads(block)
        except json.JSONDecodeError as exc:
            fail(f"invalid JSON-LD: {exc}")

    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    if not parser.app_version or not parser.app_version.startswith(str(package.get("version", ""))):
        fail("package.json version and meta app-version are out of sync")


def audit_catalog() -> None:
    files = [ROOT / "js/platforms.js", ROOT / "js/catalog-updates.js", ROOT / "js/ai-catalog.js", ROOT / "js/catalog-maintenance.js"]
    text = "\n".join(path.read_text(encoding="utf-8") for path in files)
    if "http://" in text:
        fail("catalog contains non-HTTPS links")
    forbidden = re.findall(r"https://[^\s'\"]*(?:example\.com|localhost|127\.0\.0\.1)[^\s'\"]*", text, re.I)
    if forbidden:
        fail(f"placeholder URLs found: {forbidden}")
    if not (ROOT / "js/brand-icons.js").exists():
        fail("missing js/brand-icons.js")

    result = subprocess.run(
        ["node", str(ROOT / "scripts/export-effective-urls.js")],
        cwd=ROOT,
        text=True,
        capture_output=True,
        check=False,
    )
    if result.returncode != 0:
        fail(f"effective catalog export failed: {result.stderr.strip()}")
    urls = [line.strip() for line in result.stdout.splitlines() if line.strip()]
    if len(urls) < 100:
        fail(f"effective catalog unexpectedly contains only {len(urls)} URLs")
    if len(urls) != len(set(urls)):
        fail("effective URL export contains duplicates")

    stale_effective = {
        "https://github.com/settings/personal-data",
        "https://stackoverflow.com/help/data-portability",
        "https://proton.me/support/export-emails",
        "https://www.amazon.com/a/settings/security",
        "https://www.playstation.com/en-us/support/account/psn-security/",
        "https://www.playstation.com/en-us/support/account/playstation-information-request/",
    }
    found = sorted(stale_effective.intersection(urls))
    if found:
        fail(f"known stale URLs remain in effective catalog: {', '.join(found)}")


def audit_discovery_files() -> None:
    robots = ROOT / "robots.txt"
    sitemap = ROOT / "sitemap.xml"
    if not robots.exists() or not sitemap.exists():
        fail("robots.txt and sitemap.xml are required")

    robots_text = robots.read_text(encoding="utf-8")
    if f"Sitemap: {CANONICAL}sitemap.xml" not in robots_text:
        fail("robots.txt does not advertise the canonical sitemap")

    try:
        tree = ET.parse(sitemap)
    except ET.ParseError as exc:
        fail(f"invalid sitemap.xml: {exc}")
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locations = [node.text for node in tree.findall(".//sm:loc", ns)]
    if CANONICAL not in locations:
        fail("sitemap.xml does not include the canonical page")


def main() -> None:
    audit_html()
    audit_catalog()
    audit_discovery_files()
    print("Static validation passed.")


if __name__ == "__main__":
    main()
