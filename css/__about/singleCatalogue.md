# Single Catalogue

**Script:** [Single Catalogue (script)](../singleCatalogue.css)

## Purpose

Overrides layered on top of [Catalogue](catalogue.md) specifically for the
single-product-type pages (`/katalog/fiksni-komarnici/`,
`/katalog/plise-komarnici/`, `/katalog/rolo-komarnici/`, and `/katalog/`'s
combined sections): a borderless promo card and a taller showcase video.

## Connections

### Uses

- [Catalogue](catalogue.md) — this file only overrides/extends its
  selectors, always loaded alongside it, never alone

### Used by

- [Katalog (folder)](../../katalog/___katalog.md) — every route there loads
  both `catalogue.css` and this file
- [Fixed](../../html/__about/fixed.md), [Plise](../../html/__about/plise.md),
  [Rolled](../../html/__about/rolled.md) — the `.singleCatalogue` wrapper
  class these templates render

## Key Selectors

- `.singleCatalogue .promo` — removes the border/radius/padding
  [Catalogue](catalogue.md)'s base `.promo` sets, since these pages show one
  large showcase rather than a grid of small cards
- `.singleCatalogue .video-loop` — the tall (500px) bordered showcase video
