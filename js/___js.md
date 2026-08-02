# js/

All client-side behavior, feature-organized into four subfolders plus one
loose entry point. No framework, no build step — every module is a native
ES module reached through a chain of dynamic `import()` calls starting at
`init.js`, the only script any page's `<head>` references directly (see
[Head](../html/includes/__about/head.md)).

## Files

| File | Tier | One line |
|------|------|----------|
| `init.js` | Algorithmic | page-load orchestration: theme first, then whichever features this page needs, in parallel — [about](__about/init.md) · [flow](__flow/init.md) |

## Subfolders

| Folder | Role |
|--------|------|
| [interaction (subfolder)](interaction/___interaction.md) | Catalogue color/frame/net/type selector, hover utilities, nav dropdown |
| [media (subfolder)](media/___media.md) | Carousel drag/wheel interaction, lightbox, guide videos, video playback helpers |
| [ordering (subfolder)](ordering/___ordering.md) | Order-table logic, `sessionStorage` persistence, submit handling |
| [style (subfolder)](style/___style.md) | Theme orchestration, SVG recoloring, manifest sync |

## Connections

### Uses

- [HTML (folder)](../html/___html.md) — every module here targets markup
  some `html/*.php` template renders

### Used by

- [Head](../html/includes/__about/head.md) — the bootstrap `<script
  type="module">` is the sole entry point, calling `init.js`'s `init()`

## Design Decisions

- **Feature flags, not page detection.** `init.js` never asks "which page am
  I on" — it reads the `initDict` the page-entry script's PHP already
  computed (`presentation`/`carousel`/`order` booleans) and only `import()`s
  the modules a given page actually flagged as needed. See
  [Init (flow)](__flow/init.md).
- **State lives in the DOM, not in JS objects**, project-wide — see
  [Select Model](interaction/__about/selectModel.md) and
  [Order Table](ordering/___ordering.md)'s Design Decisions for the two
  places this matters most.
