# Contact Us

**Script:** [Contact Us (script)](../contact_us.css)

## Purpose

Styles the `/kontakt/` page: the order-selector table, the order-summary
form/table, and the submission-result popup. The largest stylesheet in the
project — nearly every rule targets a specific ordering-flow element, with
six responsive breakpoints tuning icon/control sizing down to small phones.

## Connections

### Uses

- none (pure styling)

### Used by

- [Kontakt (folder)](../../kontakt/___kontakt.md) — the only route that
  loads this file
- [Order Table](../../js/ordering/__about/orderTable.md) — nearly every
  class here is read or toggled by that module (`.category`, `.frame`,
  `.net`, `.quantity`, `.Area`, `.Price`, `.total`, `.orderValue`, …)

## Key Selectors

- `#contact_us` — the two-column selector-table + form layout, collapsing to
  a single column at ≤1200px
- `.tableColumn` / `.controls` / `.color` / `.measureDimension` — the
  per-row control groups (quantity stepper, frame/net swatches, width/height
  inputs)
- `#popupMessage` / `#popupTable` / `#popupText` — the post-submit result
  popup [Show Popup](../../js/ordering/__about/showPopup.md) shows/hides
- Six breakpoints (800 / 1500 / 1200 / 800–1200 / 600–800 / 600 / 410 / 380px)
  — the order table's icon and control sizes shrink in stages as the
  viewport narrows, down to a fully stacked mobile layout
