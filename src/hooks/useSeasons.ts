import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { SeasonSummary } from '@/api/types';

async function get() {
  const { data } = await axios.get<SeasonSummary[]>('/seasons/current');
  return data;
}

export function useSeasons() {
  return useQuery(
    ['seasons', 'current'],
    async () => {
      const seasons = await get();
      return seasons;
    },
    {
      ...withError('Impossible de charger la liste des saisons'),
    },
  );
}