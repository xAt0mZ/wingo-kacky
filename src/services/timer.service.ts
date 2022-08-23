import axios from 'axios';

export type ServerData = {
  at: Date,
  current: number,
  elapsed: number,
  maps: number[],
  timePerMap: number;
};

const baseUrl = process.env.REACT_APP_PROXIES_URL || '';

export async function getTimer(id: number) {
  const url = `${baseUrl}/timers?id=${id}`;
  const res = await axios.get(url);
  const data = res.data as ServerData;
  data.at = new Date(data.at);
  return data;
}