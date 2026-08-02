# Carousel

**Script:** [Carousel (script)](../carousel.css)

## Purpose

Styles the on-site photo/video carousel track and its lightbox overlay.

## Connections

### Uses

- none (pure styling)

### Used by

- Every page that shows [Carousel](../../html/__about/carousel.md)
- [Media Carousel](../../js/media/__about/carousel.md) (drag interaction)
  and [Image Preview](../../js/media/__about/imagePreview.md) (lightbox) —
  both manipulate `transform`/`display` on the elements this file styles

## Key Selectors

- `.carousel` / `.carousel-track` / `.carousel-item` — `cursor: grab`,
  `touch-action: pan-x`, fixed square item size (`35vh` × `35vh`)
- `.lightbox` / `#lightbox-image` / `#lightbox-video` — full-viewport dark
  overlay, hidden by default; `.next`/`.prev`/`.close` are absolutely
  positioned corner buttons
