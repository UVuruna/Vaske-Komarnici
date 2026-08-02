# Root

**Script:** [Root (script)](../root.css)

## Purpose

The base stylesheet loaded on every page: font-face declarations, a CSS
reset, global element defaults (`body`/`button`/`h1-h3`/`ul`/`a`), and the
site-wide responsive root font-size scale.

## Connections

### Uses

- `fonts/Poppins-{Regular,Bold}-subset.woff2` — the two font weights loaded
  here (the site's other weights ship as `.ttf` but are not `@font-face`'d)

### Used by

- [Head](../../html/includes/__about/head.md) — always linked, first of the
  four always-loaded sheets (`loader`, `root`, `fa`, `header`)

## Key Selectors

- `html { font-size: 15px }` plus three `@media` breakpoints
  (2560px+ → 18px, 750–1440px → 14px, ≤750px → 13px) — every `rem` value
  project-wide scales off this one root value
- `.pulse` / `@keyframes slide-in` — the two shared animations
  [Change Style](../../js/style/__about/changeStyle.md) and
  [Catalogue Text](../../js/interaction/__about/catalogueText.md) trigger
  from JS
- `.guide` — the instructional-video trigger button's base position/style,
  reused (and repositioned per-context) by
  [Catalogue](catalogue.md)/[Single Catalogue](singleCatalogue.md)/
  [Contact Us](contact_us.md)
- `.hoverHighlight` — the image-hover filter (`hue-rotate` + contrast +
  brightness + saturate) used on every catalogue swatch icon
- `.read-only` — a visually-hidden-but-accessible utility class
