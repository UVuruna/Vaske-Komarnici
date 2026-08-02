# Image Preview

**Script:** [Image Preview (script)](../imagePreview.js)

## Purpose

The carousel's lightbox: double-click (or Enter/Space) any carousel item to
view it full-screen, with next/prev navigation through the full carousel
media list and a Tab focus trap across the three lightbox buttons.

## Connections

### Uses

- `#lightbox` / `#lightbox-image` / `#lightbox-video` / `.next` / `.prev` /
  `.close` — markup from [Carousel](../../../html/__about/carousel.md)
- `.clickable` elements — the same carousel items
  [Media Carousel](carousel.md) makes draggable

### Used by

- [Init](../../__about/init.md) — `carousel(version)` imports this module
  (self-registering)
- [Carousel](../../../html/__about/carousel.md) — its inline `onclick` on the
  `.close` button calls `window.closeLightbox()`

## Global Behavior

- `window.closeLightbox()` — hides the lightbox
- On module load: builds `mediaList` (every `.clickable` element's `src`),
  registers `dblclick` (open) and `Enter`/`Space` `keydown` (open) on each
- Next/prev buttons find the CURRENT source's index in `mediaList` and step
  `±1` with wraparound (`% mediaList.length`)
- `showLightboxMedia(src)` toggles which of `<img>`/`<video>` is visible by
  file extension, `load()`s and `play()`s a video, and focuses the lightbox
  once per opening (`opened` flag prevents re-stealing focus on every
  next/prev step)
- The `Tab` keydown listener cycles focus through `[close, next, prev]`
  (forward or, with Shift, backward) — the same single-purpose focus-trap
  pattern as [Guide](guide.md), applied to three buttons instead of
  one
