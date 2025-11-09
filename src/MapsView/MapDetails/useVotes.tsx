import { useQuery, skipToken } from '@tanstack/react-query';

import { TMMap } from '@/api/types';
import { axios } from '@/axios';

type Votes = {
  count: number;
  average: number;
};

async function getVotes({ mapId }: { mapId: TMMap['number'] }) {
  const { data } = await axios.get<Votes>('/votes', {
    params: { id: mapId },
  });
  return data;
}

export function useVotes(mapId?: TMMap['number']) {
  return useQuery({
    queryKey: mapId ? ['votes', mapId] : [],
    queryFn: !!mapId ? () => getVotes({ mapId }) : skipToken,
  });
}
