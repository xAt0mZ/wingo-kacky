import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { FlagIcon } from '@heroicons/react/24/outline';

import { useCurrentSeason } from '@/hooks/useCurrentSeason';
import { Paths } from '@/router';

import wingoLogo from './wingo.png';

type Props = {
  title: string;
  withLogo?: boolean;
};

export function Header({
  title,
  children,
  withLogo,
}: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-row items-center justify-between">
      {!withLogo && (
        <span className="text-4xl font-bold text-theme-2">{title}</span>
      )}
      {withLogo && (
        <div className="flex flex-col gap-2">
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
      <FinishedSummary />
    </div>
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
      className="flex flex-row items-center gap-2 rounded-lg bg-theme-6 px-6 py-3.5 text-theme-2"
    >
      <FlagIcon className="h-4 w-4" />
      <span className="text-base font-medium">
        {finished} / {nbMaps} terminées
      </span>
    </Link>
  );
}

{
  /* <ActionLink href='https://twitch.tv/wingobear'>
          <Button>
            <FontAwesomeIcon
              icon={faCircle}
              className='h-1.5 text-emerald-500'
            />
            Voir le stream
          </Button>
        </ActionLink> */
}
