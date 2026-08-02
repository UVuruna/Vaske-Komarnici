# Fa

**Script:** [Fa (script)](../fa.css)

## Purpose

A hand-picked SUBSET of Font Awesome 6 Free Solid: one `@font-face` (the
project's own `fa-solid-subset.woff2`, not the full icon font) and four
icon classes — only the glyphs this site actually uses.

## Connections

### Uses

- `fonts/fa-solid-subset.woff2`

### Used by

- [Head](../../html/includes/__about/head.md) — always linked (one of the
  four always-loaded sheets)
- `.ban` (no-selection placeholder / delete-order icon), `.home` (header nav
  icon), `.down-arrow` (dropdown chevron), `.guide` (instructional-video
  trigger, whose glyph rule lives here while its base position/size lives in
  [Root](root.md))

## Key Selectors

- Four `:before { content: '\fXXX' }` rules — the four Unicode codepoints
  from Font Awesome's private-use range this project subset-embeds, rather
  than loading the full icon font for four glyphs (root Rule #19 in spirit:
  ship only the irreducible subset, not the whole library).
