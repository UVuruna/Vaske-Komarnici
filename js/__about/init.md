# Init

**Script:** [Init (script)](../init.js) ·
**Flow:** [diagram](../__flow/init.md)

## Purpose

The ONE JS module every page's inline bootstrap `<script>`
([Head](../../html/includes/__about/head.md)) imports. Orchestrates every
other feature module's loading — theming first, then whichever of
presentation/carousel/order this page needs, in parallel — and removes the
loading screen once setup is far enough along.

## Connections

### Uses

- [Theme](../style/__about/theme.md) — always imported first, awaited
- [Select Model](../interaction/__about/selectModel.md),
  [Media](../media/__about/media.md) — the `presentation` feature
- [Media Carousel](../media/__about/carousel.md),
  [Image Preview](../media/__about/imagePreview.md) — the `carousel`
  feature
- [Order Table](../ordering/__about/orderTable.md),
  [Show Popup](../ordering/__about/showPopup.md),
  [Order Memory](../ordering/__about/orderMemory.md) — the `order` feature
- [Update Manifest](../style/__about/updateManifest.md) — after the loading
  screen is removed
- [Guide](../media/__about/guide.md) — last, non-blocking

### Used by

- [Head](../../html/includes/__about/head.md) — the inline bootstrap script
  is the only caller; it awaits `init(phpStart, version, path, config,
  initDict)`

## Exported Function

### `init(phpStart, version, path, config, initDict)`

See [Init (flow)](../__flow/init.md) for the full sequencing diagram. In
short: exposes `window.path`/`version`/`ThemeColors`/`theme`/`ThemeList`,
loads and applies the theme, loads whichever of `presentation` /
`carousel` / `order` this page's `initDict` requests (in parallel with each
other, each internally awaiting its own sub-imports), removes the loading
screen, then loads the manifest updater and the guide-video wiring without
blocking anything on them.

## Design Decisions

- **Every feature module is a dynamic `import()`, none are static.** A page
  that needs no ordering table never downloads
  `js/ordering/orderTable.js` — the `initDict` flags
  (`presentation`/`carousel`/`order`, set per page by each page-entry
  script) gate which `import()` calls even happen.
