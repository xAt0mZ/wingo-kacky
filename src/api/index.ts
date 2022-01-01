import axios from 'axios';

import { Sheet } from '../models/consts';

const baseURL = 'https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet';
const key = `key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
const ranges = Object.values(Sheet).map((s) => `ranges=${s}!A2:F33&ranges=${s}!G2:L33&ranges=${s}!M2:R12`).join('&');
const options = 'valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING';
const url = `${baseURL}?${key}&${ranges}&${options}`;

export function get() {
  return axios.get(url)
};
