import {
  // ChevronLeftIcon,
  // ChevronRightIcon,
  FlagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { orderBy } from 'lodash';
import { format } from 'date-fns';

import {
  LeaderboardItem as LeaderboardItemType,
  useLeaderboard,
} from '@/hooks/useLeaderboard';

import { useModalContext } from '@@/Modal';
import { SwipeProvider, useSwipeContext } from '@@/Modal/useSwipeContext';
// import { Select } from '@@/Select';
import { SizeDisplay } from '@@/SizeDisplay';

import { useSelectedMap } from '../useSelectedMap';

import { VideoPlayer } from './VideoPlayer';

export function MapDetails() {
  const { hide } = useModalContext();
  return (
    <SwipeProvider onSwipedDown={hide}>
      <Content />
    </SwipeProvider>
  );
}

function Content() {
  const { scrollableRef, scrollboxRef, swipeZoneHandlers } = useSwipeContext();

  return (
    <div className="flex h-full w-full flex-col" {...swipeZoneHandlers}>
      <Header />
      <div
        className="flex-auto overflow-y-scroll bg-theme-6 text-theme-2"
        ref={scrollboxRef}
      >
        <div ref={scrollableRef} id="scrollable-element">
          <MiniContent />
          <LargeContent />
        </div>
      </div>
    </div>
  );
}

function MiniContent() {
  return (
    <div className="flex w-full flex-col items-stretch gap-6 p-4 md:hidden">
      {/* <NextRun /> */}
      <Video />
      <Leaderboard />
    </div>
  );
}

function LargeContent() {
  return (
    <div
      className={clsx(
        'hidden flex-col gap-6 p-4',
        'md:flex',
        'lg:px-9 lg:py-6',
        'xl:px-14 xl:py-8',
        '2xl:px-20 2xl:py-10',
      )}
    >
      {/* <NextRun /> */}
      <div className="grid grid-cols-3 grid-rows-1 gap-8 xl:grid-cols-2">
        <div className="col-span-2 xl:col-span-1">
          <Video />
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

function Header() {
  const { hide } = useModalContext();
  const { selectedMap } = useSelectedMap();
  if (!selectedMap) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between rounded-t-3xl bg-theme-7 p-4 text-theme-2 sm:px-20">
      <span className="text-3xl font-semibold">{selectedMap.number}</span>
      <SizeDisplay />
      {/* <div className="hidden sm:block">
        <Controller />
      </div> */}
      <button onClick={hide} className="flex content-center items-center gap-1">
        <XMarkIcon className="h-8 w-8" />
      </button>
    </div>
  );
}

// function Controller() {
//   // const options = maps.map((m) => String(m.number));
//   return (
//     <div className="flex items-center gap-8 self-stretch">
//       <button className="flex items-center">
//         <ChevronLeftIcon className="h-6 w-6" />
//         <span className="text-base font-medium">Précédente</span>
//       </button>
//       {/* <Select options={options} /> */}
//       <button className="flex items-center">
//         <span className="text-base font-medium">Suivante</span>
//         <ChevronRightIcon className="h-6 w-6" />
//       </button>
//     </div>
//   );
// }

// function NextRun() {
//   return (
//     <div className="flex items-start justify-between rounded-lg bg-theme-7 p-4 shadow-md md:w-96">
//       <span className="text-base font-semibold">Dans X minutes</span>
//       <span className="text-base font-medium text-theme-4">Serveur 7</span>
//     </div>
//   );
// }

function Video() {
  const { selectedMap } = useSelectedMap();

  if (!selectedMap) {
    return null;
  }

  return (
    <div className="flex flex-col items-stretch gap-4">
      <span className="text-base font-semibold">
        Clip de {selectedMap.validated ? 'finish' : 'demo'}
        {selectedMap.number === 239 ? " (oui, c'est le finish de Wingo)" : ''}
      </span>
      <div className="flex flex-col items-start rounded-2xl bg-theme-7 p-3 shadow-md">
        <VideoPlayer url={selectedMap.video} />
      </div>
    </div>
  );
}

function Leaderboard() {
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
          <span className="text-theme-2">
            Personne n&apos;a terminé pour le moment
          </span>
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
