# css/

One stylesheet per page/component, no preprocessor, no nesting beyond plain
CSS's own `&`-nesting (used sparingly for `:hover`/`:not()` variants). Four
sheets load on every page; the rest are pulled in per-page by
[Head](../html/includes/__about/head.md)'s `$styles` array.

## Files

| File | Tier | One line |
|------|------|----------|
| `root.css` | Standard | base reset, fonts, global element defaults, shared animations — [about](__about/root.md) |
| `header.css` | Standard | site header + nav dropdown + mobile hamburger menu — [about](__about/header.md) |
| `fa.css` | Standard | Font Awesome subset (4 icon glyphs only) — [about](__about/fa.md) |
| `loader.css` | Standard | full-screen loading overlay — [about](__about/loader.md) |
| `footer.css` | Standard | site footer — [about](__about/footer.md) |
| `guide.css` | Standard | instructional-video overlay — [about](__about/guide.md) |
| `about_us.css` | Standard | "about the business" article section — [about](__about/about_us.md) |
| `carousel.css` | Standard | on-site photo/video carousel + lightbox — [about](__about/carousel.md) |
| `catalogue.css` | Standard | multi-product catalogue grid + selector icons — [about](__about/catalogue.md) |
| `singleCatalogue.css` | Standard | single-type catalogue page overrides — [about](__about/singleCatalogue.md) |
| `contact_us.css` | Standard | order table, order form, result popup — [about](__about/contact_us.md) |

## Connections

### Uses

- none (CSS files reference no other project files besides `fonts/*`
  assets, listed in each file's own `__about/` doc where relevant)

### Used by

- [Head](../html/includes/__about/head.md) — `root.css`/`fa.css`/
  `header.css` always linked, plus one `<link>` per entry in the calling
  page's `$styles` array; `footer.css`/`guide.css` always linked but
  deferred (`media="print"` + `onload` swap)
- [HTML (folder)](../html/___html.md) — every stylesheet targets markup some
  `html/*.php` template renders

## Design Decisions

- **No tier is Algorithmic.** None of these files encode a state machine or
  protocol a diagram would clarify — CSS selectors ARE the whole "logic", and
  each `__about/` doc's "Key Selectors" section already names the ones worth
  knowing. `contact_us.css` (394 lines, the project's largest source file)
  stayed Standard for the same reason: its size is six responsive
  breakpoints' worth of the same handful of properties repeated, not
  branching complexity.
- **`root.css`'s responsive root `font-size`** is the one piece of CSS
  "logic" worth naming twice: every other file's `rem` units scale off it,
  so a change there has project-wide reach even though no single selector
  looks that way in isolation.
