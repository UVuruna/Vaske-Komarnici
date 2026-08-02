"""Shared helpers for the project's guard tests (test_structure_law,
test_config_sections, test_docs_coverage, test_doc_links). Not a test module
itself — no `test_` prefix, pytest will not collect it.

This is a PHP + vanilla-JS + CSS website (no Python runtime code at all) —
the guards are Python because THE STRUCTURE LAW and the docs-coverage rules
are monorepo-wide (root CODE.md / DOCS.md), not tied to any one language.
`iter_source_files()` walks `.php` / `.js` / `.css` only, per this project's
migration brief. `html/head/google.html` is the ONE tracked file outside that
set (a pasted third-party analytics/JSON-LD snippet, not authored logic) — it
is deliberately excluded from every guard's source scope, exactly like the
vendored fonts/img assets, and gets a one-line mention in its folder doc
instead of formal tier tracking.
"""

import os
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Directories never scanned by any guard. support/, PHPMailer/ and vendor/
# are this project's .gitignore entries (the PHPMailer dependency and its
# Composer vendor tree live in the shared XAMPP htdocs, outside this repo) —
# listed here defensively in case a local checkout ever nests them inside.
EXCLUDE_DIR_NAMES = {
    ".git", ".claude", "UV", "__pycache__", ".pytest_cache",
    "node_modules", "vendor", "support", "PHPMailer", "dist", "build",
}

SOURCE_EXTENSIONS = {".php", ".js", ".css"}


def _walk_files(suffixes: set[str]):
    for dirpath, dirnames, filenames in os.walk(PROJECT_ROOT):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIR_NAMES]
        for name in filenames:
            if Path(name).suffix in suffixes:
                yield Path(dirpath) / name


def iter_source_files(extensions=SOURCE_EXTENSIONS):
    """Yields every project source file with one of `extensions`, skipping
    vendored/build directories (pruned, not just filtered)."""
    yield from _walk_files(extensions)


def iter_doc_files():
    """Yields every project .md file, skipping vendored/build dirs and the
    owner's gitignored UV/ inbox."""
    yield from _walk_files({".md"})
