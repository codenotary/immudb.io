#!/usr/bin/env python3
"""
Import blog posts from the immudb.io HubSpot blog into content/blog/.

immudb.io's blog lives in HubSpot, not in this repo, so there is nothing to copy
from — the posts have to be read off the live site. Metadata comes from the RSS
feed (title, date, tags, author, featured image), which is clean and structured;
the feed's `content:encoded` is only a teaser, so the body is read from the post
page and converted from HubSpot's markup to markdown.

Images are downloaded into static/blog/ rather than hotlinked, so the site does
not depend on the old CMS staying up.

Usage:  python3 scripts/import-blog-posts.py [--since YEAR] [--dry-run]
"""
import argparse
import html
import os
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FEED = "https://immudb.io/blog/rss.xml"
OUT = os.path.join(ROOT, "content", "blog")
IMG_DIR = os.path.join(ROOT, "static", "blog")
UA = {"User-Agent": "Mozilla/5.0 (immudb.io blog import)"}
MONTHS = "January February March April May June July August September October November December".split()


def fetch(url, binary=False):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        raw = r.read()
    return raw if binary else raw.decode("utf-8", "replace")


# --------------------------------------------------------------------- metadata

def feed_entries():
    """Post metadata from the RSS feed, newest first."""
    root = ET.fromstring(fetch(FEED))
    ns = {"dc": "http://purl.org/dc/elements/1.1/"}
    out = []
    for it in root.findall(".//item"):
        link = (it.findtext("link") or "").strip()
        pub = (it.findtext("pubDate") or "").strip()
        # RFC-822: "Mon, 03 Aug 2026 06:59:59 GMT"
        m = re.match(r"\w+, (\d{2}) (\w{3}) (\d{4})", pub)
        if not (link and m):
            continue
        day, mon, year = m.groups()
        month = next(i for i, n in enumerate(MONTHS, 1) if n.lower().startswith(mon.lower()))
        out.append({
            "slug": link.rstrip("/").rsplit("/", 1)[-1],
            "url": link,
            "title": html.unescape((it.findtext("title") or "").strip()),
            "date": f"{year}-{month:02d}-{day}",
            "year": int(year),
            "tags": [c.text.strip() for c in it.findall("category") if c.text],
            # dc:creator is the blog's name ("blog") on this feed, not a person.
            "author": (lambda a: "" if a.lower() in ("blog", "admin", "immudb") else a)(
                (it.findtext("dc:creator", namespaces=ns) or "").strip()),
        })
    return out


# ------------------------------------------------------------------- conversion

