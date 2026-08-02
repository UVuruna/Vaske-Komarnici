# Guide

**Script:** [Guide (script)](../guide.css)

## Purpose

Styles the full-screen instructional-video overlay
[Guide](../../js/media/__about/guide.md) opens.

## Connections

### Uses

- none (pure styling)

### Used by

- [Head](../../html/includes/__about/head.md) — loaded with
  `media="print"` + `onload="this.media='all'"` (deferred, non-blocking)
- [Guide](../../js/media/__about/guide.md) — the `#guide` markup this
  stylesheet targets

## Key Selectors

- `#guide` — fixed, full viewport, dark overlay backdrop, hidden by default
  (`display: none`, toggled by JS)
- `#guide video` — capped to 95% viewport in both dimensions, rounded
  corners
