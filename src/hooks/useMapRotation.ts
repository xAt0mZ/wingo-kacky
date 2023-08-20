import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { TMMap } from '@/api/types';

type Server = {
  [key: string]: {
    server: string;
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

async function get(id: TMMap['number']) {
  const { data } = await axios.get<RotationResponse>(`/rotations/${id}`);
  return data;
}

export function useMapRotation(id?: TMMap['number']) {
  return useQuery(
    id ? ['rotations', id] : [],
    () => (id ? get(id) : undefined),
    {
      ...withError('Impossible de charger la prochaine rotation de la carte'),
      enabled: !!id,
    },
  );
}
