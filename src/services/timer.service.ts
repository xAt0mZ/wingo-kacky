import axios from 'axios';

export type ServerInfo = {
  at: Date,
  current: number,
  elapsed: number,
  maps: number[],
  timePerMap: number;
};

const baseUrl = process.env.REACT_APP_API_URL || '';

export async function getTimer(id: number) {
  const url = `${baseUrl}?id=${id}`;
  const res = (await axios.get(url));
  const data = res.data as ServerInfo;
  data.at = new Date(data.at);
  return data;
}