# CLAUDE.md — Vaske Komarnici

The monorepo constitution governs: read the root `CLAUDE.md` first, then load
ONLY the rulebook your job needs via its Router. Nothing universal is
restated here — this file carries project FACTS and project DELTAS, and may
only tighten root rules, never loosen them.

| Your job this session | Read (monorepo root) |
|------------------------|----------------------|
| Implement / fix | `rules/CODE.md` + the folder's `___folder.md` |
| Write documentation | `rules/DOCS.md` |
| Any GUI/visual work | `DESIGN.md` |
| Plan / brainstorm | `rules/PLAN.md` |

Start here for the code itself: [README](README.md) ->
[HTML (folder)](html/___html.md) / [JS (folder)](js/___js.md) /
[CSS (folder)](css/___css.md). Open decisions live in
[Open Questions](OPEN-QUESTIONS.md).

---

## Project Facts

- **Product:** commercial marketing + ordering site for an insect-screen
  ("komarnici") installation business, live at vaske-komarnici.com. PRODUCTION
  — the site earns money; treat every change as behavior-affecting until
  proven otherwise.
- **Stack:** PHP 8 (server-rendered, no framework, shared `html/includes/`
  partials), vanilla JavaScript (native ES modules, dynamic `import()`, zero
  build step — `js/init.js` is the one entry point every page's `<head>`
  imports), CSS3 (one stylesheet per page/component, no preprocessor). See
  root Rule #21 (Right Language for the Job): a small server-rendered
  marketing site with no SPA needs has no reason to reach for a framework or
  a build pipeline.
- **No build pipeline, no installer, no GitHub Releases.** Root `CLAUDE.md`'s
  Build & Release System (Rules #23/#24) governs *installable desktop apps*;
  this is a manually/CI-deployed website, so those rules do not apply here —
  there is nothing to `python setup/build.py` and no signed installer to
  release. Deployment mechanics are owner-managed and out of scope for coding
  sessions.
- **Ordering backend dependencies live outside git's tracked tree.**
  `html/ordering.php` (the order-mail endpoint, PHPMailer + SMTP + `.env`
  credentials) requires `PHPMailer/`, `vendor/` (Composer autoload) and `.env`
  as SIBLINGS inside this project's own docroot — `.gitignore` excludes all of
  them (`support/`, `PHPMailer/`, `.env`, `vendor/`, `composer.lock`,
  `composer.json`) because they are installed dependencies, not source. A
  local dev checkout needs `composer install` run here (or those folders
  copied in) before the order form can actually send mail; this project's
  baseline verification (`php -l`, `node --check`) does not require them.
- **Theming is server + client mirrored.** `config.php` picks one of four
  time-of-day palettes by hour (cookie-overridable); the chosen palette is
  both inlined into the page (`html/includes/head.php`'s `<meta>`/inline
  `background-color`) and handed to `js/style/theme.js` as a JSON config
  object so a client-side theme cycle (`themeCycle()`) can re-apply it
  without a reload.

## Enforcement

The four guard tests + `run_guards.py` + Claude Code hooks live in `tests/` /
`.claude/settings.json` (root `CODE.md` -> Enforcement — see
[Tests (folder)](tests/___tests.md)):

- `test_structure_law.py`'s RATCHET is **empty** — no file in this project
  crosses the ~1,000-line violation threshold (largest is
  `css/contact_us.css` at 394 lines).
- `test_config_sections.py`'s `CONFIG_FILES` is **empty** — its checker is
  Python-AST-based (root `CODE.md`'s checkable semantics), this project has
  no Python config module, and this is a deliberate seed, not an oversight:
  see the file's own docstring for the PHP/JS candidates
  (`html/includes/variables.php`'s `$ThemeColors`/`$cenovnik`,
  `js/style/colorizeSVG.js`'s `colorNames`) a future non-Python variant of
  the guard would cover.

## Project Deltas to the Root Rules

- **Commit format:** plain `0.0.000 description` (root convention, unchanged
  — no per-project delta).
- Communicate with the owner in Serbian (Latin script); everything written to
  files stays English (root Rules #12/#13) — unchanged, restated only because
  this project's own content (product copy, code comments in Serbian words
  like `komarnici`, `plise`, `rolo`) makes the boundary worth naming: **user
  input/output** is Serbian, **code identifiers and documentation prose** are
  English even when they describe Serbian-language product copy.
