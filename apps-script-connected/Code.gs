const CONFIG = Object.freeze({
  SHEET_NAME: 'Inventory',
  SPREADSHEET_ID: '1jWrPNLyDg8dGBs95ru5GiwIWovEMeAME-10kKH09odg',
  SHEET_ID: 0,
  ALLOWED_DOMAIN: 'lausd.net',
  CACHE_SECONDS: 60,
  MAX_RESULTS: 100,
  MAX_QUERY_LENGTH: 120,
  COL: Object.freeze({
    part: 1,
    item: 2,
    warehouse: 3,
    returns: 10,
    combined: 15,
    locations: 16,
    available: 17,
    grade: 19
  })
});

function doGet(e) {
  try {
    requireDistrictUser_();

    const planner = !!(e && e.parameter && e.parameter.app === 'schools');
    return HtmlService.createHtmlOutputFromFile(planner ? 'SchoolPlanner' : 'index')
      .setTitle(planner ? 'Launch LA School Bundle Planner' : 'LAUSD Warehouse | Inventory Lookup')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<!doctype html><html><head>' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '</head><body style="font:16px Arial;padding:36px;max-width:600px;margin:auto">' +
      '<h2>Access unavailable</h2><p>' +
      escapeHtml_(err.message) +
      '</p></body></html>'
    );
  }
}

function searchInventory(query, options) {
  requireDistrictUser_();
  options = options || {};

  const q = String(query == null ? '' : query).trim();

  if (q.length > CONFIG.MAX_QUERY_LENGTH) {
    throw new Error(
      'Search must be ' + CONFIG.MAX_QUERY_LENGTH + ' characters or fewer.'
    );
  }

  const data = loadInventory_();
  const needle = normalize_(q);
  const terms = needle.split(/\s+/).filter(Boolean);
  const stock = options.stock || 'all';

  const matches = data.filter(function(r) {
    const haystack = normalize_(
      [r.item, r.part, r.locations, r.grade].join(' ')
    );

    return terms.every(function(term) {
      return haystack.includes(term);
    }) &&
      (stock !== 'available' || r.available > 0) &&
      (stock !== 'out' || (r.available != null && r.available <= 0)) &&
      (stock !== 'unknown' || r.available == null);
  });

  matches.sort(function(a, b) {
    if (options.sort === 'name') {
      return a.item.localeCompare(b.item) || a.row - b.row;
    }

    if (options.sort === 'stock') {
      const av = a.available == null ? -Infinity : a.available;
      const bv = b.available == null ? -Infinity : b.available;
      return bv - av || a.row - b.row;
    }

    return (
      (needle ? rank_(a, needle) - rank_(b, needle) : 0) ||
      a.row - b.row
    );
  });

  const pages = Math.max(
    1,
    Math.ceil(matches.length / CONFIG.MAX_RESULTS)
  );

  const page = Math.min(
    pages,
    Math.max(1, Math.floor(Number(options.page) || 1))
  );

  const offset = (page - 1) * CONFIG.MAX_RESULTS;

  return {
    items: matches.slice(offset, offset + CONFIG.MAX_RESULTS),
    total: matches.length,
    inventoryTotal: data.length,
    inStock: data.filter(function(r) {
      return r.available > 0;
    }).length,
    page: page,
    pages: pages,
    pageSize: CONFIG.MAX_RESULTS,
    limited: matches.length > CONFIG.MAX_RESULTS,
    checkedAt: new Date().toISOString(),
    sheetName: CONFIG.SHEET_NAME
  };
}

function refreshInventory(query, options) {
  requireDistrictUser_();
  CacheService.getScriptCache().remove(cacheKey_());
  return searchInventory(query, options);
}

function loadInventory_() {
  const cache = CacheService.getScriptCache();
  const key = cacheKey_();
  const cached = cache.get(key);

  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      // Fall back to the spreadsheet.
    }
  }

  const ss = CONFIG.SPREADSHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    throw new Error(
      'Spreadsheet not found. Bind this script to the warehouse ' +
      'spreadsheet or enter its ID in CONFIG.SPREADSHEET_ID.'
    );
  }

  const sheet = ss.getSheets().find(function(candidate) {
    return candidate.getSheetId() === CONFIG.SHEET_ID;
  });

  if (!sheet) {
    throw new Error('Inventory worksheet gid=' + CONFIG.SHEET_ID + ' was not found.');
  }

  const lastRow = sheet.getLastRow();
  const lastCol = Math.max(
    sheet.getLastColumn(),
    CONFIG.COL.grade
  );

  if (lastRow < 2) return [];

  const values = sheet
    .getRange(1, 1, lastRow, lastCol)
    .getDisplayValues();

  const output = [];

  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    const item = cell_(r, CONFIG.COL.item);

    if (!item || /^item$/i.test(item)) continue;

    output.push({
      row: i + 1,
      part: cell_(r, CONFIG.COL.part),
      item: item,
      warehouse: numberOrNull_(cell_(r, CONFIG.COL.warehouse)),
      returns: numberOrNull_(cell_(r, CONFIG.COL.returns)),
      combined: numberOrNull_(cell_(r, CONFIG.COL.combined)),
      available: numberOrNull_(cell_(r, CONFIG.COL.available)),
      locations: cell_(r, CONFIG.COL.locations),
      grade: cell_(r, CONFIG.COL.grade)
    });
  }

  const serialized = JSON.stringify(output);

  if (serialized.length < 90000) {
    cache.put(key, serialized, CONFIG.CACHE_SECONDS);
  }

  return output;
}

function requireDistrictUser_() {
  const email = String(Session.getActiveUser().getEmail() || '')
    .trim()
    .toLowerCase();

  if (!email) {
    throw new Error(
      'Your Google account could not be verified. Sign in with your ' +
      'LAUSD account and verify the web app deployment settings.'
    );
  }

  if (!email.endsWith('@' + CONFIG.ALLOWED_DOMAIN)) {
    throw new Error(
      'Sign in with your LAUSD Google account to access this inventory.'
    );
  }

  return email;
}

function cell_(row, col) {
  return String(
    row[col - 1] == null ? '' : row[col - 1]
  ).trim();
}

function numberOrNull_(value) {
  if (!value) return null;

  const n = Number(
    String(value).replace(/[$,\s]/g, '')
  );

  return Number.isFinite(n) ? n : null;
}

function normalize_(value) {
  return String(value || '').trim().toLocaleLowerCase();
}

function rank_(record, query) {
  const part = normalize_(record.part);
  const item = normalize_(record.item);

  if (part === query || item === query) return 0;

  if (part.startsWith(query) || item.startsWith(query)) {
    return 1;
  }

  return 2;
}

function cacheKey_() {
  return 'lausd_inventory_connected_v3_' +
    CONFIG.SPREADSHEET_ID + '_' + CONFIG.SHEET_NAME;
}

function escapeHtml_(value) {
  const replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return String(value).replace(/[&<>"']/g, function(character) {
    return replacements[character];
  });
}

/** Full inventory table for the School Bundle Planner; read-only and uncached. */
function getInventory() {
  requireDistrictUser_();
  const book = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = book.getSheets().find(function(candidate) {
    return candidate.getSheetId() === CONFIG.SHEET_ID;
  });
  if (!sheet) {
    throw new Error('Inventory worksheet gid=' + CONFIG.SHEET_ID + ' was not found.');
  }
  return {
    rows: sheet.getDataRange().getDisplayValues(),
    loadedAt: new Date().toISOString(),
    source: 'Google Sheet · ' + sheet.getName()
  };
}
