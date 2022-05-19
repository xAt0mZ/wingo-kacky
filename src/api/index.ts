import axios from 'axios';

import { FAV_SHEET, POULE_SHEET, Sheet, SheetRanges } from '../models/consts';

const baseURL = 'https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet';
const key = `key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
const ranges = Object.values(Sheet).map((sheet) => SheetRanges[sheet].map((range) => `ranges=${sheet}!${range}`).join('&')).join('&')
const pouleRange = `ranges=${POULE_SHEET}!A:D`;
const favRange = `ranges=${FAV_SHEET}!A2:B76`;
const options = 'valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING';
const url = `${baseURL}?${key}&${ranges}&${pouleRange}&${favRange}&${options}`;

export function get() {
  return axios.get(url)
};
