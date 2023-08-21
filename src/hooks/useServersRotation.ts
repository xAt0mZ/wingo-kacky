import { useQuery } from '@tanstack/react-query';
import {
  addMinutes,
  addSeconds,
  differenceInMilliseconds,
  isBefore,
} from 'date-fns';
import { orderBy } from 'lodash';

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
  currentMap: Map;
  nextMap: Map;
  dateLimit: Date;
};
async function get(): Promise<Server[]> {
  const { data, headers } = await axios.get<Response>(`/rotations`);
  return data.servers.map((s) => {
    let dateLimit = addSeconds(new Date(headers['x-cache-date']), s.timeLeft);
    let i = 1;
    let nextMap = s.maps[i];
    let currentMap = s.maps[i - 1];
    while (isBefore(dateLimit, new Date())) {
      dateLimit = addMinutes(dateLimit, s.timeLimit);
      i++;
      nextMap = s.maps[i];
      currentMap = s.maps[i - 1];
    }

    return {
      number: s.serverNumber,
      currentMap,
      nextMap,
      dateLimit,
    };
  });
}

const queryKeys = ['rotations', 'all'];

export function useServersRotation() {
  return useQuery(queryKeys, () => get(), {
    ...withError('Impossible de charger les rotations'),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: 'always',
    refetchInterval: (data) => {
      if (!data) {
        return false;
      }

      const nextServer = orderBy(data, 'dateLimit', 'asc')[0];
      const res = differenceInMilliseconds(nextServer.dateLimit, new Date());
      return res < 0 ? 0 : res;
    },
  });
}
