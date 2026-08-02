# Plise

**Script:** [Plise (script)](../plise.php)

## Purpose

The pleated-screen catalogue section: marketing copy plus four
`displayProduct` calls (door × one/both-sided, window × one/both-sided)
with their showroom video placeholders. Reused as
`/katalog/plise-komarnici/`'s whole body and as one section of
`/katalog/`'s combined page.

## Connections

### Uses

- [Single Selector](singleSelector.md) — `displayProduct()` × 4
- `$cenovnik['Plise']`, `$page`, `$version`, `$basePath` — from
  [Variables](../includes/__about/variables.md)

### Used by

- [Katalog (folder)](../../katalog/___katalog.md) — both
  `katalog/plise-komarnici/index.php` and `katalog/index.php`
- [Media](../../js/media/__about/media.md) — populates the four
  `<video id="PliseDoor_Both">` / `PliseDoor_One` / `PliseWindow_Both` /
  `PliseWindow_One` placeholders

## Behavior

Same `$page !== 'katalog'` heading branch as [Fixed](fixed.md); the four
`displayProduct` calls differ only by `imgLink`/`altText`/video `id`.
