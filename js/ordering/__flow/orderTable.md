# Order Table — Flow

**About:** [description](../__about/orderTable.md)

## `swapType(element)` — cycle the clicked selector

```mermaid
%%{init: {'flowchart': {'subGraphTitleMargin': {'top': 0, 'bottom': 35}}}}%%
flowchart TB
    A["swapType(element)"]
    B{"element has class 'orderCategory'?\n(the big category thumbnail, not a small swatch)"}

    subgraph CAT["Category cycle (screen type)"]
        C["TYPE = getID(image.src) with its LAST 2 segments\n(frame + net) dropped -&gt; e.g. 'Fixed_Both'"]
        D["newTYPE = next entry in categoryTranslate's key order\n(wraps around)"]
        E["image.src / image.alt / tableRow.id = newTYPE-derived values"]
        F["find which of Fixed/Rolled/Plise newTYPE contains\n-&gt; set the row's short label text"]
        G["swapMeta(tableRow, newSRC, newNAME)\n-&gt; updates the row's hidden schema.org meta tags"]
    end

    subgraph SWATCH["Swatch cycle (frame color OR net color)"]
        H{"element has class 'net'?"}
        I["newTYPE = next in ['Light','Dark'] (wraps)"]
        J["newTYPE = next in ['White','Brown','Antracite'] (wraps)"]
        K["element.src: TYPE -&gt; newTYPE"]
        L["ALSO propagate the same swap to the row's\n.category thumbnail image (so it reflects\nthe chosen frame/net even though the\nscreen TYPE itself did not change)"]
    end

    A --> B
    B -- yes --> C --> D --> E --> F --> G
    B -- no --> H
    H -- yes --> I --> K
    H -- no --> J --> K
    K --> L
```

## `calculatePrice(element)` — price for one row

```mermaid
%%{init: {'flowchart': {'subGraphTitleMargin': {'top': 0, 'bottom': 35}}}}%%
flowchart TB
    A["calculatePrice(element)"]
    B["id = tableRow.id  (e.g. 'PliseDoor_Both')\ncolor = getID(row's .frame image src)"]
    C["priceCategory = priceDict's value for the FIRST key\nthat is a substring of id\n(priceDict keys: 'Fixed' / 'Rolled' / 'Plise')"]
    D{"color != 'White'?"}
    E["priceCategory += 3  (color surcharge)"]
    F["areaValue = parseFloat(.Area text)\nquantityValue = parseInt(.quantity text)"]
    G{"both are valid numbers?"}
    H["price = priceCategory * areaValue\nprice = max(price, priceCategory)  — floor at one unit's price"]
    I{"areaValue is truthy (non-zero)?"}
    J["Price span text = round(price * quantityValue) + ' €'"]
    K["(no price update — area is 0)"]
    L["else branch: sets 'areaSpan.textContent'\n— areaSpan is undefined in this function's scope\n(see Notes: a real bug, in practice unreached)"]

    A --> B --> C --> D
    D -- yes --> E --> F
    D -- no --> F
    F --> G
    G -- yes --> H --> I
    I -- yes --> J
    I -- no --> K
    G -- no --> L
```

## Order-list row lifecycle

    FUNCTION addOrder(element):
        read the row's current quantity/area/price/frame/net values
        build a 6-column description (category name, frame+net text, width, height, area, price)
        IF the list was showing the empty-state row: remove it, insert a TOTAL row
        insert the new row just before the TOTAL row (keeps TOTAL always last)
        recompute totalPrice()

    FUNCTION deleteOrder(tableRow):
        remove tableRow
        IF that was the last real row: remove the TOTAL row too, restore the empty-state row
        ELSE: recompute totalPrice()

    FUNCTION totalPrice():
        sum every '.orderValue' cell (each row's price column) across #orderList
        write the sum as both RSD (× a fixed 117.52 conversion rate) and EUR

Pseudocode for `swapType`/`calculatePrice` above; `addOrder`/`deleteOrder`/
`totalPrice` are simple enough that the pseudocode above is the whole
algorithm — a diagram would only restate it.

## Notes

- **`swapType`'s category branch derives "which type is this row" from the
  IMAGE FILENAME, not from any stored value** — `getID()` strips the last
  two `_`-separated segments (assumed to always be frame + net) to recover
  the category id. This is why every product image filename convention
  (`{Category}_{Frame}_{Net}.webp`) must hold for every screen type — a
  filename with a different segment count would silently miscompute `TYPE`.
- **Observed bug, flagged not fixed** (zero behavior change — production
  site): `calculatePrice()`'s `else` branch (area/quantity failed to parse)
  writes to `areaSpan`, a variable that does not exist in this function —
  only `calculateArea()` declares a local of that name. In practice this
  branch is effectively unreachable: both `.Area` and `.quantity` always
  start pre-populated with valid numeric text (`"0 m²"` / `"0"`), so
  `parseFloat`/`parseInt` never actually return `NaN` in normal use. See
  [Open Questions](../../../OPEN-QUESTIONS.md).
- **The color surcharge (+3) and the one-unit price floor are the only two
  pricing RULES** in the whole ordering system — everything else is table
  lookup (`priceDict`, from PHP's `$cenovnik`) and arithmetic.
