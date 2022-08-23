import axios from 'axios';

export type LeaderboardEntry = {
  name: string;
  tag?: string;
  id: string;
  count: number;
  time: number;
};

export type ServerData = LeaderboardEntry[];

const baseUrl = process.env.REACT_APP_PROXIES_URL || '';

export async function getLeaderboard() {
  const url = `${baseUrl}/leaderboard`;
  return (await axios.get<ServerData>(url)).data;
}