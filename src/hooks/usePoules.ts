import { useQuery } from '@tanstack/react-query';

import { withError } from '@/react-query';
import { axios } from '@/axios';

export type Poule = {
  date: string;
  poule: number;
  shake: number;
  pet: number;
};

type Response = {
  spreadsheetId: string;
  valueRanges: {
    range: string;
    majorDimension: string;
    values: [string, number, number, number][];
  }[];
};

async function get(): Promise<Poule[]> {
  const { data } = await axios.get<Response>('/poules');
  return data.valueRanges[0].values.map(([date, poule, shake, pet]) => ({
    date,
    poule,
    shake,
    pet,
  }));
}

export function usePoules() {
  return useQuery(['poules'], get, {
    ...withError('Impossible de charger la liste des poules'),
  });
}
