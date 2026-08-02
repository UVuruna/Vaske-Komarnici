# js/ordering/

The client side of the ordering flow: build the order list and compute
prices ([Order Table](__about/orderTable.md)), survive a reload
([Order Memory](__about/orderMemory.md)), and submit
([Show Popup](__about/showPopup.md)). The server side
([Ordering](../../html/__about/ordering.md), PHPMailer) lives in `html/` —
see [Ordering (flow)](../../html/__flow/ordering.md) for where this folder's
responsibility ends and the backend's begins.

## Files

| File | Tier | One line |
|------|------|----------|
| `orderMemory.js` | Algorithmic | persists form + order-list state across reloads (`sessionStorage`) — [about](__about/orderMemory.md) · [flow](__flow/orderMemory.md) |
| `orderTable.js` | Algorithmic | selector cycling, price calculation, order-list row lifecycle — [about](__about/orderTable.md) · [flow](__flow/orderTable.md) |
| `showPopup.js` | Standard | intercepts submit, POSTs via `fetch()`, shows the response — [about](__about/showPopup.md) |

## Connections

### Uses

- [Contact Us](../../html/__about/contact_us.md) — every element these
  three files read or write
- [Ordering](../../html/__about/ordering.md) — `showPopup.js`'s `fetch()`
  target

### Used by

- [Init](../___js.md) — `order(version, priceDict)` awaits
  `orderTableInit()` first, then fires `showPopup()` and imports
  `orderMemory.js`, neither awaited

## Design Decisions

- **No shared order data model.** Both `orderTable.js` (building rows) and
  `orderMemory.js` (saving/restoring rows) read and write the rendered
  `<td>` `textContent` directly — there is no JS object representing "the
  order" anywhere. This keeps the two files simple individually at the cost
  of `orderMemory.js` having to hand-mirror `orderTable.js`'s cell shape
  (flagged in [Order Memory](__about/orderMemory.md)'s Design Decisions,
  and in [Open Questions](../../../OPEN-QUESTIONS.md) as a
  duplication worth a shared helper if this file is ever touched again).
