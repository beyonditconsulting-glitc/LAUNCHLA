# Connected lookup and school planner — complete files

This package retains the supplied Warehouse Inventory Lookup and adds the school bundle planner beside it. It contains complete files, not patches. Both tools read the requested Launch LA spreadsheet, with inventory selected by its fixed tab ID `gid=0` rather than assuming a tab name. No inventory writes are performed. Both server data routes retain the supplied `lausd.net` user check.

## Files in Apps Script

1. **Code.gs**: open the existing Code.gs, select all text in its editor, and paste this package's complete Code.gs. Do not create a second copy of the server code in another .gs file; Apps Script combines all .gs files in a project.
2. **index.html**: keep the existing supplied lookup HTML unchanged. A complete identical copy is included for recovery or a new project.
3. **SchoolPlanner.html**: open that HTML file if it exists, or choose + beside Files → HTML and name it **SchoolPlanner**. Paste the complete SchoolPlanner.html file into the editor, replacing its starter content.
4. **appsscript.json**: in Project Settings enable Show appsscript.json manifest file in editor. The provided complete manifest requests read-only Sheets access and the email scope used by the existing district-account check. In a new project this is the full manifest. If the current project has other custom manifest settings or other integrations, provide its full manifest for a compatible full-file replacement rather than deleting those settings.

Save the files. Do not use Run on `doGet` to launch the website.

## Deploy

Choose Deploy → New deployment → Web app. Execute as **User accessing the web app**. Restrict access to the approved LAUSD organization/users; do not enable anonymous access. Each user needs access to the source spreadsheet and authorization to use the app. Organization settings determine which deployment options are available. The existing email guard rejects non-lausd.net and unverified users. Do not bypass it if authentication is blocked; diagnose account and deployment settings.

Copy the web app URL ending in `/exec`:

- That URL by itself opens the existing Warehouse Inventory Lookup.
- Add **?app=schools** to open the School Bundle Planner.

Example structure only: `YOUR_DEPLOYMENT_URL/exec?app=schools`.

The planner automatically reads inventory on opening and exposes Refresh from Google Sheet. It still imports school selections or restores them from a saved plan backup. It does not automatically load a school-response spreadsheet. Uploading this HTML to GitHub Pages alone does not connect private Sheets; use the Apps Script deployment URL for the live connection.

To update an existing deployment, use Deploy → Manage deployments → Edit → New version → Deploy. Saving source files alone does not update a published deployment.

## Validation

The server was tested with mocked Google services against the supplied table structure: lookup rendering, planner rendering, the configured spreadsheet and gid=0 selection, 121-item inventory responses, search, pagination, refresh, and denial of non-district/unverified email identities for both data routes. The planner's import, assignments, calculations, backups, and one-page reports were tested separately. Live Google authorization, domain access, and deployment have not been executed from this environment.

## Updated printing

The complete SchoolPlanner.html includes **Print one-page report** for the compact summary and **Print warehouse report** for item-by-item school picking lists. Replace the entire contents of the existing SchoolPlanner.html with the supplied file, save, then update the planner deployment to **New version**. No Code.gs or index.html changes are needed for this printing update.
