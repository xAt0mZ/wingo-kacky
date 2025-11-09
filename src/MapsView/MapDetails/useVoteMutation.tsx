import { TMMap } from '@/api/types';
import { axios } from '@/axios';
import { useOAuthContext } from '@/providers/useOAuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function sendVote({
  id,
  token,
  note,
}: {
  id: TMMap['number'];
  token: string;
  note: number;
}) {
  const { data } = await axios.post(
    '/vote',
    { MapId: id, Note: note },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id },
    },
  );
  return data;
}

export function useVoteMutation(mapId?: TMMap['number']) {
  const { token } = useOAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note: number) => {
      if (!mapId || !token) {
        return;
      }

      await sendVote({ id: mapId, token, note });
      queryClient.invalidateQueries({ queryKey: ['votes', mapId] });
    },
  });
}
