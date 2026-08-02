# Catalogue Text

**Script:** [Catalogue Text (script)](../catalogueText.js)

## Purpose

A lookup dictionary of Serbian marketing blurbs (one per net color, frame
color, and screen type/side combination) plus `catalogueText()`, which
swaps a promo's `.explanation` sidebar text to match whatever the shopper
is currently hovering/has selected.

## Connections

### Uses

- `window.ThemeColors` / `window.theme` — reads `primaryElement` once at
  module load to color the `<strong>` text it inserts

### Used by

- [Select Model](selectModel.md) — calls `catalogueText(parts)`
  every time a selector changes, with a dict mapping each text key
  (`'White'`, `'Fixed_Both'`, …) to the DOM element(s) that should show it

## Exported Function

### `catalogueText(parts)`

Iterates `Object.entries(parts)` and calls the internal `changeText(text,
element)` for each pair.

## Behavior

- `changeText('empty', elements)` hides all given elements (no clear
  selection state); `changeText('titles', elements)` un-hides them without
  changing content; any other key swaps in `textDict[key]`'s HTML — but
  ONLY if the new text (stripped of tags) differs from the current text, to
  avoid re-triggering the `slide-in` CSS animation on every hover.
- The animation restart trick (`element.style.animation = 'none'`, force a
  reflow via `element.offsetHeight`, then re-set the animation) is how a
  repeated hover on the SAME element still replays the slide-in — a naive
  class toggle would no-op on a class that is already applied.
