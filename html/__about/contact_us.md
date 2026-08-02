# Contact Us

**Script:** [Contact Us (script)](../contact_us.php)

## Purpose

The `/kontakt/` page body: the order-selector table (one row per screen
type, quantity/dimension/price controls) and the order form (customer
details + hidden order-list input + submit). This is the FRONT END of the
ordering flow — see
[Order Table (flow)](../../js/ordering/__flow/orderTable.md) for the
client-side logic that drives what this markup displays, and
[Ordering (flow)](../__flow/ordering.md) for what happens after submit.

## Connections

### Uses

- `$cenovnik` (indirectly, via the client-side price calc — see
  [Order Table](../../js/ordering/__about/orderTable.md)), `$basePath`,
  `$title` — from [Variables](../includes/__about/variables.md)
- [Order Table](../../js/ordering/__about/orderTable.md) — every
  `onclick`/`oninput` attribute in this markup (`swapType`, `changeQuantity`,
  `calculateArea`, `calculatePrice`, `addOrder`) calls a function that
  module exposes on `window`
- [Order Memory](../../js/ordering/__about/orderMemory.md) — restores
  `sessionStorage`-persisted form values and order rows into this exact
  markup on page load
- [Show Popup](../../js/ordering/__about/showPopup.md) — intercepts this
  form's `submit` event

### Used by

- [Kontakt (folder)](../../kontakt/___kontakt.md) — `kontakt/index.php`'s
  entire page body

## Behavior

- `$ids`/`$alts` are two PARALLEL arrays (index-matched, not a single
  associative table) enumerating the six orderable variants:
  `Fixed_Both`, `Rolled`, `PliseDoor_Both`, `PliseDoor_One`,
  `PliseWindow_Both`, `PliseWindow_One` — one `<tr>` per variant, each
  seeded with `schema.org/Product` microdata and a starting image of
  `{id}_White_Light.webp`.
- The form posts to `html/ordering.php` with `method="post"`, but
  [Show Popup](../../js/ordering/__about/showPopup.md) intercepts the
  `submit` event and sends it via `fetch()` instead — the plain
  `action`/`method` attributes are a no-JS fallback that in practice never
  fires (see [Ordering (flow)](../__flow/ordering.md)).
