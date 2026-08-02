# Ordering

**Script:** [Ordering (script)](../ordering.php) ·
**Flow:** [diagram](../__flow/ordering.md)

## Purpose

The order-mail send endpoint — the backend half of the ordering flow (see
[Ordering (flow)](../__flow/ordering.md) for the full request/response
sequence together with its client-side callers). Receives the order form's
POST body, sends it as an HTML email via PHPMailer/SMTP, and replies with a
plain-text status string.

## Connections

### Uses

- `PHPMailer\PHPMailer\PHPMailer` / `Exception` — from `PHPMailer/src/`,
  required directly from `$_SERVER['DOCUMENT_ROOT']` (NOT from this
  project's own tree — see Design Decisions)
- `Dotenv\Dotenv` — from Composer's `vendor/autoload.php`, also loaded from
  `$_SERVER['DOCUMENT_ROOT']`; reads `.env` for `MAIL_PASSWORD`
- `$_POST['name'|'email'|'phone'|'address'|'orderDetail'|'orderList']` — the
  submitted form fields

### Used by

- [Show Popup](../../js/ordering/__about/showPopup.md) — `fetch()`-POSTs
  the order form here and displays the plain-text response in a popup
- [Contact Us](contact_us.md) — the `<form>`'s `action` attribute names this
  file (the no-JS fallback path; see that doc's Behavior section)

## Behavior

See [Ordering (flow)](../__flow/ordering.md) for the full step-by-step
sequence, including the try/catch around `$mail->send()` and exactly what
each response string means to the caller.

## Design Decisions

- **PHPMailer and Composer's `vendor/` are NOT part of this repo.** Both are
  required from `$_SERVER['DOCUMENT_ROOT']` rather than a path inside this
  project — see the project [CLAUDE.md](../../CLAUDE.md) "Project Facts": in
  this project's own deployment, `DOCUMENT_ROOT` resolves to this project's
  own folder, so `PHPMailer/` and `vendor/` are gitignored SIBLINGS inside
  the working directory (installed via Composer, not committed) — not a
  separately hosted shared location. A checkout missing them will fail this
  one endpoint (`require` fatals) while every other page keeps working.
