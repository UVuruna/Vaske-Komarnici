# Vaske Komarnici

Commercial website for a window/door insect-screen (mosquito net) business. It presents a product catalog across three categories (fixed, pleated, and roller screens), a multi-step ordering system with persisted state, installation guides, and SVG colorization for live product-color preview.

## Features

- Product catalog split into three screen types: fixed, pleated (plise), and roller (rolo) insect screens
- Multi-step ordering flow that persists in-progress form data and the running order list across page loads (`sessionStorage`)
- Live SVG colorization so customers can preview a product in different frame colors before ordering
- Installation guides and an image/media preview carousel per product
- Responsive header/footer, theming, and a loading screen shared across pages

## Tech Stack

- **Backend:** PHP (server-rendered pages, shared includes for head/header/footer)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (no framework)
- **Structure:** feature-organized `js/` (ordering, interaction, media, style) and `css/` per page/component
