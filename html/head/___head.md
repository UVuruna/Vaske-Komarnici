# html/head/

Content that belongs INSIDE `<head>` but is factored out of
[Head](../includes/__about/head.md) itself: the loading-screen markup (which
actually renders at the top of `<body>`, not `<head>` — named for the
loading phase, not its DOM position), the on-site-photo file scan, and the
pasted third-party integration snippets.

## Files

| File | Tier | One line |
|------|------|----------|
| `carouselFiles.php` | Standard | scans `img/slideshow/`, builds the carousel file list + its JSON-LD block — [about](__about/carouselFiles.md) |
| `loader.php` | Trivial | the full-screen loading-spinner markup (logo + two SVG icons), removed by [Init](../../js/__about/init.md) once page setup finishes |
| `google.html` | *(untracked — see below)* | pasted Google Tag Manager / gtag / AdSense snippets + the `LocalBusiness` JSON-LD block |

## Connections

### Uses

- `img/slideshow/*`, `img/other/mosquito.svg`, `img/other/fly.svg`,
  `img/logo/logo.svg` — static assets referenced by `loader.php` and
  `carouselFiles.php`

### Used by

- [Includes (subfolder)](../includes/___includes.md) — `head.php` includes
  `google.html` unconditionally and `carouselFiles.php` conditionally
- Every page-entry script includes `loader.php` directly (not through
  `head.php`) as the first thing inside `<body>`

## Design Decisions

- **`google.html` is intentionally outside the tier/guard system.** It is a
  pasted third-party snippet (Google Tag Manager, AdSense, and a static
  `LocalBusiness` JSON-LD block) — not authored application logic, and not
  `.php`/`.js`/`.css` — so this project's guard tests
  (`tests/test_structure_law.py`, `tests/test_docs_coverage.py`) do not walk
  it, the same way they do not walk `img/`/`fonts/` assets. This one line is
  its documentation. If it ever grows real conditional logic beyond pasted
  markup, it should be renamed `.php` and given a tier.
