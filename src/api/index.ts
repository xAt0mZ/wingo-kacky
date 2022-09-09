import axios from 'axios';

import { Edition, FAIL_SHEET, FAV_SHEET, PoulesSheets, Sheet, SheetRanges } from '../models/consts';

const baseURL = 'https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet';
const key = `key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
const ranges = Object.values(Sheet)
  .map((sheet) => SheetRanges[sheet].map((range) => `ranges=${sheet}!${range}`).join('&'))
  .join('&');
const pouleRanges = Object.values(Edition)
  .map((edition) => (PoulesSheets[edition] ? `ranges=${PoulesSheets[edition]}!A:D` : ''))
  .join('&');
const favRange = `ranges=${FAV_SHEET}!A2:B76`;
const failRange = `ranges=${FAIL_SHEET}!A:B`;
const options = 'valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING';
const url = `${baseURL}?${key}&${ranges}&${pouleRanges}&${favRange}&${failRange}&${options}`;

export function get() {
  return axios.get(url);
}
