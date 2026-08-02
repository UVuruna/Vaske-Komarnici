# Show Popup

**Script:** [Show Popup (script)](../showPopup.js)

## Purpose

Intercepts the order form's submit, POSTs it to the mail backend via
`fetch()` instead of a full page navigation, and shows the server's response
in an in-page popup. The client-side half of the request/response documented
in [Ordering (flow)](../../../html/__flow/ordering.md).

## Connections

### Uses

- `#order` form, `#popupMessage` / `#popupText` / `#popupTable` — markup
  from [Contact Us](../../../html/__about/contact_us.md)
- [Ordering](../../../html/__about/ordering.md) — the `fetch()` target

### Used by

- [Init](../../__about/init.md) — `order()` calls `showPopup()` (not
  awaited)

## Exported Function

### `showPopup()`

Registers the `#order` form's `submit` handler:
`preventDefault()` → `fetch(html/ordering.php, POST, FormData(form))` →
on success, show the response text plus the hidden `orderListInput`'s HTML
table value in the popup; on a `fetch()`-level failure (network error, not
a server error — the server always responds 200 with a text status), show a
generic "❌ Greška pri slanju." message instead. Also exposes
`window.closePopup()` for the popup's own close button.
