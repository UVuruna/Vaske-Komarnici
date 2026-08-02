# Guide

**Script:** [Guide (script)](../guide.js)

## Purpose

Wires every `.guide` button (header, catalogue, carousel, order table) to
open a full-screen instructional video overlay for that page section, with
Escape-to-close and a Tab focus trap.

## Connections

### Uses

- `#guide` overlay markup — rendered inline by
  [Head](../../../html/includes/__about/head.md)'s page shell (`<div id="guide">`
  appears once per page, outside this file)
- `img/guide/{header|catalogue|slideshow|order}.mp4/.webm/_H264.mp4` — the
  four walkthrough videos

### Used by

- [Init](../../__about/init.md) — imported last, non-blocking;
  `initGuide()` is called once

## Exported Function

### `initGuide()`

Attaches an `onclick` to every `.guide` button found under `#header`,
`.catalogue`, `.carouselHeader`, and `#contact_us`, each opening
`showGuide()` with a section-specific video source name and alt text.

## Global Behavior

- `window.showGuide(videoSRC, videoALT)` — inserts a `<video>` (three
  `<source>` fallbacks: mp4, webm, H264 mp4) into `#guide`, styles its
  border with the current theme's `primaryElement` color, and auto-closes
  when the video ends.
- `window.closeBtn()` — the overlay's own close button handler; also reused
  by the `Escape` keydown listener.
- The `Tab` keydown listener traps focus by refocusing the overlay's own
  close button on every Tab press — a single-element focus trap.
