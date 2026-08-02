"""Guard: THE CONFIG SECTION LAW (root CLAUDE.md Rule #20 addendum /
rules/CODE.md -> Enforcement). Every file listed in CONFIG_FILES must have
every top-level definition sitting under a `# ══...══` section banner, must
never post-definition-patch an earlier module-level table, and must never
define a dict literal with duplicate keys.

CONFIG_FILES is SEEDED EMPTY for this project, deliberately — not an
oversight:

- The law's checkable semantics (root CODE.md) are defined via Python's
  `ast` module. This project has **zero Python source** — it is PHP +
  vanilla JS + CSS — so there is no file this checker can even parse today.
- The two real config-table candidates in this codebase are BOTH non-Python:
  `html/includes/variables.php`'s `$ThemeColors` / `$cenovnik` tables, and
  `js/style/colorizeSVG.js`'s `colorNames` lookup. Building a PHP-AST or
  JS-AST equivalent of the checker below is real, separate work — out of
  scope for a docs-migration session (root MIGRATE-DOCS.md's brief:
  "test_config_sections.py seeds EMPTY with a written note"). If either file
  is ever heavily reworked, THAT session is the natural place to build the
  non-Python variant and seed CONFIG_FILES for real.
- The Python checker below is kept — dormant, proven by
  `test_checker_catches_a_planted_violation` — as the reference
  implementation a future PHP/JS variant would mirror, and in case a Python
  build/tooling script is ever added to this project.

Run: python tests/test_config_sections.py
"""

import ast
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _guards_common import PROJECT_ROOT  # noqa: E402

# ═══════════════════════════ CONFIG_FILES ═══════════════════════════
# Deliberately empty — see module docstring.
CONFIG_FILES: list[str] = []

BANNER_RE = re.compile(r"#.*═{5,}")


def _banner_lines(source: str) -> list[int]:
    return [i + 1 for i, line in enumerate(source.splitlines()) if BANNER_RE.search(line)]


def _top_level_table_names(tree: ast.Module) -> set[str]:
    names = set()
    for node in tree.body:
        if isinstance(node, ast.Assign):
            names.update(t.id for t in node.targets if isinstance(t, ast.Name))
        elif isinstance(node, ast.AnnAssign) and isinstance(node.target, ast.Name):
            names.add(node.target.id)
    return names


def _is_boilerplate(node: ast.stmt) -> bool:
    if isinstance(node, (ast.Import, ast.ImportFrom)):
        return True
    if isinstance(node, ast.Expr) and isinstance(getattr(node, "value", None), ast.Constant):
        return True
    return False


def _check_source(source: str, rel: str) -> list[str]:
    """The reusable checker: Python source in, list of THE CONFIG SECTION
    LAW violations out. Kept separate from file I/O so it can be exercised
    directly against a planted in-memory example (see the self-test below)
    without needing a real file on disk."""
    problems = []
    tree = ast.parse(source, filename=rel)
    banners = _banner_lines(source)
    table_names = _top_level_table_names(tree)

    for node in tree.body:
        if _is_boilerplate(node):
            continue
        if not any(b <= node.lineno for b in banners):
            problems.append(f"{rel}:{node.lineno}: top-level definition outside any section banner")

        if isinstance(node, ast.Assign):
            for t in node.targets:
                if isinstance(t, ast.Subscript) and isinstance(t.value, ast.Name) \
                        and t.value.id in table_names:
                    problems.append(
                        f"{rel}:{node.lineno}: post-definition patch of "
                        f"{t.value.id!r} ({t.value.id}[...] = ... away from its section)"
                    )
        if isinstance(node, ast.Expr) and isinstance(node.value, ast.Call):
            call = node.value
            if isinstance(call.func, ast.Attribute) and call.func.attr == "update" \
                    and isinstance(call.func.value, ast.Name) \
                    and call.func.value.id in table_names:
                problems.append(
                    f"{rel}:{node.lineno}: post-definition patch of "
                    f"{call.func.value.id!r} (.update(...) away from its section)"
                )

    for dict_node in ast.walk(tree):
        if not isinstance(dict_node, ast.Dict):
            continue
        seen = set()
        for key in dict_node.keys:
            if key is None or not isinstance(key, ast.Constant):
                continue
            if key.value in seen:
                problems.append(f"{rel}:{dict_node.lineno}: duplicate dict key {key.value!r}")
            seen.add(key.value)

    return problems


def _check_file(path: Path) -> list[str]:
    rel = path.relative_to(PROJECT_ROOT).as_posix()
    return _check_source(path.read_text(encoding="utf-8"), rel)


# ═══════════════════════════ TESTS ═══════════════════════════


def test_config_sections_law():
    all_problems = []
    for rel in CONFIG_FILES:
        path = PROJECT_ROOT / rel
        assert path.exists(), f"CONFIG_FILES entry does not exist: {rel}"
        all_problems.extend(_check_file(path))
    assert not all_problems, "THE CONFIG SECTION LAW violated:\n" + "\n".join(all_problems)


def test_config_files_is_deliberately_empty():
    """Pins the empty seed as intentional (see module docstring) — a change
    here must come with a real CONFIG_FILES entry and section banners added
    to that file in the SAME commit, not a silent widening."""
    assert CONFIG_FILES == []


def test_checker_catches_a_planted_violation():
    """THE STRUCTURE LAW's own guard self-test rule (root CODE.md
    Enforcement): a guard must be SHOWN failing on a real violation and
    passing once it is fixed. CONFIG_FILES has no real project file to
    plant a violation in (see docstring), so this exercises `_check_source`
    directly against a synthetic snippet — proving the checker logic itself
    actually catches all three violation classes THE CONFIG SECTION LAW
    defines."""
    bad_source = (
        "TABLE = {'a': 1, 'a': 2}\n"          # duplicate key, AND no banner at all
        "# ════════ SECTION ════════\n"
        "OTHER = {'x': 1}\n"
        "TABLE['b'] = 3\n"                     # post-definition patch
    )
    problems = _check_source(bad_source, "synthetic.py")
    assert any("outside any section banner" in p for p in problems), problems
    assert any("duplicate dict key" in p for p in problems), problems
    assert any("post-definition patch" in p for p in problems), problems

    good_source = (
        "# ════════ SECTION ════════\n"
        "TABLE = {'a': 1, 'b': 2}\n"
        "OTHER = {'x': 1}\n"
    )
    assert _check_source(good_source, "synthetic.py") == []


if __name__ == "__main__":
    test_config_sections_law()
    test_config_files_is_deliberately_empty()
    test_checker_catches_a_planted_violation()
    print("PASS — test_config_sections")
