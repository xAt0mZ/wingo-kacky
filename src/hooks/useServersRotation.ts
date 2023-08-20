import { useQuery } from '@tanstack/react-query';
import { addMinutes, addSeconds, isBefore } from 'date-fns';

import { withError } from '@/react-query';
import { axios } from '@/axios';

type Map = {
  number: number;
  author: string;
  finished: boolean;
};

type APIServer = {
  serverNumber: number;
  serverDifficulty: string;
  maps: Map[];
  timeLimit: number;
  timeLeft: number;
};

type Response = {
  servers: APIServer[];
  comptimeLeft: number;
};

export type Server = {
  number: number;
  nextMap: Map;
  dateLimit: Date;
};
async function get(): Promise<Server[]> {
  const { data, headers } = await axios.get<Response>(`/rotations`);
  return data.servers.map((s) => {
    let dateLimit = addSeconds(new Date(headers['x-cache-date']), s.timeLeft);
    let i = 1;
    let nextMap = s.maps[i];
    while (isBefore(dateLimit, new Date())) {
      dateLimit = addMinutes(dateLimit, s.timeLimit);
      i++;
      nextMap = s.maps[i];
    }

    return {
      number: s.serverNumber,
      nextMap,
      dateLimit,
    };
  });
}

export const queryKeys = ['rotations', 'all'];

export function useServersRotation() {
  return useQuery(queryKeys, () => get(), {
    ...withError('Impossible de charger les rotations'),
  });
}
