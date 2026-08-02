# Single Selector

**Script:** [Single Selector (script)](../singleSelector.php)

## Purpose

Defines `displayProduct()`, the one function that renders a product promo
block (image + frame/net/side selectors + price + CTA buttons +
`schema.org/Product` microdata). Every catalogue template
([Catalogue Home](catalogue_home.md), [Fixed](fixed.md), [Plise](plise.md),
[Rolled](rolled.md)) `include`s this file once and calls `displayProduct()`
per product variant it wants to show.

## Connections

### Uses

- none (no includes; pure function definition + HEREDOC templates)

### Used by

- [Catalogue Home](catalogue_home.md), [Fixed](fixed.md), [Plise](plise.md),
  [Rolled](rolled.md) — each calls `displayProduct()` once per product
  photo shown
- [Select Model](../../js/interaction/__about/selectModel.md) — reads the
  `.promo`/`.selectFrame`/`.promoImage` markup this function outputs to wire
  up the color/frame/net swap interaction client-side

## Functions

### `displayProduct($version, $basePath, $title, $imgLink, $altText, $buttonLink = null, $price = null, $showType = null)`

Builds one `.promoContainer` block via nested HEREDOC strings, conditioned
on which optional parameters are passed:

- `$title` → an `<h2>{$altText}</h2>` heading
- `$showType` → an extra "Tip" (side-count: one/both) selector row, only
  used by [Catalogue Home](catalogue_home.md) (the other three pages show
  one screen TYPE already, so side-count is chosen via the frame swap, not
  a separate selector)
- `$price` → the price block: computes a crossed-out "was" price as
  `floor($price / 0.85)` (i.e. `$price` is presented as a 15%-off "AKCIJA"
  price) plus `schema.org/Offer` microdata
- `$buttonLink` → an extra "Saznaj više" (learn more) button linking to
  that product's dedicated catalogue page; always present regardless is a
  "Naručite Odmah" (order now) button linking to `/kontakt`

Always emits a matching `.explanation` sidebar (empty `<p>` placeholders for
type/sides/frame/net text) that
[Select Model](../../js/interaction/__about/selectModel.md) fills in
client-side via [Catalogue Text](../../js/interaction/__about/catalogueText.md)'s
lookup dictionary.
