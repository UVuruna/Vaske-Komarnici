"""Fast guard runner — THE STRUCTURE LAW, THE CONFIG SECTION LAW, docs
coverage, and doc-links, wired into Claude Code hooks (.claude/settings.json).

Exit 2 on any guard failure (what makes a PostToolUse/Stop hook BLOCKING);
exit 0 when every guard is green. This project has no other test suite to
protect from — guards only, kept fast and deterministic per rules/CODE.md ->
Enforcement.

Usage:
    python tests/run_guards.py           # all four guards
    python tests/run_guards.py --fast    # structure + config-sections only
                                          # (the PostToolUse hook's speed budget)

When Claude Code invokes this as a PostToolUse hook, the tool-call JSON
arrives on stdin: `{"tool_input": {"file_path": "..."}, ...}`. In `--fast`
mode, a call for a file that is NOT `.php`/`.js`/`.css` exits 0 immediately,
before any guard module is even imported — a docs-only session must not pay
the guard cost on every single markdown edit.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

SOURCE_SUFFIXES = (".php", ".js", ".css")


def _hook_payload() -> dict | None:
    if sys.stdin.isatty():
        return None
    try:
        raw = sys.stdin.read()
    except Exception:
        return None
    if not raw.strip():
        return None
    try:
        return json.loads(raw)
    except ValueError:
        return None


def _fast_exit_for_non_source() -> bool:
    payload = _hook_payload()
    if payload is None:
        return False
    file_path = payload.get("tool_input", {}).get("file_path")
    if not file_path:
        return False
    return Path(file_path).suffix not in SOURCE_SUFFIXES


def main() -> int:
    fast_only = "--fast" in sys.argv[1:]
    if fast_only and _fast_exit_for_non_source():
        return 0

    import test_structure_law as structure_law
    import test_config_sections as config_sections
    import test_docs_coverage as docs_coverage
    import test_doc_links as doc_links

    FAST_CHECKS = [
        ("structure law", structure_law.test_no_file_exceeds_structure_law_threshold),
        ("structure law (ratchet refs)", structure_law.test_ratchet_entries_reference_existing_files),
        ("structure law (ratchet shrinks)", structure_law.test_ratchet_entries_are_still_over_threshold),
        ("config sections", config_sections.test_config_sections_law),
        ("config sections (seed pinned)", config_sections.test_config_files_is_deliberately_empty),
        ("config sections (checker self-test)", config_sections.test_checker_catches_a_planted_violation),
    ]
    FULL_ONLY_CHECKS = [
        ("docs coverage (required docs)", docs_coverage.test_file_has_the_docs_its_tier_requires),
        ("docs coverage (classified)", docs_coverage.test_every_source_file_is_classified),
        ("docs coverage (no stale tiers)", docs_coverage.test_no_stale_tier_entries),
        ("docs coverage (no orphaned docs)", docs_coverage.test_no_orphaned_about_or_flow_doc),
        ("docs coverage (folder docs)", docs_coverage.test_every_code_folder_has_a_folder_doc),
        ("docs coverage (tests/ folder)", docs_coverage.test_tests_folder_has_its_folder_doc_and_no_per_file_docs),
        ("doc links (no broken links)", doc_links.test_every_relative_link_resolves_to_a_real_file),
        ("doc links (reachable from README)", doc_links.test_every_doc_reachable_from_readme),
    ]

    checks = FAST_CHECKS if fast_only else FAST_CHECKS + FULL_ONLY_CHECKS

    failures = []
    for name, check in checks:
        try:
            check()
        except AssertionError as e:
            failures.append(f"[{name}] {e}")

    if failures:
        print("GUARDS FAILED:\n", file=sys.stderr)
        for f in failures:
            print(f, file=sys.stderr)
            print(file=sys.stderr)
        return 2

    scope = "fast (structure + config-sections)" if fast_only else "full (all four guards)"
    print(f"GUARDS PASSED — {scope}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
