import { intlFormatDistance, isBefore } from 'date-fns';
import { orderBy, upperFirst } from 'lodash';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  useServersRotation,
  queryKeys as rotationsQueryKeys,
} from '@/hooks/useServersRotation';

import { WIPPanel } from '@@/WipPanel';

export function UpcomingMapsCard() {
  const { data, isLoading } = useServersRotation();

  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl bg-theme-6 p-4">
      <span className="text-lg font-bold text-theme-2">À venir</span>
      {(isLoading || !data || data.length === 0) && <WIPPanel />}
      {data && (
        <div className="my-auto flex h-56 flex-col gap-2 overflow-y-auto pr-2">
          {orderBy(data, 'dateLimit').map((s, key) => (
            <Item
              key={key}
              mapNumber={s.nextMap.number}
              server={s.number}
              time={s.dateLimit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type ItemProps = {
  mapNumber: number;
  time: Date;
  server: number;
};

function getDistance(time: Date) {
  return intlFormatDistance(time, new Date(), { locale: 'fr-FR' });
}

function Item({ mapNumber, time, server }: ItemProps) {
  const queryClient = useQueryClient();
  const [distance, setDistance] = useState(getDistance(time));

  useEffect(() => {
    const interval = setInterval(() => {
      if (isBefore(time, new Date())) {
        queryClient.invalidateQueries({ queryKey: rotationsQueryKeys });
        clearInterval(interval);
      }
      setDistance(getDistance(time));
    }, 1 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [mapNumber, queryClient, time]);

  return (
    <>
      <div className="inline-flex items-center justify-between">
        <span className="rounded-2xl border border-theme-8 bg-theme-7 px-4 py-2 text-base font-medium text-theme-2">
          {mapNumber}
        </span>
        <div className="inline-flex items-center gap-2">
          <div className="text-right text-base font-medium text-theme-4">
            {upperFirst(distance)}
          </div>
          <div className="h-4 w-0 border border-theme-8"></div>
          <div className="text-left text-base font-medium text-theme-2">
            Serveur {server}
          </div>
        </div>
      </div>
      <div className="border border-theme-8 last:hidden" />
    </>
  );
}
