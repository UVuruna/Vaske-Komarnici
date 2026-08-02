# About Us

**Script:** [About Us (script)](../about_us.php)

## Purpose

The "about the business" article: screen-type overview, materials pitch,
process/timeline, service & maintenance offering, and a call-to-action
button to `/kontakt`. Used both as the home page's about section and as the
whole body of the `/o_nama/` route.

## Connections

### Uses

- `$basePath`, `$title` — set by the calling page-entry script

### Used by

- Root `index.php` (home page, one section among several)
- [O Nama (folder)](../../o_nama/___o_nama.md) — `/o_nama/`'s entire page
  body

## Behavior

Static Serbian marketing copy inside `schema.org/Organization` microdata;
the only dynamic pieces are `$basePath`-prefixed links to the three
catalogue routes and `explode(" | ", $title)[0]` to show just the page-title
prefix (before the ` | ` SEO suffix) as the visible `<h1>`.
