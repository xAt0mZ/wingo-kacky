import axios from "axios";

const baseURL = 'https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet';
const key = `key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
const wingoRanges = 'ranges=WINGO!A2:F33&ranges=WINGO!G2:L33&ranges=WINGO!M2:R12';
const jrRanges = 'ranges=JR!A2:F33&ranges=JR!G2:L33&ranges=JR!M2:R12';
const ranges = `${wingoRanges}&${jrRanges}`;
const options = 'valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING'
const url = `${baseURL}?${key}&${ranges}&${options}`

const API = {
  get: () => axios.get(url)
}
export default API;
