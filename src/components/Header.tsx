import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { FlagIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { useCurrentSeason } from '@/hooks/useCurrentSeason';
import { Paths } from '@/router';
import { Season } from '@/api/types';

import { PingIndicator } from './PingIndicator';
import { useOAuthContext } from '@/providers/useOAuthContext';
import { LoginButton } from './LoginButton';

type Props = {
  title: string;
  season?: Season;
};

export function Header({ title, children, season }: PropsWithChildren<Props>) {
  const { user } = useOAuthContext();

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex grow flex-row justify-between sm:flex-col">
        <span className="text-theme-2 text-4xl font-bold">{title}</span>
        <div className="flex flex-row items-center gap-2">
          {user ? (
            <>
              <img
                width={32}
                height={32}
                src={user.profile_image_url}
                className="bg-theme-6 shrink-0 rounded-2xl"
              />
              <span className="text-theme-2 text-base font-medium">
                {user.display_name}
              </span>
            </>
          ) : (
            <span className="h-8" />
          )}
        </div>
      </div>
      {children}
      <div className="flex flex-row gap-2 lg:gap-6">
        <FinishedSummary season={season} />
        <StreamButton />
        <LoginButton className='hidden sm:flex' />
      </div>
    </div>
  );
}

function FinishedSummary({ season }: { season?: Season }) {
  const { data, isLoading } = useCurrentSeason();

  if (!data || isLoading) {
    return null;
  }

  const { nbMaps, maps } = season ?? data.season;

  const finished = maps?.filter((m) => m.validated).length || 0;
  return (
    <Link
      to={Paths.MAPS}
      className={clsx(
        'hidden flex-row items-center gap-2 rounded-lg sm:flex',
        'px-3 py-1.5',
        'lg:px-6 lg:py-3.5',
        'bg-theme-6 text-theme-2 hover:text-theme-4',
      )}
    >
      <FlagIcon className="hidden h-4 w-4 md:block" />
      <span className="inline-flex gap-1 text-base font-medium">
        <span>
          {finished} / {nbMaps}
        </span>
        <span className="hidden xl:block">terminées</span>
      </span>
    </Link>
  );
}

function StreamButton() {
  return (
    <a
      href="https://twitch.tv/wingo"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group hidden flex-row items-center gap-2 rounded-lg px-6 py-3.5 sm:flex',
        'text-base font-medium',
        'bg-theme-4 text-white-neutral hover:bg-theme-2 border',
        'dark:border-theme-4 dark:bg-theme-7',
        'dark:hover:bg-theme-4 dark:hover:text-theme-7',
      )}
    >
      <PingIndicator
        size="h-2 w-2"
        color="bg-emerald-500 dark:group-hover:bg-theme-7"
      />
      <span className="lg:hidden">Live</span>
      <span className="hidden lg:block">Voir le stream</span>
    </a>
  );
}
