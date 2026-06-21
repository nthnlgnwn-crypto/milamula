#!/usr/bin/env python3
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "exports" / "talemori-kit-01-wireframe-v01.pdf"

PAGE_W, PAGE_H = A4
MARGIN = 16 * mm
SAFE_W = PAGE_W - 2 * MARGIN

INK = colors.HexColor("#243746")
MUTED = colors.HexColor("#6f725e")
PAPER = colors.HexColor("#fff8e8")
PARCHMENT = colors.HexColor("#f6edd7")
CREAM = colors.HexColor("#fffdf7")
LEAF = colors.HexColor("#52612f")
LEAF_DARK = colors.HexColor("#37421f")
GOLD = colors.HexColor("#d79b32")
MOON = colors.HexColor("#d9dfd4")
LINE = colors.HexColor("#d8c8a4")
BARK = colors.HexColor("#8f5d30")


STORY_PAGES = [
    {
        "title": "The Missing Glow",
        "text": [
            "Mori held up the Lantern of Little Lights.",
            "One light twinkled.",
            "One light hummed.",
            "But one little glow was gone.",
        ],
        "art": "Mori in the story forest holding the lantern. One glow space is empty.",
    },
    {
        "title": "The Leaf That Shimmered",
        "text": [
            "On a mossy leaf, Mori saw a tiny shimmer.",
            '"Maybe the moonlight left a path," Mori whispered.',
            "So Mori took one small step.",
        ],
        "art": "Close view of a mossy leaf with a tiny moonlight shimmer trail.",
    },
    {
        "title": "The Quiet Path",
        "text": [
            "The path became very quiet.",
            "Mori held the lantern close.",
            '"I feel a little unsure," said Mori.',
            "Mori breathed in.",
            "Mori breathed out.",
        ],
        "art": "Mori pauses at a gentle forked path. Soft shadows, no scary darkness.",
    },
    {
        "title": "Three Little Clues",
        "text": [
            "Then Mori found three little clues.",
            "A silver feather.",
            "A moon-shaped stone.",
            "And a sleepy seed.",
            '"Which one needs the light?" Mori wondered.',
        ],
        "art": "Three clues on the forest floor: feather, moon stone, sleepy seed.",
    },
    {
        "title": "The Sleepy Seed",
        "text": [
            "Mori leaned close to the sleepy seed.",
            "The missing moonlight glowed beside it.",
            '"I wanted to grow," whispered the seed,',
            '"but beginning felt too big."',
        ],
        "art": "A tiny seed under a leaf blanket with moonlight beside it.",
    },
    {
        "title": "One Little Light",
        "text": [
            "Mori smiled softly.",
            '"We can begin small."',
            "Not too bright.",
            "Not too fast.",
            "Just one little light.",
        ],
        "art": "The lantern sends one gentle warm glow toward the sleepy seed.",
    },
    {
        "title": "A Brave Beginning",
        "text": [
            "The seed gave a tiny stretch.",
            "The moonlight sparkled back into Mori's lantern.",
            "Mori whispered,",
            '"A little light for every brave beginning."',
        ],
        "art": "A tiny sprout begins. Moonlight returns to Mori's lantern.",
    },
    {
        "title": "Little Light Keeper",
        "text": [
            "Mori carried the lantern home.",
            "The story forest glowed softly.",
            '"Thank you, Little Light Keeper,"',
            "Mori said.",
            '"You helped the little light find its way."',
        ],
        "art": "Mori faces the reader with the glowing lantern and badge motif.",
    },
]


def hex_fill(c, color):
    c.setFillColor(color)


def hex_stroke(c, color):
    c.setStrokeColor(color)


def draw_background(c):
    hex_fill(c, PAPER)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    hex_fill(c, colors.Color(1, 1, 1, alpha=0.35))
    c.roundRect(MARGIN / 2, MARGIN / 2, PAGE_W - MARGIN, PAGE_H - MARGIN, 8, fill=1, stroke=0)


def draw_brand(c, page_label=""):
    c.setFont("Helvetica-Bold", 8)
    hex_fill(c, LEAF)
    c.drawString(MARGIN, PAGE_H - 11 * mm, "TaleMori")
    c.setFont("Helvetica", 7)
    hex_fill(c, MUTED)
    if page_label:
        c.drawRightString(PAGE_W - MARGIN, PAGE_H - 11 * mm, page_label)


