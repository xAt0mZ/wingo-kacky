import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { SeasonSummary } from '@/api/types';

type SeasonsResponse = {
  seasons: SeasonSummary[];
};

async function get() {
  const {
    data: { seasons },
  } = await axios.get<SeasonsResponse>('/seasons');
  return seasons;
}

export function useSeasons() {
  return useQuery(
    ['seasons'],
    async () => {
      const seasons = await get();
      return seasons;
    },
    {
      ...withError('Impossible de charger la liste des saisons'),
    },
  );
}
