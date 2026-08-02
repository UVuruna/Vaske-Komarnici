# Fixed

**Script:** [Fixed (script)](../fixed.php)

## Purpose

The fixed-screen catalogue section: marketing copy plus two `displayProduct`
calls (one-sided, two-sided) with their showroom video placeholders.
Reused both as `/katalog/fiksni-komarnici/`'s whole body and as one section
of `/katalog/`'s combined page.

## Connections

### Uses

- [Single Selector](singleSelector.md) — `displayProduct()` × 2
- `$cenovnik['Fixed']`, `$page`, `$version`, `$basePath` — from
  [Variables](../includes/__about/variables.md)

### Used by

- [Katalog (folder)](../../katalog/___katalog.md) — both
  `katalog/fiksni-komarnici/index.php` and `katalog/index.php`
- [Media](../../js/media/__about/media.md) — populates the two
  `<video id="Fixed_Both">`/`<video id="Fixed_One">` placeholders via
  `loadVideo(videoID)`

## Behavior

The `<h2>` text branches on `$page !== 'katalog'`: the single-type route
shows "Najpovoljnija Ponuda" (best offer), the combined `/katalog/` page
shows the full descriptive heading — the same pattern repeats in
[Plise](plise.md) and [Rolled](rolled.md).
