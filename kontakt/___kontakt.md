# kontakt/

The `/kontakt/` route — the ordering page.

## Files

| File | Tier | One line |
|------|------|----------|
| `index.php` | Trivial | page-assembly wiring: config + [Contact Us](../html/__about/contact_us.md) |

## Connections

### Uses

- [Contact Us](../html/__about/contact_us.md) — this route's entire page
  body (the order-selector table + form; see
  [Ordering (flow)](../html/__flow/ordering.md) for what submitting it does)

### Used by

- [Header](../html/includes/__about/header.md) — the "Poručite Odmah" nav
  link
