# katalog/

The `/katalog/` route: the combined catalogue page, plus one subfolder per
screen type for its own dedicated route.

## Files

| File | Tier | One line |
|------|------|----------|
| `index.php` | Trivial | page-assembly wiring: config + all three type sections + carousel |

## Subfolders

| Folder | Role |
|--------|------|
| [fiksni-komarnici (subfolder)](fiksni-komarnici/___fiksni-komarnici.md) | `/katalog/fiksni-komarnici/` route |
| [plise-komarnici (subfolder)](plise-komarnici/___plise-komarnici.md) | `/katalog/plise-komarnici/` route |
| [rolo-komarnici (subfolder)](rolo-komarnici/___rolo-komarnici.md) | `/katalog/rolo-komarnici/` route |

## Connections

### Uses

- [HTML (folder)](../html/___html.md) — `index.php` composes
  [Fixed](../html/__about/fixed.md), [Rolled](../html/__about/rolled.md),
  [Plise](../html/__about/plise.md) and
  [Carousel](../html/__about/carousel.md) into one page

### Used by

- [Header](../html/includes/__about/header.md) — the "Katalog" nav link

## Design Decisions

- **Directory-per-route, not query strings** — `/katalog/fiksni-komarnici/`
  resolves to `katalog/fiksni-komarnici/index.php` via Apache/PHP's directory
  index convention, giving clean URLs with no rewrite rules needed.
