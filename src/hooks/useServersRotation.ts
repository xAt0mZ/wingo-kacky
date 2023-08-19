import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';

type Map = {
  number: number;
  author: string;
  finished: boolean;
};

type Server = {
  serverNumber: number;
  serverDifficulty: string;
  maps: Map[];
  timeLimit: number;
  timeLeft: number;
};

type Response = {
  servers: Server[];
  comptimeLeft: number;
};
async function get() {
  const { data } = await axios.get<Response>(`/rotations`);
  return data;
}

export function useServersRotation() {
  return useQuery(['rotations'], () => get(), {
    ...withError('Impossible de charger les rotations'),
  });
}
