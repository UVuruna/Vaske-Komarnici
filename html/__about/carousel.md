# Carousel

**Script:** [Carousel (script)](../carousel.php)

## Purpose

Renders the on-site installation-photo/video carousel and its companion
lightbox markup, from the file list
[Carousel Files](../head/__about/carouselFiles.md) built.

## Connections

### Uses

- `$files` — built by
  [Carousel Files](../head/__about/carouselFiles.md) (included earlier, by
  [Head](../includes/__about/head.md))
- `is_video()` — also defined in
  [Carousel Files](../head/__about/carouselFiles.md)

### Used by

- Root `index.php`, [Katalog](../../katalog/___katalog.md) routes,
  [O Nama (folder)](../../o_nama/___o_nama.md) — every page that requested
  `$init['carousel']`
- [Media Carousel](../../js/media/__about/carousel.md) (drag/wheel
  interaction) and
  [Image Preview](../../js/media/__about/imagePreview.md) (the lightbox)
  attach behavior to this markup client-side

## Behavior

For each file: an `mp4` renders as a `<video>` with a `data-src` attribute
(left unset — [Media](../../js/media/__about/media.md)'s `loadDelay()`
lazy-loads it via `IntersectionObserver`), anything else as a lazy `<img>`.
`$cleanName` strips a trailing `_...` suffix (e.g. `_h264`) from the
filename for the `alt` text. The lightbox (`#lightbox`) is static markup
here; [Image Preview](../../js/media/__about/imagePreview.md) drives it.
