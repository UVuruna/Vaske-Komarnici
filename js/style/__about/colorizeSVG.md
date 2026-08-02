# Colorize SVG

**Script:** [Colorize SVG (script)](../colorizeSVG.js) ·
**Flow:** [diagram](../__flow/colorizeSVG.md)

## Purpose

Recolors an inline SVG (the logo, the dropdown-menu icon) to any target
color LIVE, while preserving its original shading — this is what lets one
grayscale-shaded SVG asset serve all four theme palettes (and every
hover-color variant) with no separate colored copy per theme (root Rule
#19, compute don't generate). The flagship algorithm of this project — see
[Colorize SVG (flow)](../__flow/colorizeSVG.md) for the full pipeline.

## Connections

### Uses

- The inlined `<svg>` markup itself — this module reads/writes
  `fill`/`stroke`/`stop-color` directly on the SVG's own DOM nodes; it has
  no dependency on any other project file

### Used by

- [Theme](theme.md) — calls `colorizeSVG(LOGO, elementMain)` /
  `colorizeSVG(MENU, elementMain)` on every theme (re)application, and
  passes itself into [Click Hover](../../interaction/__about/clickHover.md)'s
  `colorChange()` so hovering the logo/menu recolors it to the theme's
  SECONDARY color and back
- [Header](../../../html/includes/__about/header.md) — the logo and
  dropdown-menu SVGs are inlined there specifically so this module can
  reach their `<path>`/`<stop>` elements (an `<img src="...svg">` reference
  would be opaque to it)

## Exported Function

### `colorizeSVG(SVG, color)`

Recolors every fill/stroke/gradient-stop in `SVG` to a palette derived from
`color`, caching both the SVG's extracted original palette and every
target-color palette it has ever been asked to produce, keyed by the SVG's
own `id` attribute.

## Design Decisions

- **Per-SVG, per-color caching (`svgDICT`).** The first call for a given
  SVG does the expensive DOM-scanning work (`findStyles`/`findGradients`);
  every later call — same SVG, same OR different target color — reuses the
  cached element map, only recomputing the target palette when that exact
  color has not been requested for that SVG before. A hover recolor back
  and forth between two colors therefore does zero re-scanning after the
  first two calls.
- **`strToRGB()`'s key trick:** it builds `{r, g, b}` by indexing the
  SOURCE string (`"rgb(...)"`) at positions 0/1/2 — which happen to be the
  literal characters `'r'`, `'g'`, `'b'` — instead of a separate
  `['r','g','b']` array. Intentional-looking (the string genuinely starts
  with `"rgb"`), but easy to misread as a mistake; called out here so a
  future edit does not "fix" it into something that no longer coincides.
