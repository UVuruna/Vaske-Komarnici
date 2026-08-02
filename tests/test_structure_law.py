"""Guard: THE STRUCTURE LAW (root CLAUDE.md Priority S / Rule #20, rules/CODE.md
-> Enforcement). No `.php` / `.js` / `.css` source file may exceed ~1,000
lines unless it is in the RATCHET allowlist below. Each allowlist entry
documents WHY the file stays whole and which session owes the split. The
allowlist may only SHRINK — adding an entry requires the owner's explicit
approval in that same session.

Run: python tests/test_structure_law.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _guards_common import PROJECT_ROOT, iter_source_files  # noqa: E402

THRESHOLD = 1000

# THE RATCHET — may only SHRINK. The 2026-08-02 docs-migration inventory
# found no file over ~400 lines anywhere in this project (css/contact_us.css
# at 394 is the largest) — no god-files exist to tolerate.
RATCHET: dict[str, str] = {}


def _line_count(path: Path) -> int:
    with path.open("r", encoding="utf-8", errors="replace") as handle:
        return sum(1 for _ in handle)


def test_no_file_exceeds_structure_law_threshold():
    violations = []
    for path in iter_source_files():
        rel = path.relative_to(PROJECT_ROOT).as_posix()
        if rel in RATCHET:
            continue
        lines = _line_count(path)
        if lines > THRESHOLD:
            violations.append(f"{rel}: {lines} lines (> {THRESHOLD}, no RATCHET entry)")
    assert not violations, "THE STRUCTURE LAW violated:\n" + "\n".join(violations)


def test_ratchet_entries_reference_existing_files():
    missing = [rel for rel in RATCHET if not (PROJECT_ROOT / rel).exists()]
    assert not missing, f"RATCHET entries for files that no longer exist: {missing}"


def test_ratchet_entries_are_still_over_threshold():
    """A file that healed (shrank back under the threshold) must leave the
    ratchet — an entry tolerating a file that no longer needs tolerating is
    stale and must be deleted, not left behind."""
    healed = [
        rel for rel in RATCHET
        if (PROJECT_ROOT / rel).exists() and _line_count(PROJECT_ROOT / rel) <= THRESHOLD
    ]
    assert not healed, f"RATCHET entries for files that healed (<= {THRESHOLD} lines now): {healed}"


def test_the_guard_is_actually_looking_at_this_project():
    """A guard that walks zero files passes forever."""
    names = {path.name for path in iter_source_files()}
    assert {"index.php", "init.js", "root.css"} <= names


if __name__ == "__main__":
    test_no_file_exceeds_structure_law_threshold()
    test_ratchet_entries_reference_existing_files()
    test_ratchet_entries_are_still_over_threshold()
    test_the_guard_is_actually_looking_at_this_project()
    print("PASS — test_structure_law")
