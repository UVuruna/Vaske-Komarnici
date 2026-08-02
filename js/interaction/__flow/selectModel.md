# Select Model — Flow

**About:** [description](../__about/selectModel.md)

## Algorithm

```mermaid
%%{init: {'flowchart': {'subGraphTitleMargin': {'top': 0, 'bottom': 35}}}}%%
flowchart TB
    A["selectModel()"]
    B["import catalogueText.js"]
    C["for each .selectFrame img/i on the page:\nchangeModel(selector)"]

    subgraph INIT["changeModel — first touch of a promo"]
        D{"promo already in seenPromos?"}
        E["read promoImage src -&gt; getParts() -&gt; findElements()\n-&gt; catalogueText(...) seeds the sidebar text"]
        F["mark promo as seen"]
    end

    subgraph CLICK["changeModel — registered onclick, fires on EVERY click"]
        G["fade image out (opacity 0)"]
        H["wait 500ms"]
        I{"clicked element is the 'ban' icon (&lt;i&gt;)?"}
        J["NORMAL swap: name = clicked icon's own filename segment\n(White/Brown/Antracite/Light/Dark/Both/One)"]
        K{"current image has neither 'Light' nor 'Dark'\nin its filename?"}
        L["append default '_White_Light' suffix first\n(bare-frame photos have no net segment to swap)"]
        M["find which category array (sides/frame/net) contains `name`\nfind which segment of THAT array is in the current filename\nreplace that segment with `name` in the image src"]
        N["TYPE-CYCLE swap: parse current filename's leading\n1 segment (Rolled) or 2 segments (Fixed/Plise*) as the base type\nadvance to the type's own frame/net segments unchanged"]
        O["image.src = new filename"]
        P["catalogueText( findElements( getParts(new filename), selector ) )"]
        Q["wait 100ms, fade image back in"]
    end

    A --> B --> C --> D
    D -- no --> E --> F
    D -- yes --> CLICK
    F -.-> CLICK
    G --> H --> I
    I -- no --> J --> K
    K -- yes --> L --> M
    K -- no --> M
    I -- yes --> N
    M --> O --> P --> Q
    N --> O
```

```mermaid
%%{init: {'flowchart': {'subGraphTitleMargin': {'top': 0, 'bottom': 35}}}}%%
flowchart TB
    A2["findElements(imageStringList, selector)"]
    B2["container = selector.closest('.promoContainer')"]
    C2["for each segment string in imageStringList:\nfor each TYPES category (type/sides/frame/net):\nif category's array includes the segment -&gt; classify it"]
    D2{"segment's category == 'sides'?"}
    E2["key = mainType + '_' + segment\n(e.g. 'Fixed_Both')\nvalue = container's .sides element"]
    F2["key = segment itself\nvalue = container's .{category} element"]
    G2{"fewer than 3 segments classified?"}
    H2["dict['empty'] = [frame, net, frameTitle, netTitle elements]\n(hide the explanation — not enough info yet)"]
    I2["dict['titles'] = [frameTitle, netTitle elements]\n(show the section titles, real text fills in per key)"]
    J2["return dict"]

    A2 --> B2 --> C2 --> D2
    D2 -- yes --> E2 --> G2
    D2 -- no --> F2 --> G2
    G2 -- yes --> H2 --> J2
    G2 -- no --> I2 --> J2
```

Pseudocode (language-neutral):

    FUNCTION selectModel():
        AWAIT import catalogueText module
        seenPromos = empty set
        FOR EACH selector IN page's '.selectFrame img, .selectFrame i':
            register onclick on selector.parentElement:
                promo = selector's enclosing '.promo'
                IF promo not in seenPromos:
                    seed the promo's explanation text from its CURRENT image
                    mark promo as seen
                fade the promo image out
                AFTER 500ms:
                    IF clicked element is the 'ban' icon (no-selection placeholder):
                        cycle the OVERALL TYPE (Rolled / PliseDoor / PliseWindow / Fixed)
                        keeping the current frame/net/side segments as-is
                    ELSE:
                        name = the clicked icon's OWN segment value
                        IF current image has neither a 'Light' nor 'Dark' segment:
                            normalize it to a default '_White_Light' variant first
                        find which of [sides, frame, net] contains `name`
                        replace the matching segment already in the image filename with `name`
                    new filename -> image.src
                    re-derive the explanation dict from the NEW filename -> catalogueText(...)
                    AFTER 100ms: fade the image back in

    FUNCTION findElements(segments, selector):
        container = selector's enclosing '.promoContainer'
        result = {}
        FOR EACH segment IN segments:
            classify segment against TYPES = {type, sides, frame, net}
            IF category is 'sides': key = mainType + '_' + segment   # e.g. "Fixed_Both"
            ELSE: key = segment
            result[key] = container's matching '.{category}' element
        IF result has fewer than 3 entries:
            result['empty'] = [frame/net/title elements]   # not enough segments recognized — hide the sidebar
        ELSE:
            result['titles'] = [frame/net title elements]  # show section headers; catalogueText fills the rest
        RETURN result

## Notes

- **Two independent click semantics share one handler.** A frame/net/side
  icon click SWAPS one segment within its own category; the `<i>` "ban"
  placeholder icon click instead CYCLES the entire product TYPE — the
  `selector.tagName !== 'I'` check is the only thing distinguishing them.
- **`findElements()`'s `<= 2` / `> 2` branch is a heuristic, not a named
  state.** Fewer than 3 classified segments means the filename did not carry
  enough information to describe frame+net+type+side together (e.g. a
  bare `Fixed_Both.webp` placeholder with no color yet) — the sidebar hides
  rather than showing partial/wrong text.
