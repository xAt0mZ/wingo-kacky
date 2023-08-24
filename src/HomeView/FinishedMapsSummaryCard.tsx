import {
  // ArrowTrendingUpIcon,
  // ArrowTrendingDownIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Paths } from '@/router';
import { useCurrentSeason } from '@/hooks/useCurrentSeason';

export function FinishedMapsSummaryCard() {
  const { data: currentSeason, isLoading } = useCurrentSeason();

  if (!currentSeason || isLoading) {
    return null;
  }
  const {
    season: { maps, nbMaps },
  } = currentSeason;

  const finished = maps?.filter((m) => m.validated).length || 0;

  // const gainedRank = true;
  // const top = 32;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-theme-6 px-4 py-6">
      <div className="flex flex-col items-center gap-2">
        <div>
          <span className="text-center text-4xl font-bold text-theme-2">
            {finished}
          </span>
          <span className="text-center align-top text-base font-normal text-theme-2 opacity-50">
            /{nbMaps}
          </span>
        </div>
        <div className="text-center text-lg font-bold text-theme-2">
          cartes terminées
        </div>
        {/* <div className="inline-flex items-center justify-start gap-2.5 rounded-2xl border border-theme-8 bg-theme-7 px-4 py-2">
          <div className="text-base font-medium text-theme-2">Top {top}</div>
          {gainedRank && <ArrowTrendingUpIcon className="h-4 w-4 text-green" />}
          {!gainedRank && (
            <ArrowTrendingDownIcon className="h-4 w-4 text-red" />
          )}
        </div> */}
      </div>
      <Link
        to={Paths.MAPS}
        className={clsx(
          'flex flex-row items-center justify-center gap-2 rounded-lg px-6 py-3.5',
          'border bg-theme-4 text-white-neutral hover:bg-theme-2',
          'dark:border-theme-4 dark:bg-theme-6',
          'dark:hover:bg-theme-4 dark:hover:text-theme-6',
        )}
      >
        <ChevronRightIcon className="h-4 w-4" />
        <span className="text-base font-medium">Voir le détail</span>
      </Link>
    </div>
  );
}
