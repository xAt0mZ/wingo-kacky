import clsx from 'clsx';
import { orderBy } from 'lodash';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { useServersRotation, Server } from '@/hooks/useServersRotation';
import { Paths } from '@/router';
import { Timer } from '@/components/Timer';

export function UpcomingMapsCard() {
  const { data, isLoading } = useServersRotation();

  const length = data?.length || 0;
  const mid = Math.floor(length / 2);
  const start = orderBy(data, 'dateLimit').slice(0, mid + (length % 2));
  const end = orderBy(data, 'dateLimit').slice(mid + (length % 2));

  return (
    <div className="flex h-full flex-col gap-2 rounded-2xl bg-theme-6 p-4">
      <span className="text-lg font-bold text-theme-2">À venir</span>
      {(isLoading || !data || data.length === 0) && (
        <span className="text-theme-2">Pas d&apos;événément en cours</span>
      )}
      {data && (
        <div className="grid grow grid-cols-1 sm:grid-cols-2">
          <Items
            items={start}
            className="sm:border-r-2 sm:pr-5 lg:pr-2 xl:pr-5"
          />
          <Items
            items={end}
            className="pt-2 sm:pl-5 sm:pt-0 lg:pl-2 xl:pl-5"
            hideLast
          />
        </div>
      )}
    </div>
  );
}

function Items({
  items,
  className,
  hideLast,
}: {
  items: Server[];
  className?: string;
  hideLast?: boolean;
}) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 items-center gap-y-2 border-theme-8 lg:gap-y-1 2xl:gap-0.5',
        className,
      )}
    >
      {items.map((s, key) => (
        <Fragment key={key}>
          <Item
            mapNumber={s.nextMap.number}
            server={s.number}
            time={s.dateLimit}
          />
          <div
            className={clsx(
              'col-span-3 h-0 border border-theme-8',
              'ml-20 lg:ml-14 2xl:ml-20',
              key === items.length - 1
                ? hideLast
                  ? 'hidden'
                  : 'sm:hidden'
                : '',
            )}
          />
        </Fragment>
      ))}
    </div>
  );
}

type ItemProps = {
  mapNumber: number;
  time: Date;
  server: number;
};

function Item({ mapNumber, time, server }: ItemProps) {
  return (
    <div className="flex flex-row">
      <Link
        className={clsx(
          'rounded-2xl border border-theme-8 bg-theme-7 text-center text-base font-medium text-theme-2',
          'hover:border-theme-4',
          'w-16 py-2',
          'lg:w-12 lg:py-1.5',
          '2xl:w-16 2xl:py-2',
        )}
        to={Paths.MAPS}
        state={{ mapId: mapNumber }}
      >
        {mapNumber}
      </Link>
      <div className="flex grow flex-row items-center justify-center gap-2">
        <div className="w-full text-right">
          <span className="text-right text-base font-medium text-theme-4">
            <Timer time={time} />
          </span>
        </div>
        <div className="h-4 w-0 border border-theme-8" />
        <div className="w-2/3 sm:w-full md:w-1/2 lg:w-2/3 xl:w-full 2xl:w-3/4">
          <span
            className={clsx(
              'relative text-left text-base font-medium text-theme-2',
            )}
          >
            <span className="sm:hidden">Serveur {server}</span>
            <span className="hidden sm:block md:hidden">Serv. {server}</span>
            <span className="hidden md:block lg:hidden">Serveur {server}</span>
            <span className="hidden lg:block xl:hidden">S. {server}</span>
            <span className="hidden xl:block 2xl:hidden">Serv. {server}</span>
            <span className="hidden 2xl:block">Serveur {server}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
