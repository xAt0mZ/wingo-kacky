import { TMMap } from '@/api/types';
import { axios } from '@/axios';
import { useOAuthContext } from '@/providers/useOAuthContext';
import { useQuery, skipToken } from '@tanstack/react-query';

export type Vote = {
  mapId: number;
  note: number;
};

async function getVote({
  mapId,
  token,
}: {
  mapId: TMMap['number'];
  token: string;
}) {
  try {
    const { data } = await axios.get<Vote>('/vote', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id: mapId },
    });
    return data.note;
  } catch (error) {
    return 0;
  }
}

export function useVote(mapId?: TMMap['number']) {
  const { token } = useOAuthContext();

  return useQuery({
    queryKey: mapId ? ['votes', mapId, 'self'] : [],
    queryFn: token && !!mapId ? () => getVote({ mapId, token }) : skipToken,
  });
}
