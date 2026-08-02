# Catalogue Home

**Script:** [Catalogue Home (script)](../catalogue_home.php)

## Purpose

The home page's condensed catalogue section: one representative promo per
screen type (fixed, rolled, plise-door, plise-window) with a link out to
that type's dedicated catalogue page.

## Connections

### Uses

- [Single Selector](singleSelector.md) — includes it and calls
  `displayProduct()` four times (one per screen type), each with
  `showType: true` and a `buttonLink` to the matching
  [Katalog (folder)](../../katalog/___katalog.md) route
- `$cenovnik`, `$version`, `$basePath` — from
  [Variables](../includes/__about/variables.md)

### Used by

- Root `index.php` only

## Behavior

Plain sequential calls to `displayProduct()` — no loop, no conditional
branching; each call's `imgLink` is a specific pre-chosen product photo
(e.g. `Fixed_Both_White_Light.webp`), not derived from any table.
