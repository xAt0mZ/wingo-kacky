import axios from 'axios';

export type Finish = {
  name: string;
  position: number;
  time: number;
  timestamp: string;
}

export type MapEntry = {
  id: number;
  finishes: Finish[];
}

export type ServerData = MapEntry[];

const baseUrl = process.env.REACT_APP_PROXIES_URL || '';

export async function getMaps() {
  const url = `${baseUrl}/maps`;
  return (await axios.get<ServerData>(url)).data;
}
