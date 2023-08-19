import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { TMMap } from '@/api/types';

type Response = unknown;

async function get(id: TMMap['number']) {
  const { data } = await axios.get<Response>(`/leaderboard/${id}`);
  return data;
}

export function useLeaderboard(id: TMMap['number']) {
  return useQuery(['leaderboard', id], () => get(id), {
    ...withError('Impossible de charger le leaderboard'),
  });
}
