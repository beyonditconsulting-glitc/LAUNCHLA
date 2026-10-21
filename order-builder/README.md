# Launch LA Order Builder

Read-only draft orders and warehouse picking lists using the Launch LA Inventory tab (`gid=0`). The code contains no inventory snapshot, credentials, or uploaded records.

## Fastest start: a standalone file

1. Download `OrderBuilder.html` using GitHub's **Download raw file**. Open it on a computer in a modern browser, or upload it alongside `index.html` in your `mag8389/LAUNCHLA` repository. If uploaded to the root, its expected Pages address is `https://mag8389.github.io/LAUNCHLA/OrderBuilder.html` after successful deployment.
2. Open the inventory tab in Google Sheets. Use **File → Download → Comma-separated values (.csv)**, which exports the current tab. Alternatively, copy the complete table including headers.
3. In Order Builder, choose **Import CSV / TSV**, or expand **Paste inventory from the sheet**.
4. Enter a school/department title, school count, and delivery notes. Search inventory and add quantities **per school**. The builder multiplies them by the recipient count.
5. Export the draft CSV or print the picking list. Drafts are in memory only; reloading or closing clears them. Export before closing.

Imports stay in the browser tab. Inventory records are not uploaded, stored in local storage, or bundled into the public website. A publicly hosted copy exposes the application code, not your imported inventory. The linked source spreadsheet retains its existing permissions.

## Live Google Sheet connection

This optional deployment needs a Google account with access to the source spreadsheet and permission to use Apps Script. These steps have not been deployed or authorized from the cloud workspace.

1. Open the source spreadsheet and choose **Extensions → Apps Script** (or create a new project at script.google.com).
2. Replace the new project's starter `Code.gs` with the contents of this folder's `Code.gs`. Do not remove code from an existing automation project; use a new project if one already exists.
3. Add an **HTML** file named **OrderBuilder** and paste the complete `OrderBuilder.html` contents into it. In Project Settings, enable **Show appsscript.json manifest file**. For a new project, use this folder’s `appsscript.json`, which requests only the read-only Google Sheets scope. If preserving an existing manifest, keep its other settings and add the listed read-only scope. Save.
4. Choose **Deploy → New deployment → Web app**. For **Execute as**, choose **User accessing the web app** so each user's own spreadsheet permissions apply. Set **Who has access** to yourself for initial testing, or the LAUSD organization option for approved internal use. Do not choose anonymous/public access. Deployment options depend on your organization's Google settings.
5. Deploy, review Google's requested permissions, and authorize with the appropriate work account. The code only calls read operations on the source sheet; it never writes inventory or creates orders in the source workbook.
6. Open the deployment URL. Confirm **121 items** only if the sheet still has the supplied snapshot's rows; a live sheet can change. Verify a known item against the inventory tab, refresh it, add a draft, and export/print. Add the verified deployment URL as a resource in INNOVA-DASH, tagged LAUNCH LA and Apps & Tools.

If a Google administrator blocks deployment or authorization, that policy must be resolved before live reading works. The standalone import mode remains usable. A GitHub Pages-hosted HTML file alone cannot access private Google Sheets through `google.script.run`; the live mode requires the Apps Script web-app URL.

## Column mapping and order rules

| Source header | Display / use |
| --- | --- |
| Item / Part # | Item identity; exact part + item name retains draft lines across refreshes |
| Combined Stock (WH & Returns) | Combined Stock, directly from the sheet |
| Approved Total | Launch LA Orders, directly from the sheet |
| Available Stock (Post Bundling) | Available Total (post bundling), directly from the sheet |
| Location/s | Deduplicated candidate locations; no quantities per location are inferred |
| Active / Launch LA | Inactive entries cannot be added; missing flags and non-Launch listings require review |
| Max Qty | Warning if quantity per school exceeds this value; confirm the sheet's intended policy |
| # Per CTN | Carton information only; no automatic pack conversion |
| Warehouse To-Do's / Notes | Fulfillment review notes |

Post-bundling stock is not reduced by Approved Total again. Requested total = quantity per school × recipient count. Remaining = max(available − requested total, 0); shortage = max(requested total − available, 0). Blank or invalid stock is **Unknown**, never zero. Missing refreshed items remain in the draft with a warning instead of silently changing identity. Source duplicate item identities prevent loading so stock cannot be conflated.

ClassVR quantities are inventory sets. The helper converts headsets per school into whole sets of four or eight. For example, 32 headsets per school = four sets of eight, or eight sets of four. It refuses partial sets. General bundles/packs retain the sheet's unit; contents must be checked manually. It does not automatically substitute similarly named items or equate the request's “Craft-E-Corner Cricut Explore with iron” with the source's “Cricut Explore 3 BUNDLE.”

The draft is not an approval, reservation, stock deduction, availability guarantee, or saved order. School count applies the same requested quantities to all recipients. Use separate drafts for different school allocations. No school list, serial tracking, multi-location count allocation, order submission, or live reservation system is implemented.

## Validation completed

- Actual supplied CSV/TSV structure: 23 columns and 121 item rows, including quoted multiline headers and descriptions.
- Stock mapping, blank versus zero, invalid values, duplicate/header safeguards, and formula-safe CSV output.
- Browser flow using the supplied inventory: search, order quantities, two-recipient multiplication, correct post-bundling arithmetic, VR set conversion, shortages, location export, missing/unknown inventory after refresh, invalid recipients, mobile overflow, and print layout; no browser errors.
- Apps Script read adapter checked with a mocked Sheets service. Live Google account authorization and deployment remain unverified until performed by the owner.
