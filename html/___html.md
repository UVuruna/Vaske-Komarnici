# html/

Every page-section template PHP file: the shared shell
([includes (subfolder)](includes/___includes.md)), `<head>`-adjacent content
([head (subfolder)](head/___head.md)), and — directly in this folder — the
per-topic body sections every route composes from (about, catalogue-by-type,
carousel, contact/order, and the one product-render helper they all share).

## Files

| File | Tier | One line |
|------|------|----------|
| `about_us.php` | Standard | the "about the business" article — [about](__about/about_us.md) |
| `carousel.php` | Standard | renders the on-site photo/video carousel + lightbox markup — [about](__about/carousel.md) |
| `catalogue_home.php` | Standard | home page's condensed 4-product catalogue section — [about](__about/catalogue_home.md) |
| `contact_us.php` | Standard | the order-selector table + order form (`/kontakt/`'s body) — [about](__about/contact_us.md) |
| `fixed.php` | Standard | fixed-screen catalogue section — [about](__about/fixed.md) |
| `ordering.php` | Algorithmic | order-mail send endpoint (PHPMailer) — [about](__about/ordering.md) · [flow](__flow/ordering.md) |
| `plise.php` | Standard | pleated-screen catalogue section — [about](__about/plise.md) |
| `rolled.php` | Standard | roller-screen catalogue section — [about](__about/rolled.md) |
| `singleSelector.php` | Standard | `displayProduct()` — the one product-promo renderer every catalogue section calls — [about](__about/singleSelector.md) |

## Connections

### Uses

- [Includes (subfolder)](includes/___includes.md) — every file here runs
  inside the shell `includes/` builds, and reads variables `variables.php`
  set
- [JS (folder)](../js/___js.md) — the markup these files emit is what every
  `js/` module attaches behavior to

### Used by

- Root `index.php`, [Katalog (folder)](../katalog/___katalog.md),
  [Kontakt (folder)](../kontakt/___kontakt.md),
  [O Nama (folder)](../o_nama/___o_nama.md) — every page-entry script
  composes its body from a subset of these files

## Design Decisions

- **One product renderer, many callers.** `singleSelector.php`'s
  `displayProduct()` is the single source of the promo-block markup
  ([Rule #5](../CLAUDE.md), no duplicate templates) — `fixed.php`,
  `plise.php`, `rolled.php` and `catalogue_home.php` each `include` it and
  call it once per product photo they need, rather than each having its own
  copy of the HEREDOC markup.
- **Type-section files double as both a standalone route body AND a section
  of the combined catalogue page** — `fixed.php`/`plise.php`/`rolled.php`
  are reused verbatim by both `/katalog/{type}/` and `/katalog/`; the
  `$page !== 'katalog'` heading branch each contains is what tells them
  which context they are in.
