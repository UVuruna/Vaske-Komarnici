# Open Questions — Vaske Komarnici

Dilemmas surfaced during autonomous sessions that need an owner call.
Tracked and linked from [README.md](README.md) per root Rule #18/CLAUDE.md.

## 2026-08-02 — Docs migration to MD-First 2.0 + enforcement layer

Autonomous overnight session (root `MIGRATE-DOCS.md`). PRODUCTION site — zero
code behavior was changed; everything below is either a judgment call made
in the session's favor (surfaced for the owner to overturn if wrong) or an
observed code issue flagged, not fixed, per the session's hard constraint.

### Observed code issues — flagged, NOT fixed (zero behavior change is the rule for this session)

1. **`js/ordering/orderMemory.js`: `document.addEventListener('DOMContentLoaded',
   loadSavedOrder())` calls `loadSavedOrder` immediately** (the trailing
   `()` invokes it on the spot) and passes its return value — a `Promise` —
   as the listener, which is not callable. Harmless in practice: both
   branches of the surrounding `readyState` check end up calling
   `loadSavedOrder()` synchronously either way, and by the time this module
   is dynamically imported (deep in `js/init.js`'s chain) the document has
   virtually always finished loading. Documented in
   [Order Memory (flow)](js/ordering/__flow/orderMemory.md).
2. **`js/ordering/orderTable.js`'s `calculatePrice()` has an unreachable
   `else` branch that references `areaSpan`**, a variable that does not
   exist in that function's scope (only `calculateArea()` declares a local
   of that name) — would throw `ReferenceError` if ever hit. In practice
   `.Area`/`.quantity` always start pre-populated with valid numeric text,
   so the branch is never reached. Documented in
   [Order Table (flow)](js/ordering/__flow/orderTable.md).
3. **`js/style/colorizeSVG.js`'s `createColoredPalette()` has a dead
   early-return guard**: `if (grayPalette == 1)` compares an ARRAY to the
   number `1` with `==`, which is essentially never true for a hex-color
   array. The evident intent was `grayPalette.length === 1`; as written the
   guard never fires, but the general loop below it produces the same
   correct result for a one-element palette anyway — dead code with no
   observed behavioral effect. Documented in
   [Colorize SVG (flow)](js/style/__flow/colorizeSVG.md).
4. **`html/ordering.php` (the order-mail endpoint) has no CSRF token and no
   rate limiting** — any POST from anywhere is accepted and triggers an
   email send. Flagged as observed behavior on a production endpoint, not a
   docs-migration-session fix. Documented in
   [Ordering (flow)](html/__flow/ordering.md).
5. **`js/ordering/orderMemory.js` hand-mirrors `js/ordering/orderTable.js`'s
   order-row cell shape** (classes/ids `addOrder()`/`addTotalRow()` set) to
   rebuild a restored row identically, rather than sharing one row-building
   function between "add" and "restore". Not a bug — both code paths are
   currently correct and in sync — but a duplication worth collapsing into
   a shared helper the next time either file is touched for a feature
   reason. Documented in [js/ordering (folder)](js/ordering/___ordering.md)'s
   Design Decisions.

### Tier judgments made and why

| Judgment | Reasoning |
|----------|-----------|
| 7 of 49 tracked source files tiered Algorithmic (`html/ordering.php`, `js/init.js`, `js/interaction/selectModel.js`, `js/media/carousel.js`, `js/ordering/orderMemory.js`, `js/ordering/orderTable.js`, `js/style/colorizeSVG.js`) | Each has a genuine multi-step protocol, cascading multi-level state, a real drag/momentum state machine, or nontrivial math a diagram tells better than the code — the narrowed "would the diagram just restate the code?" test (root DOCS.md, 2026-08-01 decision), applied per-file. The brief's own hint named the ordering flow and the SVG colorization pipeline as "likely candidates"; `init.js`/`selectModel.js`/`carousel.js` were added on top of that because each independently matches a named DOCS.md signal (a protocol with ordered steps; cascading multi-level state; nontrivial geometry/math), not by folder-default. |
| `js/style/theme.js` stayed Standard despite orchestrating multiple modules | Its own logic (index-cycle through 4 themes, cookie set, a flat `Promise.all` fan-out with one `if` branch) is fully captured in prose — the diagram would mostly restate a list of function calls already documented as a list in [Theme](js/style/__about/theme.md). Reconsidered against `init.js` (kept Algorithmic): `init.js`'s branching (`Showcase`/`Carousel`/`Ordering` combined into 4 distinct promise combinations) is the more genuine "protocol with ordered steps." |
| `js/media/guide.js`, `js/media/imagePreview.js`, `js/media/media.js` stayed Standard | Each is a well-known, repeated browser-API idiom (focus trap, wraparound index nav, `IntersectionObserver` callback) rather than a novel algorithm — the diagram test again: prose fully covers "observe → on intersect → act." |
| `index.php` (root) and the six `katalog`/`kontakt`/`o_nama` route `index.php` files tiered Trivial | All eight are near-identical page-assembly wiring (set a few PHP variables, `include` 4-6 shared partials) — textbook "plain wiring" per DOCS.md's Trivial definition, despite several being just over the ~60-line heuristic (the nature-over-line-count rule). |
| `config.php` (12 lines) tiered Standard, not Trivial | Short, but it is a real business rule (time-of-day theme resolution with a cookie override), not glue — callers (`html/includes/variables.php`) depend on its specific behavior, which earns a description. |
| `html/head/google.html` excluded from every guard's scope entirely (not even Trivial-tiered) | A pasted third-party snippet (Google Tag Manager / AdSense / a static JSON-LD block), not authored `.php`/`.js`/`.css` logic — treated like a vendored/static asset. One line in `html/head/___head.md` is its whole documentation. If it ever grows real conditional logic, it should become `.php` and get a tier. |
| `tests/test_config_sections.py`'s `CONFIG_FILES` seeded EMPTY | The law's checker is Python-`ast`-based and this project has zero Python source. `html/includes/variables.php`'s `$ThemeColors`/`$cenovnik` and `js/style/colorizeSVG.js`'s `colorNames` are the real PHP/JS config-table candidates a future non-Python variant of the guard should cover — named explicitly in the test file's own docstring rather than silently omitted. |
| `tests/test_structure_law.py`'s `RATCHET` seeded EMPTY | No file in the project exceeds ~400 lines (`css/contact_us.css` is the largest at 394) — confirmed by the Phase 0 inventory, not assumed. |
| Root-level loose files (`config.php`, `index.php`) get `__about/`/`__flow/` directly under the project root, `README.md` plays their `___folder.md` role | Matches the precedent set by other monorepo projects with root-level loose scripts (root DOCS.md's flat-project provision, applied per-loose-file rather than requiring the whole project to be flat) — this project has BOTH root-loose files and package-like folders (`html/`, `js/`, `css/`), so only the two loose files use this provision. |

### Awaiting a decision

None of the above blocked completion. The five flagged code observations are
genuine candidates for a future FIX session (not this one — zero behavior
change was the hard constraint), and the tier/seed judgments are reversible
in a follow-up commit if the owner disagrees with any of them.
