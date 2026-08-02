# Order Table

**Script:** [Order Table (script)](../orderTable.js) ·
**Flow:** [diagram](../__flow/orderTable.md)

## Purpose

The order-selector table's full interactive logic: cycling a row's
type/frame/net choice, quantity +/- controls, area and price calculation,
and adding/removing rows in the order-list summary table that gets
submitted. The largest file in `js/` and the commercial core of the site —
this is what turns dimensions into a price.

## Connections

### Uses

- `#orderSelector` / `#orderList` / `.orderCategory` / `.frame` / `.net` /
  `.quantity` / `.width` / `.height` / `.Area` / `.Price` / `.Add` — markup
  from [Contact Us](../../../html/__about/contact_us.md)
- `$cenovnik` (the price table) — passed in as `priceDict` from PHP through
  [Init](../../__about/init.md)'s `order(version, priceDict)`, itself sourced
  from [Variables](../../../html/includes/__about/variables.md)

### Used by

- [Init](../../__about/init.md) — `order()` awaits `orderTableInit(priceDict)`
  before anything else in the ordering feature
- [Contact Us](../../../html/__about/contact_us.md) — every `onclick`/`oninput`
  attribute in that markup calls one of this module's `window`-exposed
  functions
- [Order Memory](orderMemory.md) — its restore logic reproduces this
  module's row-cell shape by hand (see that doc's Design Decisions)

## Exported Function

### `orderTableInit(priceDict)`

Registers the order form's `submit` handler (serializes `#orderList` into an
HTML `<table>` string, written to the hidden `#orderListInput` for the
server to receive), exposes `swapType`/`changeQuantity`/`calculateArea`/
`calculatePrice`/`addOrder`/`deleteOrder` on `window` so the inline
`onclick`/`oninput` markup can reach them, and stores `priceDict` in module
scope for `calculatePrice()` to read.

## Other Functions

See [Order Table (flow)](../__flow/orderTable.md) for `swapType()` and
`calculatePrice()`'s branching in full. In short:

- `swapType(element)` — cycles the clicked element's own category array
  (screen category / frame color / net color), updating the row's image,
  alt text, id, and — for a category swap — its `schema.org` meta tags
  (`swapMeta()`)
- `changeQuantity(element, delta)` — increments/decrements the row's
  quantity span, never below 0
- `calculateArea(element)` — `width × height`, formatted to 2 decimals, or
  `'0 m²'` if either input is not a number
- `calculatePrice(element)` — see flow diagram: base price from
  `priceDict` by category, +3 surcharge for a non-White frame, floored at
  one unit's price even for tiny areas
- `deleteOrder(tableRow)` / `addOrder(element)` / `addTotalRow(Table)` /
  `totalPrice()` — order-list row lifecycle: add a row from the current
  selector state, remove one, keep the running RSD/EUR total in sync,
  restore the "Nema porudžbina" empty state when the list empties
- `getID(src)` — extracts the bare filename (no extension, no path) from an
  image `src`, used throughout as the "current value" of whatever that
  image represents
