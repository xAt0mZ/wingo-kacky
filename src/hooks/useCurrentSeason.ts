import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { Rank, Season } from '@/api/types';

type CurrentSeason = {
  rank: Rank;
  season: Season;
};

async function get() {
  const { data } = await axios.get<CurrentSeason>('/seasons/current');
  return data;
}

export function useCurrentSeason() {
  return useQuery(
    ['seasons', 'current'],
    async () => {
      const currentSeason = await get();
      return currentSeason;
    },
    {
      ...withError('Impossible de charger la saison actuelle'),
    },
  );
}
