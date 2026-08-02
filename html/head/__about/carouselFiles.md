# Carousel Files

**Script:** [Carousel Files (script)](../carouselFiles.php)

## Purpose

Scans `img/slideshow/` for on-site installation photos/videos matching the
current page's requested categories, shuffles them, and builds both the
`$files` list [Carousel](../../__about/carousel.md) renders and a
`schema.org` JSON-LD block describing them for search engines. Included by
[Head](../../includes/__about/head.md) only when the calling page set
`$init['carousel']`.

## Connections

### Uses

- `$init['carousel']` and `$basePath` — set by the calling page-entry script
  before [Head](../../includes/__about/head.md) includes this file
- `img/slideshow/*` on disk (via `scandir()`)

### Used by

- [Head](../../includes/__about/head.md) — conditionally includes this file,
  then embeds `$carouselJsonLD` as a `<script type="application/ld+json">`
  block
- [Carousel](../../__about/carousel.md) — renders the `$files` list this
  file builds

## Functions

- `is_video($filename)` — extension check (`mp4` only counts as video here;
  `webm`/`H264` variants are matched separately inside
  [Carousel](../../__about/carousel.md), not by this function)
- `generateName($url)` — maps a filename to one of three Serbian category
  phrases (`"rolo komarnika"` / `"plise komarnika"` / `"fiksnih komarnika"`)
  by substring match, for the JSON-LD `name`/`description` text
- `getThumbnail($name)` — picks a RANDOM product-photo filename
  (`img/items/product/*.webp`) as the JSON-LD `thumbnailUrl` for a given
  category — see Behavior below
- `generateType($file)` — `"VideoObject"` vs `"ImageObject"` by extension,
  for the JSON-LD `@type`

## Behavior

1. `scandir('img/slideshow/')`, keep only filenames containing one of the
   page's requested categories (`$init['carousel']`, e.g.
   `["Rolo", "Plise", "Fiksni"]`), `shuffle()` the result — so the on-page
   photo order differs per request.
2. For each kept file, emit one JSON-LD `image[]` entry: name/description
   from `generateName()`, `@type` from `generateType()`, `contentUrl`
   rewritten to the absolute `https://vaske-komarnici.com/...` URL, and a
   **randomly chosen** representative product thumbnail from
   `getThumbnail()` — the thumbnail is NOT the actual photo/video's own
   frame; it is a stand-in product shot picked from a fixed pool of
   color/side/type combinations per category, purely to give search engines
   a valid `thumbnailUrl` per entry.
