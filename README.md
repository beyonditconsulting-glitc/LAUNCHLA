# Workroom

A personal project and resource dashboard for ELOP, LAUNCH LA, Pico Warehouse, ClassVR, and related work. For the simplest setup, download `Workroom.html` from GitHub using **Download raw file**, then double-click the downloaded file to open it in a modern browser. This self-contained version needs no server or installation. Keep it in the same location to retain browser-local settings; use Export backup before moving it.

The editable source files are `index.html`, `style.css`, `data.js`, and `app.js`. Open `index.html` in a modern browser, or serve the folder:

```sh
cd /workspace/LAUNCHLA
python -m http.server 3000 --bind 0.0.0.0
```

No install or build is needed. The optional Google Fonts stylesheet has system font fallbacks. Use the existing checkout; no additional Git worktree is needed.

## Features

- Ten project spaces, searchable resources, category filters, alphabetical sorting.
- Shared resources belong to multiple projects without duplicating the destination.
- Favorites, personal notes, and new resources saved in browser local storage.
- Export/import backups of personal changes. Import merges favorites and resources; incoming notes replace notes with the same ID. Built-in resources are always loaded from `data.js`.
- Link review identifies two pairs of supplied labels with the same spreadsheet tab.
- Mobile layout and keyboard-accessible controls; `/` focuses search.

Resource titles, URLs, and initial project memberships come from the supplied list. Additional cross-project tags connect clearly named ELOP warehouse resources, bulk transfers, the ELOP scanner, the warehouse lookup app, and EdTech inventory analysis to their related projects; these are navigation groupings, not verified data integrations. Exact repeated destinations were consolidated; distinct spreadsheet tabs remain separate. Expiring session parameters were removed from SharePoint links while preserving document IDs and selected cells. Project names were shortened for navigation. No document contents have been read, no access has been verified, and no live inventory, deadlines, or progress is inferred. Google and Microsoft permissions still apply when opening links. Some source URLs open form editors, as supplied.

Personal changes stay in this browser and origin. Export a backup before changing computers, browsers, or server ports. This is a personal dashboard, not a synchronized multi-user service. Treat backups as internal work information. To update built-in links or memberships, edit `data.js`; a shared deployment should use your organization's approved internal hosting.

## Validation

Run `node --check app.js` and `node --check data.js`. Browser smoke tests cover project filtering, search, favorites and persistence, notes, resource creation, review, and export/import. No external document authentication is required to use the dashboard itself.