def draw_footer(c, page_num):
    c.setFont("Helvetica", 7)
    hex_fill(c, MUTED)
    c.drawCentredString(PAGE_W / 2, 8 * mm, f"Mori and the Lost Moonlight - Wireframe v01 - Page {page_num}")


def draw_wrapped(c, text, x, y, width, font="Helvetica", size=10, leading=14, color=INK):
    c.setFont(font, size)
    hex_fill(c, color)
    paragraphs = text.split("\n")
    for paragraph in paragraphs:
        if not paragraph:
            y -= leading
            continue
        words = paragraph.split()
        line = ""
        for word in words:
            candidate = f"{line} {word}".strip()
            if c.stringWidth(candidate, font, size) <= width:
                line = candidate
            else:
                c.drawString(x, y, line)
                y -= leading
                line = word
        if line:
            c.drawString(x, y, line)
            y -= leading
        y -= leading * 0.25
    return y


def draw_title(c, title, subtitle=None):
    c.setFont("Times-Bold", 26)
    hex_fill(c, INK)
    c.drawString(MARGIN, PAGE_H - 30 * mm, title)
    if subtitle:
        y = PAGE_H - 40 * mm
        draw_wrapped(c, subtitle, MARGIN, y, SAFE_W, "Helvetica", 11, 15, MUTED)


def draw_badge_mark(c, x, y, r=13 * mm):
    hex_fill(c, GOLD)
    hex_stroke(c, BARK)
    c.circle(x, y, r, fill=1, stroke=1)
    hex_fill(c, CREAM)
    c.circle(x, y, r * 0.66, fill=1, stroke=0)
    hex_fill(c, LEAF)
    c.setFont("Helvetica-Bold", 7)
    c.drawCentredString(x, y - 2, "LIGHT")


def draw_placeholder(c, x, y, w, h, title, note):
    hex_fill(c, PARCHMENT)
    hex_stroke(c, LINE)
    c.roundRect(x, y, w, h, 8, fill=1, stroke=1)
    hex_fill(c, colors.Color(0.82, 0.67, 0.36, alpha=0.22))
    c.roundRect(x + 5 * mm, y + 5 * mm, w - 10 * mm, h - 10 * mm, 6, fill=1, stroke=0)
    draw_badge_mark(c, x + w / 2, y + h / 2 + 12 * mm, 12 * mm)
    c.setFont("Helvetica-Bold", 11)
    hex_fill(c, LEAF_DARK)
    c.drawCentredString(x + w / 2, y + h / 2 - 7 * mm, title)
    y2 = draw_wrapped(c, note, x + 12 * mm, y + h / 2 - 18 * mm, w - 24 * mm, "Helvetica", 8, 10, MUTED)
    return y2


def draw_section_label(c, text, x, y):
    c.setFont("Helvetica-Bold", 8)
    hex_fill(c, GOLD)
    c.drawString(x, y, text.upper())


def draw_box(c, x, y, w, h, title, body, fill=CREAM):
    hex_fill(c, fill)
    hex_stroke(c, LINE)
    c.roundRect(x, y, w, h, 6, fill=1, stroke=1)
    c.setFont("Helvetica-Bold", 11)
    hex_fill(c, LEAF_DARK)
    c.drawString(x + 6 * mm, y + h - 10 * mm, title)
    draw_wrapped(c, body, x + 6 * mm, y + h - 18 * mm, w - 12 * mm, "Helvetica", 8.6, 11, INK)


def draw_cover(c):
    draw_background(c)
    draw_brand(c, "Printable pilot wireframe")
    hex_fill(c, LEAF_DARK)
    c.rect(0, PAGE_H - 70 * mm, PAGE_W, 70 * mm, fill=1, stroke=0)
    hex_fill(c, PAPER)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(MARGIN, PAGE_H - 22 * mm, "TaleMori Adventure Kit #1")
    c.setFont("Times-Bold", 30)
    c.drawString(MARGIN, PAGE_H - 36 * mm, "Mori and the")
    c.drawString(MARGIN, PAGE_H - 49 * mm, "Lost Moonlight")
    c.setFont("Helvetica", 11)
    c.drawString(MARGIN, PAGE_H - 61 * mm, "A ready-to-use story adventure for ages 4-7")
    draw_placeholder(
        c,
        MARGIN,
        58 * mm,
        SAFE_W,
        112 * mm,
        "Cover illustration placeholder",
        "Final art: Mori holding the Lantern of Little Lights in the story forest.",
    )
    c.setFont("Times-Italic", 15)
    hex_fill(c, LEAF_DARK)
    c.drawCentredString(PAGE_W / 2, 35 * mm, "A little light for every brave beginning.")
    draw_footer(c, 1)
    c.showPage()


