import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { Season } from '@/api/types';

async function get(id: Season['_id']) {
  const { data } = await axios.get<Season>(`/seasons/${id}`);
  return data;
}

export function useSeason({ id }: { id: Season['_id'] }) {
  return useQuery(
    ['seasons', id],
    async () => {
      const season = await get(id);
      return season;
    },
    {
      ...withError('Impossible de charger la saison'),
    },
  );
}
