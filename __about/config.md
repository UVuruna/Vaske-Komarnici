# Config

**Script:** [Config (script)](../config.php)

## Purpose

Resolves which of the four time-of-day theme palettes applies to the current
request, before any page markup renders. Every page-entry script (root
`index.php`, `katalog/*/index.php`, `kontakt/index.php`, `o_nama/index.php`)
`include`s this file FIRST, then
[Variables](../html/includes/__about/variables.md) (which owns the actual
`$ThemeColors` table this file's choice indexes into).

## Connections

### Uses

- none (no includes; a self-contained bootstrap file)

### Used by

- [Variables](../html/includes/__about/variables.md) — reads the `$theme`
  this file sets, to `extract()` the matching palette into
  `$primary`/`$secondary`/`$primaryElement`/`$secondaryElement`
- Every page-entry script includes this file first: root `index.php`,
  `katalog/index.php`, `katalog/*/index.php`, `kontakt/index.php`,
  `o_nama/index.php`

## Functions

### `chooseTheme()`

Returns one of `'morning'` / `'noon'` / `'afternoon'` / `'night'` from the
current hour in the `Europe/Belgrade` timezone: 04–10 morning, 10–16 noon,
16–22 afternoon, else night.

## Behavior

- `$theme = $_COOKIE['theme'] ?? chooseTheme()` — a `theme` cookie (set
  client-side by [Theme](../js/style/__about/theme.md)'s `themeCycle()`)
  overrides the time-of-day default, so a user who manually cycles the theme
  keeps their choice across reloads.
- `$start = microtime(true)` is also captured here — it is later echoed into
  [Head](../html/includes/__about/head.md)'s inline `<script type="module">`
  as the page's load-start timestamp, which [Init](../js/__about/init.md)'s
  debug logging uses to report page-load vs. JS-execute time in the console.