def draw_parent_guide(c):
    draw_background(c)
    draw_brand(c, "Parent quick-start")
    draw_title(c, "Parent Quick-Start Guide", "Print the pages, choose a calm spot, and begin with the story.")
    box_w = (SAFE_W - 8 * mm) / 2
    top = PAGE_H - 90 * mm
    draw_box(c, MARGIN, top, box_w, 42 * mm, "Setup time", "1 minute if printed already. Put out crayons, colored pencils, or markers.")
    draw_box(c, MARGIN + box_w + 8 * mm, top, box_w, 42 * mm, "Materials", "Printed kit pages. Coloring tools. A calm place to read and draw.")
    draw_box(c, MARGIN, top - 50 * mm, box_w, 50 * mm, "Short version", "Read the story. Complete the Moonlight Path. Finish with one small light.")
    draw_box(c, MARGIN + box_w + 8 * mm, top - 50 * mm, box_w, 50 * mm, "Full version", "Read the story. Do all three activities. Finish the Little Light Keeper Badge.")
    draw_box(
        c,
        MARGIN,
        top - 108 * mm,
        SAFE_W,
        44 * mm,
        "Helpful prompts",
        "What do you notice in Mori's lantern? Which clue should Mori follow? What is one small step you can try today?",
    )
    draw_box(
        c,
        MARGIN,
        top - 160 * mm,
        SAFE_W,
        38 * mm,
        "Gentle closing ritual",
        'Hold up the finished page and say: "Mori says thank you, Little Light Keeper." Then repeat: "A little light for every brave beginning."',
        fill=PARCHMENT,
    )
    draw_footer(c, 2)
    c.showPage()


def draw_story_page(c, page, index):
    draw_background(c)
    draw_brand(c, f"Story page {index}")
    c.setFont("Helvetica-Bold", 8)
    hex_fill(c, GOLD)
    c.drawString(MARGIN, PAGE_H - 25 * mm, f"PAGE {index}")
    c.setFont("Times-Bold", 24)
    hex_fill(c, INK)
    c.drawString(MARGIN, PAGE_H - 37 * mm, page["title"])
    draw_placeholder(c, MARGIN, PAGE_H - 160 * mm, SAFE_W, 104 * mm, "Illustration placeholder", page["art"])
    text_y = PAGE_H - 178 * mm
    for line in page["text"]:
        c.setFont("Times-Roman", 16)
        hex_fill(c, INK)
        c.drawString(MARGIN + 8 * mm, text_y, line)
        text_y -= 10 * mm
    draw_footer(c, index + 2)
    c.showPage()


def draw_moonlight_path(c):
    draw_background(c)
    draw_brand(c, "Activity")
    draw_title(c, "Help Mori Follow the Moonlight Path", "Color one light at each stop. Can you help Mori remember the way?")
    stops = ["Empty lantern", "Shimmering leaf", "Quiet path", "Sleepy seed", "Lantern home"]
    start_x = MARGIN + 18 * mm
    start_y = PAGE_H - 95 * mm
    gap = 34 * mm
    hex_stroke(c, LINE)
    c.setLineWidth(2)
    c.bezier(start_x, start_y, start_x + 40 * mm, start_y - 30 * mm, start_x + 80 * mm, start_y + 22 * mm, start_x + 128 * mm, start_y - 15 * mm)
    for i, stop in enumerate(stops):
        x = start_x + (i % 2) * 72 * mm
        y = start_y - i * gap
        hex_fill(c, CREAM)
        hex_stroke(c, GOLD)
        c.circle(x, y, 11 * mm, fill=1, stroke=1)
        c.setFont("Helvetica-Bold", 8)
        hex_fill(c, LEAF_DARK)
        c.drawCentredString(x, y - 2, str(i + 1))
        c.setFont("Helvetica", 10)
        hex_fill(c, INK)
        c.drawString(x + 15 * mm, y - 3, stop)
    draw_box(c, MARGIN, 24 * mm, SAFE_W, 28 * mm, "Parent prompt", "Which stop came first? Which stop came last?", fill=PARCHMENT)
    draw_footer(c, 11)
    c.showPage()


