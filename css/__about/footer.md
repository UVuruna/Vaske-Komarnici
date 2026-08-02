# Footer

**Script:** [Footer (script)](../footer.css)

## Purpose

Styles the site-wide footer: the contact-info block and the copyright/
attribution lines.

## Connections

### Uses

- none (pure styling)

### Used by

- [Head](../../html/includes/__about/head.md) — loaded with
  `media="print"` + `onload="this.media='all'"` (deferred, non-blocking —
  see that doc's Behavior section)
- [Footer](../../html/includes/__about/footer.md) — the markup this
  stylesheet targets

## Key Selectors

- `#footer` — the rounded card wrapper; `#contact` / `footer` (the native
  element, nested inside `#footer`) — contact list vs. copyright block, each
  with its own flex direction/alignment
