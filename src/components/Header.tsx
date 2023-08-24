import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowTopRightOnSquareIcon,
  FlagIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { useCurrentSeason } from '@/hooks/useCurrentSeason';
import { Paths } from '@/router';

import { PingIndicator } from './PingIndicator';
import wingoLogo from './wingo.png';

type Props = {
  title: string;
  withLogo?: boolean;
  withLeaderboardLink?: boolean;
};

export function Header({
  title,
  children,
  withLogo,
  withLeaderboardLink,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-row items-center justify-between">
      {!withLogo && (
        <span className="text-4xl font-bold text-theme-2">{title}</span>
      )}
      {withLogo && (
        <div className="flex grow flex-row justify-between sm:flex-col">
          <span className="text-4xl font-bold text-theme-2">{title}</span>
          <div className="flex flex-row items-center gap-2">
            <img
              width={32}
              height={32}
              src={wingoLogo}
              className="shrink-0 rounded-2xl bg-theme-6"
            />
            <span className="text-base font-medium text-theme-2">Wingo</span>
          </div>
        </div>
      )}

      {children}

      <div className="flex flex-row gap-6">
        {withLeaderboardLink && <LeaderboardLink />}
        <FinishedSummary />
        <StreamButton />
      </div>
    </div>
  );
}

function LeaderboardLink() {
  return (
    <a
      href="https://kackyreloaded.com/event/editions/ranking.php?edition=4"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'items-center gap-2.5',
        'hidden',
        'lg:inline-flex',
        'text-theme-2 hover:text-theme-4',
      )}
    >
      <span className="text-base font-medium">Leaderboard</span>
      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
    </a>
  );
}

function FinishedSummary() {
  const { data, isLoading } = useCurrentSeason();

  if (!data || isLoading) {
    return null;
  }

  const {
    season: { nbMaps, maps },
  } = data;
  const finished = maps?.filter((m) => m.validated).length || 0;
  return (
    <Link
      to={Paths.MAPS}
      className={clsx(
        'hidden flex-row items-center gap-2 rounded-lg px-6 py-3.5 sm:flex',
        'bg-theme-6 text-theme-2 hover:text-theme-4',
      )}
    >
      <FlagIcon className="h-4 w-4" />
      <span className="inline-flex gap-1 text-base font-medium">
        <span>
          {finished} / {nbMaps}
        </span>
        <span className="hidden md:block">terminées</span>
      </span>
    </Link>
  );
}

function StreamButton() {
  return (
    <a
      href="https://twitch.tv/wingobear"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group hidden flex-row items-center gap-2 rounded-lg px-6 py-3.5 sm:flex',
        'border bg-theme-4 text-white-neutral hover:bg-theme-2',
        'dark:border-theme-4 dark:bg-theme-7',
        'dark:hover:bg-theme-4 dark:hover:text-theme-7',
      )}
    >
      <PingIndicator
        size="h-2 w-2"
        color="bg-emerald-500 dark:group-hover:bg-theme-7"
      />
      <span className="text-base font-medium">Voir le stream</span>
    </a>
  );
}
