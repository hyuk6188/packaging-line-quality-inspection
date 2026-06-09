const SPREADSHEET_ID = '1L2njUjenWShSnQPGfqAIlBKA1A_yhwg-mTvRlQSXAw4';
const SHEET_NAME = '공유데이터';

function doGet(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const stateText = sheet.getRange('B2').getValue();
    const payload = {
      ok: true,
      state: stateText ? JSON.parse(stateText) : null,
      updatedAt: sheet.getRange('B3').getValue() || '',
      updatedBy: sheet.getRange('B4').getValue() || ''
    };
    const callback = e && e.parameter && e.parameter.callback;
    const body = callback ? callback + '(' + JSON.stringify(payload) + ');' : JSON.stringify(payload);
    return ContentService.createTextOutput(body).setMimeType(callback ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const raw = e && e.parameter && e.parameter.payload;
    if (!raw) throw new Error('Missing payload');
    const payload = JSON.parse(raw);
    const sheet = getSheet_();
    sheet.getRange('A1:B5').setValues([
      ['key', 'value'],
      ['state', JSON.stringify(payload.state || {})],
      ['updatedAt', new Date().toISOString()],
      ['updatedBy', payload.updatedBy || 'anonymous'],
      ['note', '포장라인 품질점검 현황 공유 상태 저장소']
    ]);
    SpreadsheetApp.flush();
    return json_({ok: true});
  } catch (error) {
    return json_({ok: false, error: String(error)});
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
