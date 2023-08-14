import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

import { maps } from '@/MapsView/mock';
import { TMMap } from '@/api/types';

import { useModalContext } from '@@/Modal';
import { SwipeProvider, useSwipeContext } from '@@/Modal/useSwipeContext';
import { Select } from '@@/Select';
import { SizeDisplay } from '@@/SizeDisplay';

type Props = {
  map: TMMap;
};

export function MapDetails({ map }: Props) {
  const { hide } = useModalContext();
  return (
    <SwipeProvider onSwipedDown={hide}>
      <Content map={map} />
    </SwipeProvider>
  );
}

function Content({ map: { number, video } }: Props) {
  const { scrollableRef, scrollboxRef, swipeZoneHandlers } = useSwipeContext();

  return (
    <div className="flex h-full w-full flex-col" {...swipeZoneHandlers}>
      <Header number={number} />
      <div
        className="flex-auto overflow-y-scroll bg-theme-6 text-theme-2"
        ref={scrollboxRef}
      >
        <div ref={scrollableRef} id="scrollable-element">
          <MiniContent url={video} />
          <LargeContent url={video} />
        </div>
      </div>
    </div>
  );
}

function MiniContent({ url }: { url?: string }) {
  return (
    <div className="flex w-full flex-col items-stretch gap-6 p-4 md:hidden">
      <NextRun />
      <Video url={url} />
      <Leaderboard />
    </div>
  );
}

function LargeContent({ url }: { url?: string }) {
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
      <NextRun />
      <div className="grid grid-cols-3 grid-rows-1 gap-8 xl:grid-cols-2">
        <div className="col-span-2 xl:col-span-1">
          <Video url={url} />
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

function NextRun() {
  return (
    <div className="flex items-start justify-between rounded-lg bg-theme-7 p-4 shadow-md md:w-96">
      <span className="text-base font-semibold">Dans X minutes</span>
      <span className="text-base font-medium text-theme-4">Serveur 7</span>
    </div>
  );
}

function Video({ url }: { url?: string }) {
  return (
    <div className="flex flex-col items-stretch gap-4">
      <span className="text-base font-semibold">Clip de démo</span>
      <div className="flex flex-col items-start rounded-2xl bg-theme-7 p-3 shadow-md">
        <VideoPlayer url={url} />
      </div>
    </div>
  );
}

// for the aspect ratio trick
// see https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
type VideoPlayerProps = {
  url?: string;
};
function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="relative w-full overflow-hidden pt-[56.25%]">
      {url && (
        <iframe
          className="absolute inset-0 h-full w-full rounded-lg"
          title="Map clip"
          src={url}
          allowFullScreen
        />
      )}
    </div>
  );
}

function Leaderboard() {
  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Leaderboard</span>
        <div className="flex items-center gap-1.5 text-theme-4">
          <FlagIcon className="h-4 w-4" />
          <span className="text-base font-medium">90 finish</span>
        </div>
      </div>
      <div className="flex flex-col items-stretch gap-4 rounded-2xl bg-theme-7 p-4 shadow-md">
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
        <LeaderboardItem />
      </div>
    </div>
  );
}

function LeaderboardItem() {
  return (
    <div className="inline-flex flex-wrap items-stretch justify-between gap-2 text-base font-medium">
      <div className="flex items-center justify-center gap-2 truncate xl:flex-1">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-theme-2 text-xl font-normal text-theme-7 shadow">
          1
        </span>
        <span className="truncate">Super long name that will be cut</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span>00:11.162</span>
      </div>
      <div className="flex flex-1 items-center justify-center truncate ">
        <span className="truncate">10 septembre 2023</span>
      </div>
    </div>
  );
}

function Header({ number }: { number: number }) {
  const { hide } = useModalContext();
  return (
    <div className="flex w-full items-center justify-between rounded-t-3xl bg-theme-7 p-4 text-theme-2 sm:px-20">
      <span className="text-3xl font-semibold">{number}</span>
      <SizeDisplay />
      <div className="hidden sm:block">
        <Controller />
      </div>
      <button onClick={hide} className="flex content-center items-center gap-1">
        <XMarkIcon className="h-8 w-8" />
      </button>
    </div>
  );
}

function Controller() {
  const options = maps.map((m) => String(m.number));
  return (
    <div className="flex items-center gap-8 self-stretch">
      <button className="flex items-center">
        <ChevronLeftIcon className="h-6 w-6" />
        <span className="text-base font-medium">Précédente</span>
      </button>
      <Select options={options} />
      <button className="flex items-center">
        <span className="text-base font-medium">Suivante</span>
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
