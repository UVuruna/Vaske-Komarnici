# Select Model

**Script:** [Select Model (script)](../selectModel.js) ·
**Flow:** [diagram](../__flow/selectModel.md)

## Purpose

Wires every catalogue promo's frame-color / net-color / side-count /
overall-type selector icons: clicking one swaps the promo's product image to
the matching variant and updates the `.explanation` sidebar text. This is
what makes [Single Selector](../../../html/__about/singleSelector.md)'s static
markup interactive.

## Connections

### Uses

- [Catalogue Text](catalogueText.md) — dynamically imported; every
  image swap calls its `catalogueText()` with a dict of
  `{segmentValue: element}` built by this module's `findElements()`
- The `.promo` / `.selectFrame` / `.promoImage` / `.promoContainer` /
  `.frame` / `.net` / `.frameTitle` / `.netTitle` markup —
  [Single Selector](../../../html/__about/singleSelector.md)'s output, and
  `img/items/product/*.webp` / `img/other/*.webp` filenames, whose SEGMENTS
  (`Fixed_Both_White_Light.webp` → `Fixed`, `Both`, `White`, `Light`) are
  this module's only source of "what is currently selected"

### Used by

- [Init](../../__about/init.md) — `presentation(version, titles)` awaits
  `selectModel()` before anything else in the presentation feature

## Exported Functions

### `selectModel()`

See [Select Model (flow)](../__flow/selectModel.md) for the full algorithm.
Wires a click handler on every `.selectFrame img` / `.selectFrame i` in the
page.

### `promoWidth()`

Sets every `.promo` container to the same width — the widest one measured —
so a row of catalogue promos lines up regardless of each one's content
length. Called on `window` `load`, only above a 700px viewport (mobile
promos stack vertically, so equal width does not matter there).

## Design Decisions

- **State lives in the rendered `<img src>`, not in a JS variable.** Which
  frame/net/side/type is "selected" is read back out of the CURRENT image
  filename on every click (`getParts()`), not tracked in a data structure —
  the DOM is the single source of truth, so a swap can never drift out of
  sync with what is actually displayed.
