#!/usr/bin/env python3
"""Atualiza o snapshot público do RSS do UOL Esporte sobre o Corinthians."""

import html
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path


FEED_URL = "https://rss.esporte.uol.com.br/futebol/clubes/corinthians.xml"
OUTPUT = Path(__file__).with_name("noticias.json")


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []

    def handle_data(self, data):
        self.parts.append(data)


def plain_text(value):
    parser = TextExtractor()
    parser.feed(value or "")
    return re.sub(r"\s+", " ", html.unescape(" ".join(parser.parts))).strip()


def first_text(item, *names):
    for name in names:
        element = item.find(name)
        if element is not None and element.text:
            return element.text.strip()
    return ""


def iso_date(value):
    if not value:
        return None
    try:
        parsed = parsedate_to_datetime(value)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    except (TypeError, ValueError, OverflowError):
        return None


def main():
    request = urllib.request.Request(
        FEED_URL,
        headers={"User-Agent": "FielEmDados/1.0 (GitHub Actions; RSS reader)"},
    )
    with urllib.request.urlopen(request, timeout=25) as response:
        root = ET.fromstring(response.read())

    channel = root.find("channel")
    if channel is None:
        raise RuntimeError("O feed recebido não tem um canal RSS válido.")

    items = []
    for item in channel.findall("item"):
        title = plain_text(first_text(item, "title"))
        url = first_text(item, "link")
        if not title or not url.startswith("https://"):
            continue
        items.append({
            "title": title,
            "url": url,
            "summary": plain_text(first_text(item, "description"))[:280],
            "publishedAt": iso_date(first_text(item, "pubDate")),
            "source": "UOL Esporte",
        })
        if len(items) == 15:
            break

    if not items:
        raise RuntimeError("O feed foi recebido, mas não trouxe notícias válidas.")

    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
        "source": "UOL Esporte · Corinthians",
        "feedUrl": FEED_URL,
        "items": items,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Snapshot atualizado: {len(items)} notícias")


if __name__ == "__main__":
    main()
