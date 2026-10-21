# School Bundle Planner

This extends the order workflow to schools receiving different bundles. It is a separate application; the original uniform-recipient Order Builder remains available.

## Open the standalone planner

1. Download **SchoolPlanner.html** with **Download raw file** and open it in a modern browser. Alternatively, upload it alongside `index.html` in the `mag8389/LAUNCHLA` repository; after deployment its expected address is `https://mag8389.github.io/LAUNCHLA/SchoolPlanner.html`.
2. Load the inventory CSV/TSV or paste the complete inventory table, including headers.
3. Load a school CSV/TSV, or paste the supplied school table (Markdown tables are supported). The headers must be `School Name`, `School Location Code`, and `Please select your first choice bundle.`. Export from Google Sheets as CSV when possible to preserve quoted commas. Location codes are retained as strings.
4. Confirm the three bundle templates and exact inventory matches in **Review / edit bundle templates and inventory matches**.
5. The school list shows original requests separately from editable **draft** assignments. Comma-separated choices select both bundles. Check/uncheck bundle assignments, exclude schools, or use **Edit quantities** for school-specific exceptions. A quantity of zero omits that item for the school. Changes to the general bundle template do not overwrite explicit school exceptions.
6. Review combined warehouse demand. Export **Warehouse CSV** and **School allocation CSV**. Print a one-page warehouse report or use **Print one page** beside a school for its packing sheet.
7. Choose **Save plan backup** before closing. Reloading clears school and inventory data. A backup contains school assignments, exceptions, bundle settings, and inventory-match identifiers, but not the full inventory snapshot. Reload the latest inventory after restoring a plan.

Filtering the school list does not change warehouse totals. Totals use all **included** schools. Schools with no assigned bundles are flagged and contribute no demand. Duplicate location codes and unrecognized bundle labels prevent roster loading, so schools are not silently omitted.

## Confirmed bundle definitions

### ClassVR

- 1 ClassVR 8-pack, matched to inventory **Class VR (Set of 8)** (`PRN005`). This is eight headsets per school, replacing the earlier 32-headset example.

### Cricut Bundle

- 4 DTC CRICUT ESSENTIAL BUNDLE (`PRN056`)
- 3 Cricut Explore 3 BUNDLE (`PRN009`)
- 2 CRICUT HEAT TRANSFER VINYL & EASY PRESS KIT (`PRN034`)
- 2 Cricut Joy Label Maker Bundle (`PRN090`)
- 1 CRICUT JOY TIP (`PRN078`)
- 10 Cricut Maker Transfer Tape Sheets (`PRN095`)
- 2 Cricut Maker 3 (`PRN003`)

### 3D Printer Bundle

- 2 Ultimaker S7 (`PRN002`)
- 2 TPU Filament (2.85mm) - BLUE (`PRN083`)
- 2 TPU Filament (2.85mm) - WHITE (`PRN097`)
- 2 TPU Filament (2.85mm) - BLACK (`PRN096`)

The trailing incomplete `2` in the request is ignored, as confirmed by the user. No unspecified item is added.

## Live Google Sheet mode

For an existing Apps Script deployment using this folder's code:

1. Add a new HTML file named **SchoolPlanner** and paste `SchoolPlanner.html` into it.
2. Update `Code.gs` to the version in this folder. It continues to serve the original `OrderBuilder` by default and serves the school planner when the query parameter is `app=schools`.
3. Retain the read-only Google Sheets scope in `appsscript.json`.
4. Update the deployment to a new version, execute as the user accessing the app, and keep access restricted to approved users/your organization.
5. Open the deployed `/exec` URL with `?app=schools`. It reads the inventory using the user's Google permissions. School assignments are imported in the browser; it does not read or change a school-response sheet.

See `README.md` for initial Apps Script deployment steps. No live Google account authorization or deployment was performed in the cloud workspace.

## Stock and report rules

- Combined Stock, Launch LA Orders (source Approved Total), and Available Total (source Available Stock Post Bundling) come directly from inventory. Existing orders are not deducted a second time.
- Demand sums each included school's assigned bundles and explicit quantity exceptions. When two template lines map to the same stock item, quantities aggregate before checking availability; a school is counted once per item.
- Remaining = max(available − demand, 0); shortage = max(demand − available, 0). Blank/invalid stock stays Unknown. Missing inventory matches remain visible with review notes.
- These are **additional-demand comparisons**, not a reservation system. Reconcile whether these school requests are already included in Approved Total before treating the result as new demand.
- Inactive/unknown item flags, unconfirmed Launch LA listing, missing locations, salvage locations, and source review notes are shown. They require fulfillment review.
- Locations have no per-bin quantities. Reports show the first three candidate locations; CSV includes the full list. Inventory is not automatically distributed among schools when there is a shortage.
- School packing sheets indicate a **batch shortage**, not an allocation or guarantee that the school will receive stock. Final allocation requires a separate decision.
- One-page landscape reports scale to fit. Full school and warehouse details remain available in CSV exports.

## Privacy and validation

Public code contains bundle recipes and the source spreadsheet ID, but no imported inventory values or school roster. Imports and assignments stay in the browser tab; backups and CSVs contain work data and should be kept in approved storage. No automatic browser storage or server upload is used in standalone mode.

Browser tests used the supplied 64-school roster and 121-item inventory locally. They covered exact bundle counts and 12-line demand, a school assigned both bundles, one VR 8-pack per selected school, shortages, school exceptions, exclusion, template edits, search filters, plan backup/restore, CSV allocations, and mobile layout. Actual school and warehouse PDFs were verified as one page. Live Google authorization/deployment remains unverified.
