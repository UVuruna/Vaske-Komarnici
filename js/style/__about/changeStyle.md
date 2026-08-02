# Change Style

**Script:** [Change Style (script)](../changeStyle.js)

## Purpose

A set of DOM-styling functions, one per UI element category (light
frames/cards, buttons, colored strong text, the nav dropdown, tables, form
inputs) plus the shared `pulse` keyframe injector. Each applies the current
theme's colors and registers the matching hover-state swap. Called together
by [Theme](theme.md)'s `settingTheme()` every time the theme is
(re)applied.

## Connections

### Uses

- `.light` / button / `li strong`/`.categoryText` / `#header ul` / `table` /
  form `input`/`textarea` — styling targets across every page's markup

### Used by

- [Theme](theme.md) — imports and calls every export here, passing
  the current theme's color values

## Exported Functions

- `lightFrame(elements, elementMain, elementSec, bodyMain, bodySec)` —
  styles `.light` cards/panels, with a themed box-shadow glow on hover for
  bordered ones
- `buttonsStyle(buttons, elementMain, elementSec, bodyMain)` — base +
  hover colors for every non-`.false` button, branching once for `.guide`
  buttons (inverted color scheme) and adding a themed glow shadow for
  `.cta-button`
- `coloredTextStyle(items, hoverTxtColor, elementMain, elementSec)` —
  themed text color + hover swap (delegates the hover wiring itself to
  [Click Hover](../../interaction/__about/clickHover.md)'s `hoverTxtColor`)
- `menuStyle(menus, bgColor, secondaryColor, hoverBgColor)` — the nav
  dropdown's border/background, only below the 800px breakpoint (desktop
  menu items get no themed border)
- `tablesStyle(bgColor, elementMain)` / `formStyle(bgColor, elementMain)` —
  order-table and order-form theming; no-ops if the page has neither (both
  bail out early when `document.querySelectorAll('table')`/`querySelector('form')`
  find nothing)
- `pulsingAnimation(time = 2)` — injects a `<style>` tag defining the
  `.pulse` scale-bounce `@keyframes` animation once per theme application

## Design Decisions

- **Every function follows the same shape:** a small inner helper applied to
  each element in a `NodeList`, with the theme colors passed as plain
  parameters rather than read from `window` — makes each function
  independently testable in principle, even though nothing here is
  currently under test.
