# Loader

**Script:** [Loader (script)](../loader.css)

## Purpose

Styles the full-screen loading overlay: fixed full-viewport cover, centered
logo + two pulsing insect icons.

## Connections

### Uses

- none (pure styling)

### Used by

- [Head](../../html/includes/__about/head.md) — always linked (one of the
  four always-loaded sheets — loaded first, since the loader is the first
  thing painted)
- [Loader](../../html/head/___head.md) — the markup this stylesheet targets
- [Init](../../js/__about/init.md) — `removeLoadingScreen()` fades this
  overlay out via the inline `transition: opacity 0.5s ease` this file
  declares

## Key Selectors

- `#loader` — fixed, full viewport, `background-color: inherit` (matches
  whatever theme color the page shell already set inline)
- `@keyframes pulse` — the same pulsing scale animation
  [Root](root.md)'s `.pulse` class uses, applied directly to `#loader img`
