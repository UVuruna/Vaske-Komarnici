# Media

**Script:** [Media (script)](../media.js)

## Purpose

Video playback utilities shared across the site: loop a `<video>` seamlessly
(replay instead of showing a paused last frame), pause videos that scroll
off-screen, and lazy-load a showroom video's `<source src>` only when it is
about to enter (or already needs to be in) the viewport.

## Connections

### Uses

- `.video-loop` elements — every showroom/promo `<video>` across
  [Catalogue Home](../../../html/__about/catalogue_home.md),
  [Fixed](../../../html/__about/fixed.md), [Plise](../../../html/__about/plise.md),
  [Rolled](../../../html/__about/rolled.md)
- `.lazy-media` elements — [Carousel](../../../html/__about/carousel.md)'s
  video items

### Used by

- [Init](../../__about/init.md) — `presentation()` calls `loadVideo()` /
  `videoPlay()` / `videoLoop()`; the carousel branches call `loadDelay()`
  (and, when there is no presentation on the page, also `videoLoop()` /
  `videoPlay()`)

## Exported Functions

- `videoLoop()` — for every `.video-loop` video, restarts playback from 0
  when `currentTime` reaches within 0.1s of `duration` (avoids the visible
  freeze-frame gap a native `loop` attribute + `timeupdate` boundary can
  produce)
- `videoPlay()` — an `IntersectionObserver` (50% visibility threshold) that
  plays a `.video-loop` video when it scrolls into view and pauses it when
  it scrolls out, so off-screen videos are not silently burning CPU/battery
- `loadVideo(videoID)` — sets a showroom video's three `<source
  data-src="...">` fallbacks (mp4/webm/H264); `videoID === 'showcase'`
  branches to a `_PC` or `_Mobile` asset variant by viewport width. Delegates
  the actual load timing to `loadDelay(videoElement)`.
- `loadDelay(target = null)` — an `IntersectionObserver` (200px root margin,
  10% threshold) that copies each `data-src` to `src` and calls `.load()`
  once an element is about to enter view, then `unobserve`s it (one-shot).
  With no `target`, observes every `.lazy-media` element instead of one.
