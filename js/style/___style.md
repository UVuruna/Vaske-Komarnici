# js/style/

Everything theme-related: the SVG recoloring engine, the per-element style
appliers it works alongside, the theme orchestration/cycling, and the
PWA-manifest color sync.

## Files

| File | Tier | One line |
|------|------|----------|
| `changeStyle.js` | Standard | per-element-category theme styling (frames, buttons, tables, forms, …) — [about](__about/changeStyle.md) |
| `colorizeSVG.js` | Algorithmic | brightness-preserving SVG recolor engine — [about](__about/colorizeSVG.md) · [flow](__flow/colorizeSVG.md) |
| `theme.js` | Standard | theme load/cycle orchestration — [about](__about/theme.md) |
| `updateManifest.js` | Standard | live PWA manifest color regeneration — [about](__about/updateManifest.md) |

## Connections

### Uses

- [Interaction (subfolder)](../interaction/___interaction.md) — `theme.js`
  imports `clickHover.js`'s hover helpers
- [Includes (subfolder)](../../html/includes/___includes.md) — the
  `$ThemeColors`/`$ThemeList`/`$theme` config
  [Variables](../../html/includes/__about/variables.md) computes server-side
  is what this folder cycles through client-side

### Used by

- [Init](../___js.md) — always loads `theme.js` first, before any other
  feature

## Design Decisions

- **One recolor engine, reused for both theming AND hover states.**
  [Colorize SVG](__about/colorizeSVG.md) does not know "theme" or "hover" —
  it just maps a target color onto an SVG's existing shading. `theme.js`
  calls it with the theme's primary color; `clickHover.js`'s `colorChange()`
  calls it again with the secondary color on hover — same function, same
  cache, two callers.
