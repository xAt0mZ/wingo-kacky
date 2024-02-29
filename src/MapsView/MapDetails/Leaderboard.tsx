import { orderBy } from 'lodash';
import { format } from 'date-fns';
import { FlagIcon } from '@heroicons/react/24/outline';

import {
  LeaderboardItem as LeaderboardItemType,
  useLeaderboard,
} from '@/hooks/useLeaderboard';

import { useSelectedMap } from '../useSelectedMap';

export function Leaderboard() {
  const { selectedMap } = useSelectedMap();
  const { data, isLoading } = useLeaderboard(selectedMap?.number);

  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Leaderboard</span>
        {!isLoading && data && data.length !== 0 && (
          <div className="flex items-center gap-1.5 text-theme-4">
            <FlagIcon className="h-4 w-4" />
            <span className="text-base font-medium">
              {data.length}
              {data.length === 10 ? '+' : ''} finish
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-stretch gap-4 rounded-2xl bg-theme-7 p-4 shadow-md">
        {(isLoading || !data || data.length === 0) && (
          <span className="text-theme-2">Aucun temps disponible</span>
        )}
        {!isLoading && data && data.length !== 0 && (
          <>
            {orderBy(data, 'rank', 'asc').map((item) => (
              <LeaderboardItem key={item.rank} item={item} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function LeaderboardItem({
  item: { score, rank, date, uplay },
}: {
  item: LeaderboardItemType;
}) {
  return (
    <div className="grid grid-cols-2 items-center sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
      <div className="col-span-2 flex items-center gap-2 justify-self-start">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-theme-2 text-xl font-normal text-theme-7 shadow">
          {rank}
        </span>
        <span className="truncate">{uplay}</span>
      </div>
      <span className="justify-self-start">
        {format(new Date(score), 'mm:ss.SSS')}
      </span>
      <span className="justify-self-end truncate">
        {new Date(date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </div>
  );
}
