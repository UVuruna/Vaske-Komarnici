# Variables

**Script:** [Variables (script)](../variables.php)

## Purpose

The project's business/content config: developer and company contact info,
the per-page `<title>`/meta-description text, the price table, and the
four-palette theme-color table. Included by every page-entry script right
after [Config](../../../__about/config.md), and read (via PHP's shared
include scope, not explicit parameters) by nearly every other `html/*`
template.

## Connections

### Uses

- [Config](../../../__about/config.md) — reads the `$theme` and `$page`
  variables the caller set before including this file, and `$page` selects
  the `match()` branch for `$title`/`$metaDescription`

### Used by

- [Head](head.md) — `$title`, `$metaDescription`, `$fullUrl`, `$version`,
  `$primaryElement`, `$primary`, `$config` (built from `$ThemeColors`)
- [Header](header.md), [Footer](footer.md) — `$companyPhone*`,
  `$companyEmail`, `$companyName`, `$developerName`, `$developerEmail`,
  `$developerWebsite`, `$basePath`
- [Catalogue Home](../../__about/catalogue_home.md), [Fixed](../../__about/fixed.md),
  [Plise](../../__about/plise.md), [Rolled](../../__about/rolled.md) — `$cenovnik`
  (price table) and `$version` (cache-busting query string)
- Every page-entry script includes this file (after `config.php`)

## Data

- `$developerName` / `$developerEmail` / `$developerWebsite` — attribution
  shown in the footer
- `$companyEmail` / `$companyName` / `$companyPhone` (E.164) /
  `$companyPhoneLocal` (dialed-format display) / `$companyPhoneGlobal`
  (international display) — the business's own contact identity
- `$version` — a single hardcoded string (e.g. `"1.52"`), appended as
  `?v=$version` to every CSS/JS/image URL and to dynamic `import()` calls,
  for cache-busting on deploy. **Bumped by hand on every content/asset
  change** — there is no build step that derives it.
- `$title` / `$metaDescription` — a `match ($page)` table keyed by the page
  slug the caller set (`'o_nama'`, `'katalog'`, `'fiksni'`, `'rolo'`,
  `'plise'`, `'kontakt'`, or the `default` arm for the home page)
- `$fullUrl` — the current request's canonical URL, built from
  `$_SERVER['HTTP_HOST']` + `$_SERVER['REQUEST_URI']`
- `$cenovnik` — the price-per-m² table, keyed `'Fixed'` / `'Rolled'` /
  `'Plise'` (EUR)
- `$ThemeList` — the four theme-name strings, in cycle order
- `$ThemeColors` — one `primary` / `secondary` / `primaryElement` /
  `secondaryElement` hex-color set per theme name
- `$config` — `$ThemeColors` + `$ThemeList` + the resolved `$theme`, bundled
  for `json_encode()` into the client-side bootstrap (see [Head](head.md))
- the trailing `extract($ThemeColors[$theme])` is what actually puts
  `$primary`/`$secondary`/`$primaryElement`/`$secondaryElement` into scope for
  every file included after this one — a page's inline
  `background-color: <?php echo $primary ?>` (root `index.php` and every
  other page shell) depends on this call having already run
