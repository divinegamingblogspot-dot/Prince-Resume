#!/usr/bin/env python3
"""Static portfolio QA: local-link integrity and SEO metadata checks for GitHub Pages."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse, unquote
import sys

ROOT = Path(__file__).resolve().parents[1]
HTML_FILES = sorted(ROOT.rglob("*.html"))
SKIP_DIRS = {".git"}
BROKEN = []
WARNINGS = []
TOTAL_LINKS = 0

class Scanner(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.title = False
        self.in_title = False
        self.description = ""
        self.h1 = 0
        self.ids = set()
        self.links = []
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get("id"): self.ids.add(a["id"])
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if tag == "meta" and a.get("name", "").lower() == "description":
            self.description = a.get("content", "").strip()
        if tag in ("a", "link") and a.get("href"): self.links.append((a["href"], tag))
        if tag in ("img", "script") and a.get("src"): self.links.append((a["src"], tag))
        if tag == "link" and a.get("rel", "").lower() == "canonical":
            if not a.get("href", "").startswith("https://divinegamingblogspot-dot.github.io/Prince-Resume/"):
                WARNINGS.append(f"{self.path.relative_to(ROOT)}: canonical is outside the portfolio URL")
    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
    def handle_data(self, data):
        if self.in_title and data.strip(): self.title = True

def resolve_local(source, raw):
    p = urlparse(raw)
    if p.scheme or p.netloc or raw.startswith("//"): return None
    path = unquote(p.path)
    if not path: return source
    if path.startswith("/Prince-Resume/"): path = path[len("/Prince-Resume/"):]
    elif path.startswith("/"): path = path.lstrip("/")
    else: path = str((source.parent / path).relative_to(ROOT)) if not (source.parent / path).is_absolute() else path
    target = (ROOT / path).resolve()
    try: target.relative_to(ROOT.resolve())
    except ValueError: return None
    if target.is_dir(): target = target / "index.html"
    return target

for file in HTML_FILES:
    if any(part in SKIP_DIRS for part in file.parts): continue
    try: raw = file.read_text(encoding="utf-8")
    except Exception as e:
        BROKEN.append(f"{file.relative_to(ROOT)}: cannot read HTML ({e})"); continue
    scan = Scanner(file); scan.feed(raw)
    rel = file.relative_to(ROOT)
    if not scan.title: WARNINGS.append(f"{rel}: missing or empty <title>")
    if len(scan.description) < 50: WARNINGS.append(f"{rel}: missing/short meta description")
    if scan.h1 == 0: WARNINGS.append(f"{rel}: no H1 found")
    for href, tag in scan.links:
        global TOTAL_LINKS
        TOTAL_LINKS += 1
        if href.startswith("#"):
            anchor = href[1:]
            if anchor and anchor not in scan.ids:
                # JavaScript can create anchors dynamically; keep this as a warning.
                WARNINGS.append(f"{rel}: anchor #{anchor} not present in source")
            continue
        target = resolve_local(file, href)
        if target is not None and not target.exists():
            BROKEN.append(f"{rel}: missing local {tag} target {href}")

print(f"Portfolio QA: {len(HTML_FILES)} HTML pages scanned; {TOTAL_LINKS} local/external references inspected.")
print(f"SEO/content warnings: {len(WARNINGS)}")
for item in WARNINGS[:100]: print("WARN:", item)
print(f"Broken local targets: {len(BROKEN)}")
for item in BROKEN[:100]: print("ERROR:", item)
if BROKEN:
    sys.exit(1)
print("PASS: no missing local files referenced by HTML.")