def draw_clue_activity(c):
    draw_background(c)
    draw_brand(c, "Activity")
    draw_title(c, "Which Clue Needs the Light?", "Circle one clue for Mori to follow. There is no wrong answer.")
    clue_w = (SAFE_W - 12 * mm) / 3
    clues = [("Silver feather", "feather"), ("Moon-shaped stone", "moon stone"), ("Sleepy seed", "seed")]
    y = PAGE_H - 150 * mm
    for i, (title, label) in enumerate(clues):
        x = MARGIN + i * (clue_w + 6 * mm)
        draw_box(c, x, y, clue_w, 72 * mm, title, f"Placeholder icon: {label}", fill=CREAM)
        hex_stroke(c, GOLD)
        c.setLineWidth(1.5)
        c.circle(x + clue_w / 2, y + 20 * mm, 14 * mm, fill=0, stroke=1)
    draw_box(c, MARGIN, 50 * mm, SAFE_W, 42 * mm, "Draw one more clue", "Older children can draw another clue for Mori here.", fill=PARCHMENT)
    draw_box(c, MARGIN, 22 * mm, SAFE_W, 22 * mm, "Parent prompt", "Tell me about your choice.", fill=CREAM)
    draw_footer(c, 12)
    c.showPage()


def draw_lantern_activity(c):
    draw_background(c)
    draw_brand(c, "Activity")
    draw_title(c, "Make Mori's Lantern Glow", "Color Mori's little light. Draw the glow inside the lantern.")
    hex_stroke(c, LEAF)
    c.setLineWidth(2)
    cx = PAGE_W / 2
    cy = PAGE_H - 125 * mm
    c.roundRect(cx - 42 * mm, cy - 42 * mm, 84 * mm, 84 * mm, 12, fill=0, stroke=1)
    c.arc(cx - 28 * mm, cy + 25 * mm, cx + 28 * mm, cy + 70 * mm, 0, 180)
    c.line(cx - 42 * mm, cy + 10 * mm, cx + 42 * mm, cy + 10 * mm)
    hex_stroke(c, GOLD)
    for r in [14 * mm, 24 * mm, 34 * mm]:
        c.circle(cx, cy - 6 * mm, r, fill=0, stroke=1)
    draw_box(c, MARGIN, 50 * mm, SAFE_W, 42 * mm, "Finish this with words or a picture", "My little light can help me begin by:", fill=CREAM)
    draw_box(c, MARGIN, 20 * mm, SAFE_W, 22 * mm, "Parent prompt", "What is one small step you can try?", fill=PARCHMENT)
    draw_footer(c, 13)
    c.showPage()


def draw_badge_page(c):
    draw_background(c)
    draw_brand(c, "Badge")
    c.setFont("Times-Bold", 30)
    hex_fill(c, INK)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 38 * mm, "Little Light Keeper")
    draw_badge_mark(c, PAGE_W / 2, PAGE_H - 92 * mm, 34 * mm)
    c.setFont("Times-Roman", 18)
    hex_fill(c, INK)
    c.drawCentredString(PAGE_W / 2, PAGE_H - 138 * mm, "I helped Mori carry the little light home.")
    c.setFont("Helvetica", 12)
    c.drawString(MARGIN + 20 * mm, PAGE_H - 170 * mm, "Name:")
    c.line(MARGIN + 42 * mm, PAGE_H - 170 * mm, PAGE_W - MARGIN - 20 * mm, PAGE_H - 170 * mm)
    c.drawString(MARGIN + 20 * mm, PAGE_H - 188 * mm, "Date:")
    c.line(MARGIN + 42 * mm, PAGE_H - 188 * mm, PAGE_W - MARGIN - 20 * mm, PAGE_H - 188 * mm)
    c.setFont("Times-Italic", 16)
    hex_fill(c, LEAF_DARK)
    c.drawCentredString(PAGE_W / 2, 48 * mm, "A little light for every brave beginning.")
    draw_box(c, MARGIN, 18 * mm, SAFE_W, 20 * mm, "Parent line", "I noticed you helped Mori finish the mission.", fill=PARCHMENT)
    draw_footer(c, 14)
    c.showPage()


def build_pdf():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    c.setTitle("TaleMori Kit 01 Wireframe v01")
    c.setAuthor("TaleMori")

    draw_cover(c)
    draw_parent_guide(c)
    for index, page in enumerate(STORY_PAGES, start=1):
        draw_story_page(c, page, index)
    draw_moonlight_path(c)
    draw_clue_activity(c)
    draw_lantern_activity(c)
    draw_badge_page(c)
    c.save()
    return OUTPUT


if __name__ == "__main__":
    output = build_pdf()
    print(output)
