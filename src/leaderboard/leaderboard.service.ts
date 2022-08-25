import axios from 'axios';

type LeaderboardEntryMaps = { [k: number]: boolean };

export type LeaderboardEntry = {
  name: string;
  tag?: string;
  id: string;
  count: number;
  time: number;
  rank: number;
  maps: LeaderboardEntryMaps;
};

export type ServerData = LeaderboardEntry[];

const baseUrl = process.env.REACT_APP_PROXIES_URL || '';

export async function getLeaderboard() {
  const url = `${baseUrl}/leaderboard`;
  return (await axios.get<ServerData>(url)).data;
}
