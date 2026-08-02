"""Guard: MD-First 2.0 tier coverage (rules/DOCS.md -> Tiers). Every source
file must have the docs its tier requires:

    Trivial      -> no __about/, no __flow/ (one line in the folder's
                    ___folder.md / README.md instead)
    Standard     -> __about/{name}.md only
    Algorithmic  -> __about/{name}.md AND __flow/{name}.md — and the flow
                    doc must have EARNED its place (root DOCS.md, owner
                    decision 2026-08-01): a Standard-tier file caught with
                    an unearned __flow/ doc fails here too

Root-level loose files (`config.php`, `index.php`) have no package — their
`__about/`/`__flow/` sit directly under the project root and `README.md`
plays the `___folder.md` role (root DOCS.md, "flat, root-level-only
projects" provision, applied per loose file).

`html/head/google.html` is deliberately OUTSIDE this guard's scope — see
`_guards_common.py`'s docstring and `html/head/___head.md`'s Design
Decisions: a pasted third-party snippet, not authored `.php`/`.js`/`.css`
logic.

The TIERS dict below is the project's single source of truth for tier
assignment (root MIGRATE-DOCS.md: "changing a file's tier means updating
THIS test in the same commit").

Run: python tests/test_docs_coverage.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _guards_common import PROJECT_ROOT, iter_source_files  # noqa: E402

TRIVIAL = "trivial"
STANDARD = "standard"
ALGORITHMIC = "algorithmic"

# ═══════════════════════════ TIER ASSIGNMENTS ═══════════════════════════

TIERS: dict[str, str] = {
    # -- project root: loose files, no package — README.md plays the ___folder.md role --
    "config.php": STANDARD,
    "index.php": TRIVIAL,

    # -- html/ (loose page-section templates) -----------------------------------
    "html/about_us.php": STANDARD,
    "html/carousel.php": STANDARD,
    "html/catalogue_home.php": STANDARD,
    "html/contact_us.php": STANDARD,
    "html/fixed.php": STANDARD,
    "html/ordering.php": ALGORITHMIC,
    "html/plise.php": STANDARD,
    "html/rolled.php": STANDARD,
    "html/singleSelector.php": STANDARD,

    # -- html/head/ ---------------------------------------------------------------
    "html/head/carouselFiles.php": STANDARD,
    "html/head/loader.php": TRIVIAL,
    # html/head/google.html is intentionally untracked — see module docstring.

    # -- html/includes/ ------------------------------------------------------------
    "html/includes/footer.php": STANDARD,
    "html/includes/head.php": STANDARD,
    "html/includes/header.php": STANDARD,
    "html/includes/variables.php": STANDARD,

    # -- katalog/ + route folders (thin page-assembly wiring) ---------------------
    "katalog/index.php": TRIVIAL,
    "katalog/fiksni-komarnici/index.php": TRIVIAL,
    "katalog/plise-komarnici/index.php": TRIVIAL,
    "katalog/rolo-komarnici/index.php": TRIVIAL,
    "kontakt/index.php": TRIVIAL,
    "o_nama/index.php": TRIVIAL,

    # -- js/ (loose) ----------------------------------------------------------------
    "js/init.js": ALGORITHMIC,

    # -- js/interaction/ -------------------------------------------------------------
    "js/interaction/catalogueText.js": STANDARD,
    "js/interaction/clickHover.js": STANDARD,
    "js/interaction/selectModel.js": ALGORITHMIC,

    # -- js/media/ ---------------------------------------------------------------------
    "js/media/carousel.js": ALGORITHMIC,
    "js/media/guide.js": STANDARD,
    "js/media/imagePreview.js": STANDARD,
    "js/media/media.js": STANDARD,

    # -- js/ordering/ --------------------------------------------------------------------
    "js/ordering/orderMemory.js": ALGORITHMIC,
    "js/ordering/orderTable.js": ALGORITHMIC,
    "js/ordering/showPopup.js": STANDARD,

    # -- js/style/ -----------------------------------------------------------------------
    "js/style/changeStyle.js": STANDARD,
    "js/style/colorizeSVG.js": ALGORITHMIC,
    "js/style/theme.js": STANDARD,
    "js/style/updateManifest.js": STANDARD,

    # -- css/ ----------------------------------------------------------------------------
    "css/about_us.css": STANDARD,
    "css/carousel.css": STANDARD,
    "css/catalogue.css": STANDARD,
    "css/contact_us.css": STANDARD,
    "css/fa.css": STANDARD,
    "css/footer.css": STANDARD,
    "css/guide.css": STANDARD,
    "css/header.css": STANDARD,
    "css/loader.css": STANDARD,
    "css/root.css": STANDARD,
    "css/singleCatalogue.css": STANDARD,
}

# html/head/google.html is the ONE tracked non-.php/.js/.css file this
# project ever considers — explicitly exempt from TIERS (see docstring).
UNTRACKED_SOURCES = {"html/head/google.html"}


def _about_path(source_path: Path) -> Path:
    return source_path.parent / "__about" / (source_path.stem + ".md")


def _flow_path(source_path: Path) -> Path:
    return source_path.parent / "__flow" / (source_path.stem + ".md")


def test_file_has_the_docs_its_tier_requires():
    failures = []
    for rel, tier in sorted(TIERS.items()):
        path = PROJECT_ROOT / rel
        if not path.exists():
            failures.append(f"TIERS lists a file that no longer exists: {rel}")
            continue
        about = _about_path(path)
        flow = _flow_path(path)

        if tier == TRIVIAL:
            if about.exists():
                failures.append(f"{rel} is Trivial tier but has an __about/ doc: {about}")
            if flow.exists():
                failures.append(f"{rel} is Trivial tier but has a __flow/ doc: {flow}")
        elif tier == STANDARD:
            if not about.exists():
                failures.append(f"{rel} is Standard tier and needs {about}")
            if flow.exists():
                failures.append(
                    f"{rel} is Standard tier but has a __flow/ doc ({flow}) — root DOCS.md: "
                    "the flow doc must EARN its place, downgrade the tier or delete the doc"
                )
        elif tier == ALGORITHMIC:
            if not about.exists():
                failures.append(f"{rel} is Algorithmic tier and needs {about}")
            if not flow.exists():
                failures.append(f"{rel} is Algorithmic tier and needs {flow}")
        else:
            failures.append(f"unknown tier {tier!r} for {rel}")

    assert not failures, "Docs coverage gaps:\n" + "\n".join(failures)


def test_every_source_file_is_classified():
    missing = []
    for path in iter_source_files():
        rel = path.relative_to(PROJECT_ROOT).as_posix()
        if rel in TIERS or rel in UNTRACKED_SOURCES:
            continue
        missing.append(rel)
    assert not missing, (
        "Source files with no tier assignment in TIERS (classify them per "
        "root DOCS.md's Tiers table): " + ", ".join(sorted(missing))
    )


def test_no_stale_tier_entries():
    stale = [rel for rel in TIERS if not (PROJECT_ROOT / rel).exists()]
    assert not stale, f"TIERS lists files that no longer exist: {stale}"


def test_no_orphaned_about_or_flow_doc():
    """An __about/ or __flow/ doc whose source file no longer exists
    (renamed, deleted, tier downgraded) cannot possibly be true — exactly
    the drift the Living Docs Rule exists to prevent."""
    from _guards_common import EXCLUDE_DIR_NAMES, SOURCE_EXTENSIONS

    orphans = []
    for about_dir in PROJECT_ROOT.rglob("__about"):
        if any(part in EXCLUDE_DIR_NAMES for part in about_dir.parts):
            continue
        source_dir = about_dir.parent
        for doc in about_dir.glob("*.md"):
            if not any((source_dir / (doc.stem + ext)).exists() for ext in SOURCE_EXTENSIONS):
                orphans.append(str(doc.relative_to(PROJECT_ROOT).as_posix()))
    for flow_dir in PROJECT_ROOT.rglob("__flow"):
        if any(part in EXCLUDE_DIR_NAMES for part in flow_dir.parts):
            continue
        source_dir = flow_dir.parent
        for doc in flow_dir.glob("*.md"):
            if not any((source_dir / (doc.stem + ext)).exists() for ext in SOURCE_EXTENSIONS):
                orphans.append(str(doc.relative_to(PROJECT_ROOT).as_posix()))
    assert not orphans, f"Orphaned docs (source file gone) — delete: {orphans}"


def test_every_code_folder_has_a_folder_doc():
    folders_with_code = {(PROJECT_ROOT / rel).parent for rel in TIERS}
    missing = []
    for folder in folders_with_code:
        if folder == PROJECT_ROOT:
            expected = PROJECT_ROOT / "README.md"  # root plays the ___folder.md role
        else:
            expected = folder / f"___{folder.name}.md"
        if not expected.exists():
            missing.append(str(expected.relative_to(PROJECT_ROOT).as_posix()))
    assert not missing, "Code folders missing their entry-point doc:\n" + "\n".join(missing)


def test_tests_folder_has_its_folder_doc_and_no_per_file_docs():
    tests_dir = PROJECT_ROOT / "tests"
    assert (tests_dir / "___tests.md").exists()
    assert not (tests_dir / "__about").exists()
    assert not (tests_dir / "__flow").exists()


def test_the_guard_is_actually_looking_at_this_project():
    assert len(TIERS) > 20, len(TIERS)
    assert {Path(rel).suffix for rel in TIERS} == {".php", ".js", ".css"}


if __name__ == "__main__":
    test_file_has_the_docs_its_tier_requires()
    test_every_source_file_is_classified()
    test_no_stale_tier_entries()
    test_no_orphaned_about_or_flow_doc()
    test_every_code_folder_has_a_folder_doc()
    test_tests_folder_has_its_folder_doc_and_no_per_file_docs()
    test_the_guard_is_actually_looking_at_this_project()
    print("PASS — test_docs_coverage")
