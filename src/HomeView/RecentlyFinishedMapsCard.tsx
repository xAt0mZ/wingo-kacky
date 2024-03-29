import { intlFormatDistance } from 'date-fns';
import {
  ChevronRightIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { Paths } from '@/router';
import { useCurrentSeason } from '@/hooks/useCurrentSeason';
import { TMMap } from '@/api/types';

const fakeMap: TMMap = {
  _id: '0',
  number: 0,
  seasonId: '0',
};

export function RecentlyFinishedMapsCard() {
  const { data, isLoading } = useCurrentSeason();
  if (!data || isLoading) {
    return null;
  }

  const {
    season: { maps },
  } = data;

  const finishedMaps =
    maps
      ?.filter((m) => m.validated && !!m.finishedAt)
      .sort((a, b) => {
        if (!a.finishedAt || !b.finishedAt) {
          return 0;
        }
        return (
          new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
        );
      }) || [];

  finishedMaps.push(fakeMap, fakeMap, fakeMap);
  const recentlyFinishedMaps = finishedMaps.slice(0, 3);

  return (
    <div
      className={clsx(
        'relative z-0',
        'flex h-full flex-col items-stretch gap-4 p-4',
        'before:absolute before:inset-0 before:z-[-1] before:rounded-2xl before:bg-theme-5',
        '2xl:before:right-[10%]',
      )}
    >
      <div className="text-lg font-bold text-theme-2">
        Dernières cartes terminées
      </div>
      <div className="grid h-full grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4">
        {recentlyFinishedMaps.map(({ number, finishedAt }, idx) => (
          <FinishedMapItem
            key={idx}
            mapNumber={number}
            time={finishedAt ? new Date(finishedAt) : undefined}
          />
        ))}
        <SeeMoreButton />
      </div>
    </div>
  );
}

type FinishedMapItemProps = {
  mapNumber: number;
  rank?: string;
  time?: Date;
};
function FinishedMapItem({ mapNumber, rank, time }: FinishedMapItemProps) {
  const { data, isLoading } = useCurrentSeason();
  if (!data || isLoading) {
    return null;
  }
  const {
    rank: { image },
  } = data;
  const distance = intlFormatDistance(
    time ? new Date(time) : new Date(),
    new Date(),
    {
      locale: 'fr-FR',
    },
  );

  return (
    <Link
      className={clsx(
        'flex flex-col items-center justify-center gap-8',
        'rounded-2xl pb-6 pt-10',
        'border border-theme-8 bg-theme-7',
        'hover:border-theme-4',
      )}
      to={Paths.MAPS}
      state={{ mapId: mapNumber }}
    >
      {time && (
        <>
          <div className="flex flex-col items-center gap-2">
            <div className="text-center text-2xl font-bold text-theme-2">
              {mapNumber}
            </div>
            <div className="text-center text-sm font-semibold text-theme-2">
              {rank}
            </div>
          </div>
          <div className="inline-flex items-end gap-1 text-theme-3">
            <CalendarDaysIcon className="h-4 w-4" />
            <div className="text-xs font-medium ">{distance}</div>
          </div>
        </>
      )}
      {!time && (
        <div className="p-5">
          <img src={image} />
        </div>
      )}
    </Link>
  );
}

function SeeMoreButton() {
  return (
    <Link
      to={Paths.MAPS}
      className={clsx(
        'group flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5',
        'flex-col-reverse',
        'lg:col-span-3 lg:flex-row',
        '2xl:col-span-1 2xl:flex-col-reverse',

        'border bg-theme-4 text-white-neutral',
        'hover:bg-theme-2',
        'dark:border-theme-4 dark:bg-theme-5',
        'dark:hover:bg-theme-4 dark:hover:text-theme-5',
      )}
    >
      <ChevronRightIcon
        className={clsx(
          'h-10 w-10 rounded-full p-1.5',

          'bg-white-neutral text-theme-4',
          'group-hover:text-theme-2',
          'lg:bg-transparent lg:text-white-neutral',
          'lg:group-hover:text-white-neutral',
          '2xl:bg-white-neutral 2xl:text-theme-4',
          '2xl:group-hover:text-theme-2',

          'dark:bg-theme-4 dark:text-theme-5',
          'dark:group-hover:bg-theme-5 dark:group-hover:text-theme-4',
          'dark:lg:bg-transparent dark:lg:text-white-neutral',
          'dark:lg:group-hover:bg-transparent dark:lg:group-hover:text-theme-5',
          'dark:2xl:bg-theme-4 dark:2xl:text-theme-5',
          'dark:2xl:group-hover:bg-theme-5 dark:2xl:group-hover:text-theme-4',
        )}
      />
      <span className="text-xl font-semibold">Voir toutes</span>
    </Link>
  );
}
