# Rolled

**Script:** [Rolled (script)](../rolled.php)

## Purpose

The roller-screen catalogue section: marketing copy plus one
`displayProduct` call with its showroom video placeholder. Reused as
`/katalog/rolo-komarnici/`'s whole body and as one section of `/katalog/`'s
combined page.

## Connections

### Uses

- [Single Selector](singleSelector.md) — `displayProduct()` × 1
- `$cenovnik['Rolled']`, `$page`, `$version`, `$basePath` — from
  [Variables](../includes/__about/variables.md)

### Used by

- [Katalog (folder)](../../katalog/___katalog.md) — both
  `katalog/rolo-komarnici/index.php` and `katalog/index.php`
- [Media](../../js/media/__about/media.md) — populates the
  `<video id="Rolled">` placeholder

## Behavior

Simplest of the three type-section templates ([Fixed](fixed.md),
[Plise](plise.md)) — rolled screens have no one/both-sided variant, so
there is only one `displayProduct` call. Same `$page !== 'katalog'` heading
branch as the other two.
