#!/usr/bin/env python3
"""Atualiza o snapshot público de notícias do Corinthians via Google Notícias."""

import html
import json
import re
import time
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from html.parser import HTMLParser
from pathlib import Path


FEED_URL = "https://news.google.com/rss/search?q=Corinthians+futebol&hl=pt-BR&gl=BR&ceid=BR:pt-419"
OUTPUT = Path(__file__).with_name("noticias.json")
MAX_ATTEMPTS = 3


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
    root = None
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            request = urllib.request.Request(
                FEED_URL,
                headers={"User-Agent": "FielEmDados/1.0 (GitHub Actions; RSS reader)"},
            )
            with urllib.request.urlopen(request, timeout=25) as response:
                root = ET.fromstring(response.read())
            break
        except Exception as error:
            if attempt == MAX_ATTEMPTS:
                print(f"Aviso: feed indisponível após {MAX_ATTEMPTS} tentativas: {error}")
                print("O snapshot existente foi mantido; esta execução não gerou alterações.")
                return
            print(f"Feed indisponível (tentativa {attempt}/{MAX_ATTEMPTS}); tentando novamente.")
            time.sleep(attempt * 2)

    channel = root.find("channel")
    if channel is None:
        print("Aviso: resposta não contém um canal RSS; snapshot existente foi mantido.")
        return

    items = []
    for item in channel.findall("item"):
        title = plain_text(first_text(item, "title"))
        url = first_text(item, "link")
        if not title or not url.startswith("https://"):
            continue
        source = title.rsplit(" - ", 1)[-1].strip() if " - " in title else "Google Notícias"
        headline = title.rsplit(" - ", 1)[0].strip() if " - " in title else title
        items.append({
            "title": headline,
            "url": url,
            "summary": plain_text(first_text(item, "description"))[:280],
            "publishedAt": iso_date(first_text(item, "pubDate")),
            "source": source,
        })

    if not items:
        print("Aviso: feed sem notícias válidas; snapshot existente foi mantido.")
        return

    items.sort(key=lambda item: item["publishedAt"] or "", reverse=True)
    items = items[:15]

    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
        "source": "Google Notícias · Corinthians",
        "feedUrl": FEED_URL,
        "items": items,
    }
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Snapshot atualizado: {len(items)} notícias")


if __name__ == "__main__":
    main()
