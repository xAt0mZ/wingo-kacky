import { useQuery } from '@tanstack/react-query';
import { differenceInCalendarDays } from 'date-fns';

import { withError } from '@/react-query';
import { axios } from '@/axios';
import { Rank, Season } from '@/api/types';

type CurrentSeason = {
  rank: Rank;
  season: Season;
  ended: boolean;
};

async function get() {
  const { data } = await axios.get<CurrentSeason>('/seasons/current');
  data.ended =
    differenceInCalendarDays(new Date(data.season.endAt), new Date()) < 0;
  return data;
}

export function useCurrentSeason() {
  return useQuery(
    ['seasons', 'current'],
    async () => {
      const currentSeason = await get();
      return currentSeason;
    },
    {
      ...withError('Impossible de charger la saison actuelle'),
    },
  );
}
