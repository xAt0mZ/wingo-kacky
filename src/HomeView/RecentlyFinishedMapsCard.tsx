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

  finishedMaps.push(fakeMap, fakeMap, fakeMap, fakeMap);
  const recentlyFinishedMaps = finishedMaps.slice(0, 4);

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
      <div className="flex grow flex-row flex-wrap gap-2">
        {recentlyFinishedMaps.map(({ number, finishedAt }, idx) => (
          <FinishedMapItem
            key={idx}
            mapNumber={number}
            time={finishedAt ? new Date(finishedAt) : undefined}
          />
        ))}
        <div className="hidden 2xl:flex 2xl:shrink-0 2xl:grow-0 2xl:basis-[calc(20%-(4*.50rem/5))]">
          <SeeMoreButton />
        </div>
      </div>
      <div className="2xl:hidden">
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
    <div
      className={clsx(
        'flex shrink-0 grow-0 basis-[calc(50%-(1*.5rem/2))] flex-col items-center justify-center gap-8 rounded-2xl border border-theme-8 bg-theme-7 pb-6 pt-10',
        'md:basis-[calc(25%-(3*.50rem/4))]',
        '2xl:basis-[calc(20%-(4*.50rem/5))]',
      )}
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
    </div>
  );
}

function SeeMoreButton() {
  return (
    <Link
      to={Paths.MAPS}
      className={clsx(
        'flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-theme-4 px-6 py-3.5',
        '2xl:flex-col-reverse',
        'dark:border dark:border-theme-4 dark:bg-theme-5',
      )}
    >
      <ChevronRightIcon
        className={clsx(
          'h-4 w-4 text-white-neutral',
          '2xl:h-10 2xl:w-10 2xl:rounded-full 2xl:bg-white-neutral 2xl:p-1.5 2xl:text-theme-4',
          '2xl:dark:text-theme-5',
        )}
      />
      <span className="text-base font-medium text-theme-7 dark:text-white-neutral 2xl:text-xl 2xl:font-semibold">
        Voir toutes
      </span>
    </Link>
  );
}
