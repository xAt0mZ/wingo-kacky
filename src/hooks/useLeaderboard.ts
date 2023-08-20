import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { TMMap } from '@/api/types';

export type LeaderboardItem = {
  score: number;
  date: string;
  nickname: string;
  login: string;
  uplay: string;
  rank: number;
};

type Leaderboard = LeaderboardItem[];

async function get(id: TMMap['number']) {
  const { data } = await axios.get<Leaderboard>(`/leaderboard/${id}`);
  return data;
}

export function useLeaderboard(id?: TMMap['number']) {
  return useQuery(
    id ? ['leaderboard', id] : [],
    () => (id ? get(id) : undefined),
    {
      ...withError('Impossible de charger le leaderboard'),
      enabled: !!id,
    },
  );
}
