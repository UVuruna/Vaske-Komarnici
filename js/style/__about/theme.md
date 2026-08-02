# Theme

**Script:** [Theme (script)](../theme.js)

## Purpose

Orchestrates the theme system: loads the styling sub-modules once, applies
every themed style on page load, and lets the shopper manually cycle through
the four time-of-day palettes (persisted via a `theme` cookie that
[Config](../../../__about/config.md) reads on the next request).

## Connections

### Uses

- [Colorize SVG](colorizeSVG.md) — recolors the logo and menu-icon
  SVGs
- [Click Hover](../../interaction/__about/clickHover.md) — `colorChange`,
  `hoverTxtColor`, `hoverBgColor`
- [Change Style](changeStyle.md) — every other themed element
- `window.ThemeColors` / `ThemeList` / `theme` — set by
  [Init](../../__about/init.md) from the server-resolved
  [Variables](../../../html/includes/__about/variables.md) config
- `window.updateManifest` — from
  [Update Manifest](updateManifest.md)

### Used by

- [Init](../../__about/init.md) — `await`s `settingThemeOnload(Ordering)`
  before loading anything else, so the page is never shown unthemed
- [Header](../../../html/includes/__about/header.md) — the logo button's
  `onclick` calls `window.themeCycle()`

## Exported Function

### `settingThemeOnload(Ordering)`

Dynamically imports [Colorize SVG](colorizeSVG.md),
[Click Hover](../../interaction/__about/clickHover.md)'s three exports, and
[Change Style](changeStyle.md)'s seven exports into module-level
bindings, then calls the internal `settingTheme(Ordering)`.

## Global Behavior

- `window.themeCycle()` — advances `window.theme` to the next entry in
  `ThemeList` (wraps around), sets the `theme` cookie, updates the body
  background immediately, then runs `updateManifest()` and
  `settingTheme(true)` in parallel, and finally re-applies
  `explanationStyle` to every visible catalogue explanation's `<strong>`
  text.
- `settingTheme(Ordering)` (internal) — sets the `theme` cookie, destructures
  the current theme's four colors, and fires EVERY styling function from
  [Colorize SVG](colorizeSVG.md)/[Change Style](changeStyle.md)
  in parallel via `Promise.all` (none awaited individually) — `tablesStyle`/
  `formStyle` only run when `Ordering` is true, since those elements only
  exist on `/kontakt/`.
