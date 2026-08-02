# Header

**Script:** [Header (script)](../header.css)

## Purpose

Styles the fixed site header: logo/nav layout, the "Tip Komarnika" dropdown,
and the collapse into a hamburger-triggered dropdown menu below 800px.

## Connections

### Uses

- none (pure styling)

### Used by

- [Head](../../html/includes/__about/head.md) — always linked (one of the
  four always-loaded sheets)
- [Header](../../html/includes/__about/header.md) — the markup this
  stylesheet targets

## Key Selectors

- `#header` — fixed position, 4rem tall, full width
- `.dropdownTrigger ul` / `:hover > ul` / `:active > ul` — the "Tip
  Komarnika" dropdown, shown on hover (desktop) or via
  [Header](../../html/includes/__about/header.md)'s `navigationMenu()` JS
  toggle (mobile)
- Two breakpoints: 801–1080px (tighter gaps), ≤800px (full mobile
  hamburger-menu layout: `#dropdownMENU` becomes visible, `.menu` becomes an
  absolutely-positioned dropdown panel instead of an inline row)
