# tests/

The four project guard tests (root `rules/CODE.md` -> Enforcement) plus a
shared helper and a fast runner. Per root `rules/DOCS.md`'s tier table,
`tests/` is its own dedicated docs tier — **this folder doc is the only doc
any file here gets**, individual guard modules are named and described
below by one line each, not given `__about/`/`__flow/` docs of their own.

This project has no other automated test suite (a PHP/JS/CSS website with no
Python runtime code) — the guards ARE the whole `tests/` folder.

## Files

- `_guards_common.py` — `iter_source_files()` / `iter_doc_files()`, pruning
  vendored/build directories during the walk (not after) so the guards stay
  fast. `SOURCE_EXTENSIONS = {.php, .js, .css}` — see its own docstring for
  why `html/head/google.html` is deliberately outside that set.
- `test_structure_law.py` — THE STRUCTURE LAW: no `.php`/`.js`/`.css` file
  over ~1,000 lines outside the `RATCHET` allowlist (currently empty —
  `css/contact_us.css` at 394 lines is this project's largest file).
- `test_config_sections.py` — THE CONFIG SECTION LAW: every top-level
  definition in a `CONFIG_FILES` entry sits under a `# ══...══` section
  banner; no post-definition table patching; no duplicate dict keys.
  `CONFIG_FILES` is deliberately **empty** — the checker is Python-AST-based
  and this project has no Python source; see the file's own docstring for
  the PHP/JS candidates a future non-Python variant would cover.
- `test_docs_coverage.py` — every source file has the `__about`/`__flow`
  docs its tier requires; `TIERS` here is the project's single source of
  truth (update this file in the same commit as any tier change).
- `test_doc_links.py` — every relative link in every `.md` resolves to a
  real file, and every `.md` is reachable from `README.md`.
- `run_guards.py` — runs all four (or, with `--fast`, just structure +
  config-sections — the PostToolUse hook's speed budget); exits 2 on any
  failure. Wired into `.claude/settings.json` (PostToolUse `--fast`, Stop
  full). Run directly: `python tests/run_guards.py`.

These are plain `assert`-based functions (pytest-discoverable — this
environment has `pytest` available — but `run_guards.py` calls them
directly, matching the guard-runner pattern used elsewhere in the monorepo
for non-Python-native projects).

## Connections

### Uses

- [Root files](../README.md), [HTML (folder)](../html/___html.md),
  [JS (folder)](../js/___js.md), [CSS (folder)](../css/___css.md),
  [Katalog (folder)](../katalog/___katalog.md),
  [Kontakt (folder)](../kontakt/___kontakt.md),
  [O Nama (folder)](../o_nama/___o_nama.md) — everything `iter_source_files()`
  / `iter_doc_files()` walk

### Used by

- `.claude/settings.json` — PostToolUse (`--fast`) and Stop (full) hooks

## Design Decisions

- **`tests/` is a dedicated docs tier** (root `DOCS.md` -> Tiers): individual
  guard modules get NO `__about/`/`__flow/` docs of their own — this folder
  doc is the only one, by design.
- **No language-specific config-section checker was built for this
  session.** See `test_config_sections.py`'s own docstring — building a
  PHP/JS-AST equivalent is real, separate work, correctly out of scope for
  a docs-migration session that must change zero behavior.
