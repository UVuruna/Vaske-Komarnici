# Update Manifest

**Script:** [Update Manifest (script)](../updateManifest.js)

## Purpose

Regenerates the PWA `site.webmanifest` client-side, colored to match the
CURRENT theme, and swaps it in via a `blob:` URL — so a shopper who installs
the site as a home-screen app gets an icon/splash background matching
whichever theme they last saw, without the server needing to serve one
manifest file per theme (root Rule #19, compute don't generate: the
manifest is derived live from the two theme colors, never pre-generated per
palette).

## Connections

### Uses

- `meta[name="theme-color"]` / `meta[name="background-color"]` — also
  updated in lockstep with the manifest
- `img/logo/android-chrome-{192x192,512x512}.png` — the two icon sizes every
  generated manifest references

### Used by

- [Init](../../__about/init.md) — imported once, right after the loading
  screen is removed; [Init](../../__about/init.md)'s `setManifest()` calls
  it once per session (guarded by a `sessionStorage.start` flag)
- [Theme](theme.md) — `window.themeCycle()` calls it again on every
  manual theme change

## Global Behavior

### `window.updateManifest(bgColor, themeColor)`

Builds a manifest object (name, icons, `background_color`, `theme_color`),
`JSON.stringify`s it into a `Blob`, and points the page's
`<link rel="manifest">` at a fresh `URL.createObjectURL(blob)` — creating the
link element if the page has none yet.
