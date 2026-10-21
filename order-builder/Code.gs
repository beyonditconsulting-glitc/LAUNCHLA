/** Read-only inventory connection. This script never changes the source spreadsheet. */
const INVENTORY_SPREADSHEET_ID = '1jWrPNLyDg8dGBs95ru5GiwIWovEMeAME-10kKH09odg';
const INVENTORY_SHEET_ID = 0;
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile(e && e.parameter && e.parameter.app === 'schools' ? 'SchoolPlanner' : 'OrderBuilder')
    .setTitle(e && e.parameter && e.parameter.app === 'schools' ? 'Launch LA School Bundle Planner' : 'Launch LA Order Builder');
}
function getInventory() {
  const book = SpreadsheetApp.openById(INVENTORY_SPREADSHEET_ID);
  const sheet = book.getSheets().find(s => s.getSheetId() === INVENTORY_SHEET_ID);
  if (!sheet) throw new Error('Inventory tab gid=0 was not found.');
  const rows = sheet.getDataRange().getDisplayValues();
  return {rows, loadedAt: new Date().toISOString(), source: 'Google Sheet · ' + sheet.getName()};
}
