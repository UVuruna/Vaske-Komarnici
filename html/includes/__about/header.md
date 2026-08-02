# Header

**Script:** [Header (script)](../header.php)

## Purpose

The site-wide `<header>`: logo (theme-cycle button), the "how to use the
menu" guide trigger, the main navigation (with a "Tip Komarnika" dropdown to
the three catalogue routes), and the click-to-call button.

## Connections

### Uses

- [Variables](variables.md) — `$basePath`, `$companyPhone`,
  `$companyPhoneLocal`
- `img/logo/logo.svg` and `img/other/dropdown-menu.svg` — inlined directly
  via `file_get_contents()` (not `<img>` tags), so
  [Colorize SVG](../../../js/style/__about/colorizeSVG.md) can recolor their
  `<path>`/`<stop>` elements client-side; an `<img src="...svg">` reference
  would be opaque to that pipeline
- `window.navigationMenu` (defined in
  [Click Hover](../../../js/interaction/__about/clickHover.md)) — the
  dropdown's `onclick` handler
- `window.themeCycle` (defined in [Theme](../../../js/style/__about/theme.md))
  — the logo button's `onclick` handler
- `gtag_report_conversion` (defined in `html/head/google.html`) — the
  click-to-call button reports a conversion before dialing

### Used by

- Every page-entry script includes this file directly after
  [HTML head (subfolder)](../../head/___head.md)'s `loader.php`

## Behavior

- The logo and dropdown-menu icon are inlined as raw SVG markup so their
  fill/stroke colors are DOM-editable — this is why
  [Head](head.md) preloads `img/logo/logo.svg` as an image AND this file
  reads its bytes again with `file_get_contents()`: the preload warms the
  browser cache, the inline copy is what actually renders and gets
  recolored.
- `#dropdownMENU` (the hamburger toggle, CSS-hidden above the mobile
  breakpoint) and the `#komarnici-menu` submenu trigger both call the same
  `navigationMenu(event, button)` handler — it toggles the sibling
  `<ul>`'s `show` class and the button's `aria-expanded` attribute; a
  document-level click listener (in
  [Click Hover](../../../js/interaction/__about/clickHover.md)) closes any
  open dropdown on an outside click.
