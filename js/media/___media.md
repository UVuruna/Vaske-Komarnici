# js/media/

Video/carousel behavior: the drag/wheel carousel interaction, its lightbox,
the instructional guide-video overlay, and shared video-playback helpers
(seamless looping, visibility-based play/pause, lazy source loading).

## Files

| File | Tier | One line |
|------|------|----------|
| `carousel.js` | Algorithmic | drag/touch/wheel carousel with momentum — [about](__about/carousel.md) · [flow](__flow/carousel.md) |
| `guide.js` | Standard | instructional video overlay wiring — [about](__about/guide.md) |
| `imagePreview.js` | Standard | carousel lightbox (next/prev, focus trap) — [about](__about/imagePreview.md) |
| `media.js` | Standard | video loop / visibility play-pause / lazy source loading — [about](__about/media.md) |

## Connections

### Uses

- [HTML (folder)](../../html/___html.md) — `.carousel`/`.lightbox`/`#guide`/
  `.video-loop`/`.lazy-media` markup from
  [Carousel](../../html/__about/carousel.md) and the catalogue templates

### Used by

- [Init](../___js.md) — `carousel(version)` imports `carousel.js` +
  `imagePreview.js`; `presentation()` and the carousel branches both call
  into `media.js`; `guide.js` is imported last, non-blocking

## Design Decisions

- **Every file here is self-registering.** None export anything callers
  await except `media.js` (whose functions [Init](../__about/init.md) calls
  explicitly with specific video IDs) — `carousel.js`, `guide.js`'s keydown
  listener, and `imagePreview.js` all wire themselves up at module
  evaluation time from whatever markup is already in the DOM.