BLOCK = {"p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "pre", "blockquote", "div"}
SKIP = {"script", "style", "form", "button", "svg", "iframe"}


class ToMarkdown(HTMLParser):
    """HubSpot post markup -> markdown. Deliberately narrow: it handles the tags
    these posts actually use and drops presentational wrappers."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out = []
        self.skip_depth = 0
        self.list_stack = []
        self.in_pre = False
        self.href = None
        self.link_text = []
        self.images = []

    # -- helpers
    def emit(self, s):
        (self.link_text if self.href is not None else self.out).append(s)

    def nl(self, n=1):
        while self.out and self.out[-1] == "\n":
            self.out.pop()
        self.out.append("\n" * n)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag in ("b", "strong"):
            self.emit("**")
        elif tag in ("i", "em"):
            self.emit("*")
        elif tag == "code" and not self.in_pre:
            self.emit("`")
        elif tag == "pre":
            self.in_pre = True
            self.nl(2)
            self.out.append("```\n")
        elif tag == "br":
            self.out.append("  \n")
        elif tag == "a":
            self.href = a.get("href", "")
            self.link_text = []
        elif tag == "img":
            src = a.get("src", "")
            if src:
                self.images.append(src)
                alt = (a.get("alt") or "").replace("]", ")")
                self.nl(2)
                self.out.append(f"![{alt}]({src})")
                self.nl(2)
        elif tag in ("ul", "ol"):
            self.list_stack.append(tag)
            self.nl(2)
        elif tag == "li":
            self.nl(1)
            depth = max(0, len(self.list_stack) - 1)
            marker = "1. " if (self.list_stack and self.list_stack[-1] == "ol") else "- "
            self.out.append("  " * depth + marker)
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self.nl(2)
            self.out.append("#" * int(tag[1]) + " ")
        elif tag == "blockquote":
            self.nl(2)
            self.out.append("> ")
        elif tag in BLOCK:
            self.nl(2)

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip_depth = max(0, self.skip_depth - 1)
            return
        if self.skip_depth:
            return
        if tag in ("b", "strong"):
            self.emit("**")
        elif tag in ("i", "em"):
            self.emit("*")
        elif tag == "code" and not self.in_pre:
            self.emit("`")
        elif tag == "pre":
            self.in_pre = False
            self.nl(1)
            self.out.append("```")
            self.nl(2)
        elif tag == "a":
            text = "".join(self.link_text).strip()
            href, self.href, self.link_text = self.href, None, []
            if text:
                self.out.append(f"[{text}]({href})" if href else text)
        elif tag in ("ul", "ol"):
            if self.list_stack:
                self.list_stack.pop()
            self.nl(2)
        elif tag in BLOCK:
            self.nl(2)

    def handle_data(self, data):
        if self.skip_depth:
            return
        if self.in_pre:
            self.out.append(data)
            return
        text = re.sub(r"\s+", " ", data)
        if text.strip() or (self.out and not self.out[-1].endswith("\n")):
            self.emit(text)

    def result(self):
        md = "".join(self.out)
        md = re.sub(r"[ \t]+\n", "\n", md)
        md = re.sub(r"[ \t]{2,}", " ", md)
        # HubSpot wraps images and spacers in emphasis tags that convert to
        # orphan "**" lines; and its headings are bolded inside the <h2>.
        md = re.sub(r"^\s*[*_]{1,3}\s*$", "", md, flags=re.M)
        md = re.sub(r"^(#{1,6} )(.*)$",
                    lambda m: m.group(1) + m.group(2).replace("**", "").strip(), md, flags=re.M)
        md = re.sub(r"\*\*\s*\*\*", "", md)
        md = re.sub(r"^#{1,6}\s*$", "", md, flags=re.M)
        md = re.sub(r"\n{3,}", "\n\n", md)
        return md.strip() + "\n"


def extract_body(page):
    """The post body div. HubSpot wraps it in blog-post__body."""
    m = re.search(r'<div class="blog-post__body">(.*?)</div>\s*(?:</article>|<div class="blog-post__)', page, re.S)
    if not m:
        m = re.search(r'id="hs_cos_wrapper_post_body"[^>]*>(.*?)</div>\s*</div>', page, re.S)
    if not m:
        raise SystemExit("could not locate the post body")
    return m.group(1)


SNIFF = {b"\x89PNG": ".png", b"\xff\xd8\xff": ".jpg", b"GIF8": ".gif", b"RIFF": ".webp", b"<svg": ".svg"}


def localise_images(md, urls, slug, dry):
    """Download every referenced image into static/blog/ and repoint the markdown.

    Names are derived from the post slug, not the remote filename: HubSpot serves
    some images from Google with a 130-character opaque id and no extension."""
    os.makedirs(IMG_DIR, exist_ok=True)
    for i, u in enumerate(dict.fromkeys(urls), 1):
        base = urllib.parse.unquote(u.split("?")[0].rsplit("/", 1)[-1])
        stem, ext = os.path.splitext(re.sub(r"[^A-Za-z0-9._-]", "-", base))
        if not ext or len(stem) > 40:
            stem, ext = f"{slug[:48]}-{i}", ext or ""
        data = None
        if not dry:
            try:
                data = fetch(u, binary=True)
            except Exception as e:  # noqa: BLE001 - report and carry on
                print(f"    ! image failed {u}: {e}", file=sys.stderr)
                continue
            if not ext:
                head = data[:8]
                ext = next((v for k, v in SNIFF.items() if head.startswith(k)), ".img")
        name = stem + (ext or ".img")
        dest = os.path.join(IMG_DIR, name)
        if data is not None:
            with open(dest, "wb") as fh:
                fh.write(data)
        md = md.replace(u, f"/blog/{name}")
    return md


def yaml_str(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--since", type=int, default=2025, help="import posts from this year onward")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    entries = [e for e in feed_entries() if e["year"] >= args.since]
    print(f"{len(entries)} post(s) dated {args.since} or later")
    if not entries:
        return

    os.makedirs(OUT, exist_ok=True)
    for e in entries:
        print(f"  {e['date']}  {e['slug']}")
        parser = ToMarkdown()
        parser.feed(extract_body(fetch(e["url"])))
        md = parser.result()
        md = localise_images(md, parser.images, e["slug"], args.dry_run)

        # The first paragraph doubles as the excerpt when the feed has none.
        def prose(line):
            t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", line.strip())
            return re.sub(r"[*`_]", "", t).strip()

        first = next((prose(l) for l in md.split("\n")
                      if not l.startswith(("#", "!", "-", ">", "|", "```"))
                      and not re.match(r"\d+\.\s", l.strip())
                      and len(prose(l)) > 60), "")
        excerpt = first[:200].rsplit(" ", 1)[0] if len(first) > 200 else first

        lead = next((m for m in re.findall(r"!\[[^\]]*\]\((/blog/[^)]+)\)", md)), "")
        front = [
            "---",
            f"title: {yaml_str(e['title'])}",
            f"date: {e['date']}",
            f"excerpt: {yaml_str(excerpt)}",
            f"tags: [{', '.join(yaml_str(t) for t in e['tags'])}]" if e["tags"] else "tags: []",
            f"author: {yaml_str(e['author'])}" if e["author"] else None,
            f"image: {yaml_str(lead)}" if lead else None,
            f"source: {yaml_str(e['url'])}",
            "---",
            "",
        ]
        doc = "\n".join(x for x in front if x is not None) + md
        dest = os.path.join(OUT, e["slug"] + ".md")
        if args.dry_run:
            print(f"    would write {os.path.relpath(dest, ROOT)} ({len(doc)} bytes, {len(parser.images)} image(s))")
        else:
            with open(dest, "w", encoding="utf-8") as fh:
                fh.write(doc)
            print(f"    wrote {os.path.relpath(dest, ROOT)} ({len(doc)} bytes, {len(parser.images)} image(s))")


if __name__ == "__main__":
    import urllib.parse  # noqa: E402  (used by localise_images)
    main()
