# html/includes/

Shared page-shell partials: the config/content data every page reads, and
the `<head>`/header/footer chrome wrapped around each page's own body
content. Every page-entry script includes all four, in the order
`variables.php` → `head.php` → (page body) → `header.php` → ... →
`footer.php` — `header.php` and `footer.php` sit INSIDE `<main>`, `head.php`
renders the `<head>` element before it.

## Files

| File | Tier | One line |
|------|------|----------|
| `variables.php` | Standard | business/content config: contact info, page titles, prices, theme-color table — [about](__about/variables.md) |
| `head.php` | Standard | `<head>` element: meta tags, CSS links, JS bootstrap script — [about](__about/head.md) |
| `header.php` | Standard | site-wide nav bar: logo, dropdown menu, call button — [about](__about/header.md) |
| `footer.php` | Standard | site-wide footer: contact channels, copyright — [about](__about/footer.md) |

## Connections

### Uses

- [Config (script)](../../config.php) — every page sets `$theme`/`$page`
  there before including `variables.php`
- [JS (folder)](../../js/___js.md) — `head.php`'s bootstrap script is the
  sole entry point into `js/init.js`

### Used by

- [HTML (folder)](../___html.md) — every loose `html/*.php` template runs
  inside the shell these four files build
- Every page-entry script (root `index.php`, `katalog/*/index.php`,
  `kontakt/index.php`, `o_nama/index.php`)

## Design Decisions

- **No templating engine.** All four files are plain PHP with inline HTML —
  consistent with the rest of the project (root `CLAUDE.md` Rule #21: no
  framework where a small server-rendered site does not need one).
- **Shared scope, not parameters.** These files read variables the CALLER
  set (`$basePath`, `$page`, `$title`, …) rather than receiving them as
  function arguments — a common PHP `include`-scope pattern; every
  `__about/` doc above lists which upstream variables it depends on so the
  coupling is explicit even though the code itself does not declare it.
