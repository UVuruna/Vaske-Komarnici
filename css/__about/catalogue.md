# Catalogue

**Script:** [Catalogue (script)](../catalogue.css)

## Purpose

Styles the multi-product catalogue layout: the promo grid (image + selector
sidebar), pricing block, and the frame/net/type selector icon rows. The
largest CSS file whose selectors are shared across ALL catalogue pages (home,
`/katalog/`, and all three per-type routes).

## Connections

### Uses

- none (pure styling)

### Used by

- Every page that shows a [Single Selector](../../html/__about/singleSelector.md)
  product block (root `index.php`, all [Katalog (folder)](../../katalog/___katalog.md)
  routes)
- [Select Model](../../js/interaction/__about/selectModel.md) — every class
  this file styles is a target of that module's click handlers

## Key Selectors

- `.promoContainer` — the two-column `display: grid` (image | selector +
  explanation), collapsing to a single stacked column at ≤700px
- `.promo` / `.promoImage` — the bordered product-photo card
- `.selectFrame` — the row of frame/net/type swatch icons; `.ban` — the
  no-selection placeholder icon
- `.priceFrame` / `.old-price` / `.price` — the crossed-out "was" price +
  the "AKCIJA" (sale) price
- Five breakpoints (1000px / 700px / 430px / 340px, plus the base) that
  progressively shrink swatch/gap sizing as the viewport narrows
