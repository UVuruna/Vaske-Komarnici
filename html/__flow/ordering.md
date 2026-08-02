# Ordering — Flow

**About:** [description](../__about/ordering.md)

This is the SERVER half of the ordering flow. The CLIENT half — building the
order list, persisting it across reloads, and posting it here — is
documented separately: [Order Table (flow)](../../js/ordering/__flow/orderTable.md)
builds `#orderList`/the hidden `orderListInput`, and
[Order Memory (flow)](../../js/ordering/__flow/orderMemory.md) is what
survives a reload before the user ever submits. This diagram picks up at
submit.

## Algorithm

```mermaid
%%{init: {'flowchart': {'subGraphTitleMargin': {'top': 0, 'bottom': 35}}}}%%
flowchart TB
    subgraph CLIENT["Browser — Contact Us page"]
        A["User fills order table + form\n(js/ordering/orderTable.js)"]
        B["submit event intercepted\n(js/ordering/showPopup.js)"]
        C["fetch POST html/ordering.php\nbody = FormData(form)"]
    end

    subgraph SERVER["html/ordering.php"]
        D{"REQUEST_METHOD?"}
        E["Sanitize fields:\nhtmlspecialchars(name/phone/address/orderDetail)\nfilter_var(email, SANITIZE_EMAIL)"]
        F["Build PHPMailer(true)\nSMTP: hostinger.com:465 SSL\nauth: ponuda@vaske-komarnici.com\npassword from .env MAIL_PASSWORD"]
        G["setFrom / addAddress(business) / addCC(developer)\nisHTML(true), Subject, Body\n(Body embeds raw orderList HTML from the client)"]
        H{"mail-&gt;send()"}
        I["echo '✅ Poruka uspešno poslata!'"]
        J["catch Exception\necho '❌ Poruka nije poslata. Greška: ...'"]
        K["default branch (non-POST)\necho 'Nevažeći zahtev.'"]
    end

    subgraph CLIENT2["Browser — response handling"]
        L["response text -&gt; #popupText\nhidden orderListInput value -&gt; #popupTable\n#popupMessage shown"]
        M["fetch() itself throws\n(network failure)\n-&gt; '❌ Greška pri slanju.'"]
    end

    A --> B --> C --> D
    D -- POST --> E --> F --> G --> H
    H -- success --> I
    H -- throws --> J
    D -- other --> K
    I --> L
    J --> L
    K --> L
    C -. catch .-> M
```

Pseudocode (language-neutral):

    ON form submit (js/ordering/showPopup.js):
        preventDefault()
        formData = FormData(form)                 # includes the hidden orderListInput HTML table
        TRY:
            response = fetch(html/ordering.php, POST, formData)
            text = response.text()
            show popup with: text, formData's orderListInput value
        CATCH network error:
            show popup with: "❌ Greška pri slanju."

    ON html/ordering.php request (server):
        IF method != POST:
            RETURN "Nevažeći zahtev."
        sanitize name/phone/address/orderDetail (htmlspecialchars), email (filter_var)
        configure PHPMailer: SMTP host/port/auth, from = ponuda@..., to = business, cc = developer
        body = HTML template embedding the sanitized fields + the RAW orderList HTML (not re-escaped —
               it is server-generated markup from the client's hidden input, not free-text user input)
        TRY:
            mail.send()
            RETURN "✅ Poruka uspešno poslata!"
        CATCH PHPMailer Exception:
            RETURN "❌ Poruka nije poslata. Greška: {mail.ErrorInfo}"

## Notes

- **The `orderList` field is trusted HTML, not escaped again server-side.**
  It is built entirely by
  [Order Table](../../js/ordering/__about/orderTable.md) from DOM
  `textContent` (not raw user typing) into a `<table>` string, so this is a
  deliberate choice, not an oversight — but it means the email body's
  order-table section is exactly whatever HTML the client sent, unescaped.
- **No CSRF token, no rate limiting.** The endpoint accepts any POST from
  anywhere with no origin check — flagged here as observed behavior, not
  fixed (Hard Constraint: zero behavior change on this production site).
  See [Open Questions](../../../OPEN-QUESTIONS.md).
