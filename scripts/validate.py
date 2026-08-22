#!/usr/bin/env python3
"""Dependency-free release validation for source and generated production pages."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import json
import re
import struct
import subprocess
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
INDEX = ROOT / "index.html"
CANONICAL = "https://imedkablavi.github.io/Social-Media-Deletion-Guide/"
LANGUAGES = ("en", "ar", "fr", "tr")


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


def parse_sitemap(path: Path) -> list[str]:
    try:
        tree = ET.parse(path)
    except ET.ParseError as exc:
        fail(f"invalid sitemap {path}: {exc}")
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [node.text or "" for node in tree.findall(".//sm:loc", ns)]


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
        ["node", str(ROOT / "scripts/export-effective-urls.js")], cwd=ROOT,
        text=True, capture_output=True, check=False,
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


def audit_source_discovery_files() -> None:
    robots = ROOT / "robots.txt"
    sitemap = ROOT / "sitemap.xml"
    if not robots.exists() or not sitemap.exists():
        fail("source robots.txt and sitemap.xml fallbacks are required")
    if f"Sitemap: {CANONICAL}sitemap.xml" not in robots.read_text(encoding="utf-8"):
        fail("source robots.txt does not advertise the canonical sitemap")
    if CANONICAL not in parse_sitemap(sitemap):
        fail("source sitemap.xml does not include the canonical homepage")


def png_dimensions(path: Path) -> tuple[int, int]:
    data = path.read_bytes()[:24]
    if len(data) < 24 or data[:8] != b"\x89PNG\r\n\x1a\n":
        fail(f"{path} is not a valid PNG")
    return struct.unpack(">II", data[16:24])


def audit_generated_site() -> None:
    if not DIST.exists():
        fail("dist/ is missing; run npm run build before static validation")

    report_path = DIST / "build-report.json"
    if not report_path.exists():
        fail("generated build-report.json is missing")
    report = json.loads(report_path.read_text(encoding="utf-8"))
    if report.get("services", 0) < 50:
        fail(f"production build contains only {report.get('services')} services")
    if report.get("languages") != 4:
        fail("production build must contain exactly four language variants")
    if report.get("servicePages", 0) < 200:
        fail(f"expected at least 200 localized service pages, got {report.get('servicePages')}")

    home = (DIST / "index.html").read_text(encoding="utf-8")
    for required in ("build:seo-head", "build:service-guides", "assets/social-preview.png", "assets/favicon.svg", "site.webmanifest"):
        if required not in home:
            fail(f"production homepage missing generated SEO marker/asset: {required}")
    for lang in LANGUAGES:
        if f'href="{lang}/services/"' not in home:
            fail(f"production homepage does not link to {lang} service index")

    social = DIST / "assets/social-preview.png"
    if not social.exists():
        fail("1200x630 social preview image is missing")
    if png_dimensions(social) != (1200, 630):
        fail(f"social preview must be 1200x630, got {png_dimensions(social)}")

    manifest = DIST / "site.webmanifest"
    if not manifest.exists():
        fail("site.webmanifest is missing from production build")
    try:
        json.loads(manifest.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(f"invalid site.webmanifest: {exc}")

    robots = DIST / "robots.txt"
    sitemap = DIST / "sitemap.xml"
    if not robots.exists() or not sitemap.exists():
        fail("generated robots.txt and sitemap.xml are required")
    if f"Sitemap: {CANONICAL}sitemap.xml" not in robots.read_text(encoding="utf-8"):
        fail("generated robots.txt does not advertise the canonical sitemap")

    locations = parse_sitemap(sitemap)
    if len(locations) < 205:
        fail(f"generated sitemap contains only {len(locations)} URLs")
    if len(locations) != len(set(locations)):
        fail("generated sitemap contains duplicate URLs")
    if CANONICAL not in locations:
        fail("generated sitemap is missing the homepage")
    for lang in LANGUAGES:
        index_url = f"{CANONICAL}{lang}/services/"
        if index_url not in locations:
            fail(f"generated sitemap missing language service index: {index_url}")

    samples = {
        "en/services/openai/index.html": f"{CANONICAL}en/services/openai/",
        "ar/services/openai/index.html": f"{CANONICAL}ar/services/openai/",
        "tr/services/instagram/index.html": f"{CANONICAL}tr/services/instagram/",
        "fr/services/google/index.html": f"{CANONICAL}fr/services/google/",
    }
    for relative, canonical in samples.items():
        page_path = DIST / relative
        if not page_path.exists():
            fail(f"generated sample service page missing: {relative}")
        page = page_path.read_text(encoding="utf-8")
        if f'<link rel="canonical" href="{canonical}">' not in page:
            fail(f"wrong canonical in {relative}")
        if '<script src=' in page or '<script defer src=' in page:
            fail(f"service SEO page unexpectedly depends on JavaScript: {relative}")
        if 'BreadcrumbList' not in page or 'ItemList' not in page:
            fail(f"structured data missing from {relative}")
        if page.count('rel="alternate" hreflang=') < 5:
            fail(f"hreflang set incomplete in {relative}")
        ld_blocks = re.findall(r'<script\s+type="application/ld\+json">(.*?)</script>', page, re.S | re.I)
        if not ld_blocks:
            fail(f"JSON-LD missing from {relative}")
        for block in ld_blocks:
            try:
                json.loads(block)
            except json.JSONDecodeError as exc:
                fail(f"invalid generated JSON-LD in {relative}: {exc}")

    if not (DIST / "404.html").exists() or 'noindex' not in (DIST / "404.html").read_text(encoding="utf-8"):
        fail("production 404.html must exist and be noindex")


def main() -> None:
    audit_html()
    audit_catalog()
    audit_source_discovery_files()
    audit_generated_site()
    print("Static validation passed for source and generated SEO site.")


if __name__ == "__main__":
    main()
