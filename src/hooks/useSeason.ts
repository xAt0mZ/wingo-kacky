import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { Season } from '@/api/types';

type SeasonResponse = {
  season: Season;
};

async function get(id: Season['_id']) {
  const {
    data: { season },
  } = await axios.get<SeasonResponse>(`/seasons/${id}`);
  return season;
}

export function useSeason(id?: Season['_id']) {
  return useQuery(id ? ['seasons', id] : [], () => (id ? get(id) : undefined), {
    ...withError('Impossible de charger la saison'),
    enabled: !!id,
  });
}
