import {
  addMinutes,
  addSeconds,
  differenceInMilliseconds,
  isBefore,
} from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { TMMap } from '@/api/types';

import { useCurrentSeason } from './useCurrentSeason';

type Server = {
  [key: string]: {
    server: number;
    upcomingIn: number;
  };
};

type InProgress = Server & {
  currentlyRunning: false;
};

type Upcoming = Server & {
  currentlyRunning: number;
  timeLeft: number;
  timeLimit: number;
};

type RotationResponse = InProgress | Upcoming;

export type Rotation = {
  server: number;
  live: boolean;
  dateLimit: Date;
  stale: boolean;
};

async function get(id: TMMap['number']): Promise<Rotation> {
  const { data, headers } = await axios.get<RotationResponse>(
    `/rotations/${id}`,
  );
  const s = data[id];
  const dateLimit =
    data.currentlyRunning === false
      ? addMinutes(new Date(headers['x-cache-date']), s.upcomingIn)
      : addSeconds(new Date(headers['x-cache-date']), data.timeLeft);
  const stale = isBefore(dateLimit, new Date());
  return {
    server: s.server,
    live: !!data.currentlyRunning && !stale,
    dateLimit,
    stale,
  };
}

export function useMapRotation(id?: TMMap['number']) {
  const { data: s, isLoading } = useCurrentSeason();

  return useQuery(
    id ? ['rotations', id] : [],
    () => (id ? get(id) : undefined),
    {
      ...withError('Impossible de charger la prochaine rotation de la carte'),
      enabled: !!id && !s?.ended && !isLoading,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: 'always',
      refetchInterval: (data) => {
        if (!data) {
          return false;
        }
        const res = differenceInMilliseconds(data.dateLimit, new Date());
        return res < 0 ? 0 : res;
      },
    },
  );
}
