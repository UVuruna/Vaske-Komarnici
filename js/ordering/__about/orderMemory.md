# Order Memory

**Script:** [Order Memory (script)](../orderMemory.js) ·
**Flow:** [diagram](../__flow/orderMemory.md)

## Purpose

Persists the order form's in-progress state — every input's value AND the
built order-list table rows — into `sessionStorage`, and restores it on the
next page load. This is what lets a shopper navigate away from `/kontakt/`
(to re-check a catalogue page, say) and come back without losing their
in-progress order.

## Connections

### Uses

- `form input` / `form textarea` / `#orderList tr` — markup from
  [Contact Us](../../../html/__about/contact_us.md)
- `window.elementMain` — the current theme's accent color, used when
  rebuilding a restored row's delete button

### Used by

- [Init](../../__about/init.md) — `order()` imports this module
  (self-registering; nothing is awaited or called on it)
- [Order Table](orderTable.md) — the restored rows this module
  rebuilds must match the exact cell shape `addOrder()`/`addTotalRow()`
  produce, or `deleteOrder()`/`totalPrice()` would break on them

## Behavior

See [Order Memory (flow)](../__flow/orderMemory.md) for the full save/restore
sequence.

## Design Decisions

- **Serializes rendered text, not a data model.** There is no order object
  anywhere in this codebase — [Order Table](orderTable.md) never
  builds one either. Save reads `textContent` straight off the DOM; restore
  writes it straight back as new `<td>`s. This mirrors
  [Select Model](../../interaction/__about/selectModel.md)'s "DOM is the
  source of truth" pattern.
