# Footer

**Script:** [Footer (script)](../footer.php)

## Purpose

The site-wide `<footer>`: contact channels (phone / email / address) with
`schema.org/Organization` microdata, plus a copyright line and developer
attribution.

## Connections

### Uses

- [Variables](variables.md) — `$companyPhone`, `$companyPhoneGlobal`,
  `$companyEmail`, `$companyName`, `$developerWebsite`, `$developerName`,
  `$developerEmail`
- `gtag_report_conversion` (defined in `html/head/google.html`) — the phone
  link reports a conversion before dialing, same pattern as
  [Header](header.md)'s call button

### Used by

- Every page-entry script includes this file last, before `</main>`

## Behavior

- The email `mailto:` link CCs `$developerEmail` on every customer message
  sent through it (not the order form — that is a separate PHPMailer send in
  [Ordering](../../__about/ordering.md); this is the plain footer mail link a
  visitor's own mail client opens).
- All dynamic text goes through `htmlspecialchars()` before output — the
  only file in `html/includes/` that does, since phone/email/name values
  ultimately come from a hardcoded PHP array
  ([Variables](variables.md)) rather than user input; defensive but
  harmless.
