# js/interaction/

Click/hover-driven UI behavior that is not media playback and not the
ordering table: the catalogue's color/frame/net/type selector (the biggest
piece), its explanation-text lookup, and small shared hover utilities plus
the header dropdown.

## Files

| File | Tier | One line |
|------|------|----------|
| `catalogueText.js` | Standard | explanation-sidebar text dictionary + swap function — [about](__about/catalogueText.md) |
| `clickHover.js` | Standard | hover color-swap helpers + header dropdown toggle — [about](__about/clickHover.md) |
| `selectModel.js` | Algorithmic | wires the catalogue's frame/net/side/type selector icons — [about](__about/selectModel.md) · [flow](__flow/selectModel.md) |

## Connections

### Uses

- [HTML (folder)](../../html/___html.md) — every selector here targets
  markup [Single Selector](../../html/__about/singleSelector.md) and
  [Header](../../html/includes/__about/header.md) render
- [Style (subfolder)](../style/___style.md) — `selectModel.js` reads
  `window.version`; `clickHover.js`'s `colorChange()` is a parameter
  [Theme](../style/__about/theme.md) supplies with
  [Colorize SVG](../style/__about/colorizeSVG.md)

### Used by

- [Init](../___js.md) — `presentation()` awaits `selectModel()`;
  [Theme](../style/___style.md) imports `clickHover.js` directly

## Design Decisions

- **Selection state lives in the DOM, not in JS.** See
  [Select Model](__about/selectModel.md)'s Design Decisions — the same
  principle applies project-wide to the ordering table
  ([Order Table](../ordering/___ordering.md)).
