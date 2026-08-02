# Head

**Script:** [Head (script)](../head.php)

## Purpose

Renders the page's `<head>` element: meta tags (SEO, Open Graph, PWA), font
and icon preloads, the per-page CSS link list, and the inline bootstrap
`<script type="module">` that hands the server-resolved config to
[Init](../../../js/__about/init.md) — the one JS entry point every page
loads. Also conditionally pulls in the third-party tag snippets and the
on-site-photo carousel's JSON-LD block.

## Connections

### Uses

- [Variables](variables.md) — nearly every meta tag and the inline bootstrap
  script read `$title`/`$metaDescription`/`$fullUrl`/`$primary`/
  `$primaryElement`/`$version`/`$config`/`$developerName`
- html/head/google.html — third-party tag manager / AdSense / JSON-LD
  snippets, included unconditionally (not itself given a doc — see
  [HTML head (subfolder)](../../head/___head.md))
- [Carousel Files](../../head/__about/carouselFiles.md) — included only when
  `$init['carousel']` is set, to build `$carouselJsonLD`
- [Init](../../../js/__about/init.md) — the bootstrap script's whole purpose
  is to call this module's exported `init()` with the values below

### Used by

- Every page-entry script includes this file first, right after the
  `<html>` tag opens

## Behavior

- The `$styles` array (set by the calling page, e.g.
  `["about_us", "catalogue", "carousel"]`) drives a loop that links one
  `css/{name}.css?v=$version` stylesheet per entry, on top of the four
  always-loaded sheets (`loader`, `root`, `fa`, `header`). `footer.css` and
  `guide.css` are loaded with `media="print"` +
  `onload="this.media='all'"` — a standard trick to defer them as
  non-render-blocking without a `defer`/`async` attribute (CSS has neither).
- The inline `<script type="module">` embeds `$start` (page-load start
  time), `$version`, `$basePath`, `$config` (theme data) and `$initDict`
  (which JS features this page needs: `presentation` / `carousel` / `order`)
  as JSON literals, then dynamically imports `js/init.js` and calls its
  `init()` export with them — this is the ONLY place any JS is loaded from;
  every other module is reached through `js/init.js`'s own `import()` chain.
- `$init["carousel"]` gates whether `html/head/carouselFiles.php` (file
  scan + JSON-LD generation) runs at all — pages that show no on-site-photo
  carousel skip that work entirely.
