# Vaske Komarnici

Commercial website for a window/door insect-screen (mosquito net) business. It presents a product catalog across three categories (fixed, pleated, and roller screens), a multi-step ordering system with persisted state, in-page video walkthroughs for key features, and SVG colorization for live product-color preview.

**Live:** https://vaske-komarnici.com

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Documentation](#documentation)

<a id="features"></a>

## Features

- Product catalog split into three screen types: fixed, pleated (plise), and roller (rolo) insect screens, each with frame-color / net-color / side-count variant selection and a live SVG-recolored preview
- Multi-step ordering flow that persists in-progress form data and the running order list across page loads (`sessionStorage`), submitted to the business by email through a PHPMailer backend
- Live SVG colorization so customers can preview a product in different frame colors before ordering
- A draggable/swipeable on-site installation-photo carousel with a keyboard-accessible lightbox preview
- In-page guided video walkthroughs for the header menu, product selector, carousel, and order table
- Time-of-day theming (morning / noon / afternoon / night palettes, cookie-persisted), a shared loading screen, and a responsive header/footer

<a id="tech-stack"></a>

## Tech Stack

- **Backend:** PHP (server-rendered pages, shared includes for head/header/footer; PHPMailer + `.env`-based SMTP credentials for the order-mail endpoint — both installed outside this repo, in the shared XAMPP `htdocs`)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (no framework, no build step — pages `import()` ES modules directly)
- **Structure:** feature-organized `js/` (ordering, interaction, media, style) and `css/` per page/component
- **Deployment:** manual/CI deploy to shared hosting — no installer, no build pipeline, no GitHub Releases (root `CLAUDE.md`'s Build & Release System and self-update rule apply to installable desktop apps, not this project)

<a id="documentation"></a>

## Documentation

This project follows the monorepo's MD-First 2.0 convention (root
[CLAUDE.md](CLAUDE.md) -> `rules/DOCS.md`): every code folder has its own
`___folder.md` entry point, linking down to `__about/` (what a file does) and
`__flow/` (how — for the handful of files whose logic a diagram genuinely
clarifies).

Root-level loose files (`config.php`, `index.php` — no package of their own):

| File | Tier | One line |
|------|------|----------|
| `config.php` | Standard | time-of-day theme resolution, cookie-overridable — [about](__about/config.md) |
| `index.php` | Trivial | home-page assembly (config + shared includes) |

Folders:

| Folder | Role |
|--------|------|
| [html (folder)](html/___html.md) | Page-section templates: shared `<head>`/header/footer includes, the product catalogue sections, the ordering form, and the PHPMailer send endpoint |
| [js (folder)](js/___js.md) | All site behavior: page-load orchestration, interaction, media, ordering, and theming/SVG colorization |
| [css (folder)](css/___css.md) | Stylesheets, one per page/component, plus the shared base/reset |
| [katalog (folder)](katalog/___katalog.md) | `/katalog/` catalogue routes (full catalogue + one per screen type) |
| [kontakt (folder)](kontakt/___kontakt.md) | `/kontakt/` ordering-page route |
| [o_nama (folder)](o_nama/___o_nama.md) | `/o_nama/` about-us route |
| [tests (folder)](tests/___tests.md) | The four guard tests (THE STRUCTURE LAW, THE CONFIG SECTION LAW, docs coverage, doc links) |

Other project docs: [AI Guidance](CLAUDE.md) · [Open Questions](OPEN-QUESTIONS.md)
