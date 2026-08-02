# Click Hover

**Script:** [Click Hover (script)](../clickHover.js)

## Purpose

Small hover-interaction utilities (color swap on hover, background/text
color swap on hover) plus the header dropdown-menu toggle and its
outside-click-to-close behavior.

## Connections

### Uses

- [Colorize SVG](../../style/__about/colorizeSVG.md) — `colorChange()` takes it
  as a parameter and calls it on hover enter/leave

### Used by

- [Theme](../../style/__about/theme.md) — imports `colorChange`,
  `hoverTxtColor`, `hoverBgColor` and passes them into
  [Change Style](../../style/__about/changeStyle.md)'s functions
- [Header](../../../html/includes/__about/header.md) — `window.navigationMenu`
  is the dropdown buttons' `onclick` handler

## Exported Functions

- `colorChange(element, primaryColor, secondaryColor, colorizeSVG)` —
  registers BOTH mouse (`mouseenter`/`mouseleave`) and touch
  (`touchstart`/`touchend`) listeners that call `colorizeSVG(element,
  secondaryColor)` / `colorizeSVG(element, primaryColor)` — dual event
  types so the same hover-style effect works on touch devices, which never
  fire `mouseenter`
- `hoverBgColor(element, color)` — background-color swap on hover
- `hoverTxtColor(element, colorIN, colorOUT)` — text-color swap on hover

## Global Behavior

- `window.navigationMenu(event, button)` — toggles the button's sibling
  `<ul>`'s `show` class and `aria-expanded` attribute; stops event
  propagation so the document-level listener below does not immediately
  close it again.
- A `document.body` click listener closes every open `.navigation.show`
  dropdown and resets every `aria-expanded="true"` — the standard
  click-outside-to-close pattern, registered once at module load.
