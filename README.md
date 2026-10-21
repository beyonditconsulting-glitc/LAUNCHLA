# My Work

A quiet, mobile-friendly home for ten work projects and 65 resource links.

Open `index.html` in a browser, or serve this directory with `python -m http.server 3000 --bind 0.0.0.0`. There are no dependencies, external fonts, or build steps. Use the existing checkout; no extra Git worktree is needed.

The home screen shows pinned shortcuts, four main projects, and an expandable Other projects section. Project pages group documents by purpose. Search looks across every project and personal note. Each document's options menu contains pinning, personal notes, source information, and related projects. Settings contains resource creation, backup export/import, and duplicate-link review.

All original resource IDs and the `workroom-v1` browser storage key are retained, preserving previous favorites (now pins), notes, and custom resources on the same browser origin. Backups from the previous dashboard also work. Personal settings do not automatically sync between devices. Linked Google/Microsoft documents retain their original permissions; their contents are not fetched or synced.

## GitHub Pages

In repository Settings → Pages, choose Deploy from a branch, main, and / (root). After a successful deployment the expected address is https://mag8389.github.io/LAUNCHLA/. A GitHub Pages deployment must complete before the address works. Mobile browsers can add the site to their Home Screen.

## Validation

Browser smoke checks passed for the simplified home, all ten projects, preserved favorites/notes/custom links, pin/unpin, global and note search, resource creation, backup export/import, duplicate-link review, and mobile layout with resource details expanded. No browser errors occurred. Live GitHub Pages access is not verified from this environment.
