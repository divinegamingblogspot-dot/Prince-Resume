#!/usr/bin/env python3
"""Static-site QA: local links, canonical metadata, sitemap integrity and basic SEO checks."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://divinegamingblogspot-dot.github.io/Prince-Resume/"
HTML_FILES = sorted(ROOT.rglob("*.html"))
BROKEN, WARNINGS = [], []
TOTAL_LINKS = 0
SITEMAP_PATHS = {
    "work/case-multybyte.html", "work/case-aurelia.html", "work/case-prince-os.html",
    "work/case-image-sync.html", "work/case-product-data.html", "work/case-ai-prototype.html",
    "studio.html", "start-a-project.html",
}

class Scanner(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.title, self.in_title = path, "", False
        self.description, self.canonical, self.h1, self.noindex = "", "", 0, False
        self.ids, self.links, self.scripts = set(), [], []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"): self.ids.add(a["id"])
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if tag == "meta" and a.get("name", "").lower() == "description":
            self.description = a.get("content", "").strip()
        if tag == "meta" and a.get("name", "").lower() == "robots" and "noindex" in a.get("content", "").lower():
            self.noindex = True
        if tag in ("a", "link") and a.get("href"): self.links.append((a["href"], tag))
        if tag == "script" and a.get("src"): self.scripts.append(a["src"])
        if tag in ("img", "script") and a.get("src"): self.links.append((a["src"], tag))
        if tag == "link" and a.get("rel", "").lower() == "canonical":
            self.canonical = a.get("href", "").strip()
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
    def handle_data(self, data):
        if self.in_title: self.title += data.strip()

def resolve_local(source, raw):
    p = urlparse(raw)
    if p.scheme or p.netloc or raw.startswith("//"): return None
    path = unquote(p.path)
    if not path: return source
    if path.startswith("/Prince-Resume/"):
        target = (ROOT / path[len("/Prince-Resume/"):]).resolve()
    elif path.startswith("/"):
        target = (ROOT / path.lstrip("/")).resolve()
    else:
        target = (source.parent / path).resolve()
    try: target.relative_to(ROOT.resolve())
    except ValueError: return None
    if target.is_dir(): target = target / "index.html"
    return target

titles = {}
descriptions = {}
scans = {}
for file in HTML_FILES:
    if ".git" in file.parts: continue
    try: raw = file.read_text(encoding="utf-8")
    except Exception as e:
        BROKEN.append(f"{file.relative_to(ROOT)}: cannot read HTML ({e})"); continue
    scan = Scanner(file); scan.feed(raw); scans[file] = scan
    rel = file.relative_to(ROOT).as_posix()
    if not scan.title.strip(): WARNINGS.append(f"{rel}: missing or empty <title>")
    else:
        titles.setdefault(scan.title.strip(), []).append(rel)
    if len(scan.description) < 50: WARNINGS.append(f"{rel}: missing/short meta description")
    else: descriptions.setdefault(scan.description, []).append(rel)
    if scan.h1 == 0: WARNINGS.append(f"{rel}: no H1 found")
    if not scan.noindex:
        if not scan.canonical:
            WARNINGS.append(f"{rel}: missing canonical")
        elif not scan.canonical.startswith(BASE):
            WARNINGS.append(f"{rel}: canonical is outside the portfolio URL")
        else:
            expected = BASE + ("" if rel == "index.html" else rel)
            if scan.canonical.rstrip("/") != expected.rstrip("/"):
                WARNINGS.append(f"{rel}: canonical path differs from this file ({scan.canonical})")
    seen_scripts = set()
    for src in scan.scripts:
        if src in seen_scripts: BROKEN.append(f"{rel}: duplicate script include {src}")
        seen_scripts.add(src)
    for href, tag in scan.links:
        TOTAL_LINKS += 1
        if href.startswith("#"):
            anchor = href[1:]
            if anchor and anchor not in scan.ids:
                WARNINGS.append(f"{rel}: anchor #{anchor} not present in source")
            continue
        target = resolve_local(file, href)
        if target is not None and not target.exists():
            BROKEN.append(f"{rel}: missing local {tag} target {href}")

for title, files in titles.items():
    if len(files) > 1: WARNINGS.append(f"duplicate title {title!r}: {', '.join(files)}")
for desc, files in descriptions.items():
    if len(files) > 1: WARNINGS.append(f"duplicate meta description on: {', '.join(files)}")

try:
    tree = ET.parse(ROOT / "sitemap.xml")
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [e.text.strip() for e in tree.findall(".//sm:loc", ns) if e.text and e.text.strip()]
    if len(locs) != len(set(locs)): BROKEN.append("sitemap.xml: duplicate <loc> entries")
    loc_set = set(locs)
    for path in sorted(SITEMAP_PATHS):
        url = BASE + path
        if url not in loc_set: BROKEN.append(f"sitemap.xml: required case/studio URL missing: {url}")
    for url in locs:
        if not url.startswith(BASE):
            WARNINGS.append(f"sitemap.xml: URL outside portfolio base: {url}")
            continue
        rel = url[len(BASE):]
        target = ROOT / (rel if rel else "index.html")
        if target.is_dir(): target = target / "index.html"
        if not target.exists(): BROKEN.append(f"sitemap.xml: URL has no local file: {url}")
    print(f"PASS: sitemap XML parsed; {len(locs)} unique URL(s) checked.")
except Exception as e:
    BROKEN.append(f"sitemap.xml: invalid XML or sitemap check failed ({e})")

print(f"Portfolio QA: {len(HTML_FILES)} HTML pages scanned; {TOTAL_LINKS} references inspected.")
print(f"SEO/content warnings: {len(WARNINGS)}")
for item in WARNINGS[:100]: print("WARN:", item)
if len(WARNINGS) > 100: print(f"... {len(WARNINGS)-100} additional warnings omitted.")
print(f"Broken local targets / sitemap errors: {len(BROKEN)}")
for item in BROKEN[:100]: print("ERROR:", item)
if BROKEN: sys.exit(1)
print("PASS: no missing local targets; sitemap is consistent for required pages.")
