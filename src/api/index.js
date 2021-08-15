import axios from "axios";

const baseURL = 'https://sheets.googleapis.com/v4/spreadsheets/1Yqkhv4ayhwFkV39W0W7GLt1FnpHLUUXtpgGvRklnDnI/values:batchGet';
const key = `key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
const ranges = 'ranges=WINGO!A2:F33&ranges=WINGO!G2:L33&ranges=WINGO!M2:R12';
const options = 'valueRenderOption=FORMULA&dateTimeRenderOption=FORMATTED_STRING'
const url = `${baseURL}?${key}&${ranges}&${options}`

const API = {
  get: () => axios.get(url)
}
export default API;
