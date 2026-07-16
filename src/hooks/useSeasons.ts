import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { SeasonSummary } from '@/api/types';

async function get() {
  const { data } = await axios.get<SeasonSummary[]>('/seasons');
  return data;
}

export function useSeasons() {
  return useQuery({
    queryKey: ['seasons'],
    queryFn: get,
    ...withError('Impossible de charger la liste des saisons'),
  });
}
