import {
  ChevronDoubleDownIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { orderBy } from 'lodash';

import { TMMap } from '@/api/types';
import { useSeason } from '@/hooks/useSeason';

import { useModalContext } from '@@/Modal';
import { SwipeProvider, useSwipeContext } from '@@/Modal/useSwipeContext';
import { Select, Options, Option } from '@@/Select';
import { SizeDisplay } from '@@/SizeDisplay';

import { useSelectedMap } from '../useSelectedMap';
import { useMapsFilters } from '../Filters/useMapsFilters';

import { VideoPlayer } from './VideoPlayer';
import { Leaderboard } from './Leaderboard';

type Props = {
  selectMap: (map: TMMap) => void;
  selectPreviousMap: () => void;
  selectNextMap: () => void;
};

export function MapDetails(props: Props) {
  const { hide } = useModalContext();
  return (
    <SwipeProvider
      onSwipedDown={hide}
      onSwipedLeft={props.selectNextMap}
      onSwipedRight={props.selectPreviousMap}
    >
      <Content {...props} />
    </SwipeProvider>
  );
}

function Content(props: Props) {
  const { scrollableRef, scrollboxRef, swipeZoneHandlers } = useSwipeContext();

  return (
    <div className="flex h-full w-full flex-col" {...swipeZoneHandlers}>
      <Header {...props} />
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

function Header(props: Props) {
  const { hide } = useModalContext();
  const { selectedMap } = useSelectedMap();
  if (!selectedMap) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between rounded-t-3xl bg-theme-7 p-4 text-theme-2 sm:px-20">
      <span className="text-3xl font-semibold">{selectedMap.number}</span>
      <SizeDisplay />
      <Controller {...props} />
      <button onClick={hide} className="flex content-center items-center gap-1">
        <XMarkIcon className="hidden h-8 w-8 sm:block" />
        <ChevronDoubleDownIcon className="h-8 w-8 animate-bounce-slow sm:hidden" />
      </button>
    </div>
  );
}

function Controller({ selectNextMap, selectPreviousMap, selectMap }: Props) {
  const {
    filters: { season },
  } = useMapsFilters();
  const { data: selectedSeason, isLoading } = useSeason(season.item._id);
  const { selectedMap } = useSelectedMap();

  if (!selectedSeason || isLoading) {
    return null;
  }
  const options: Options<TMMap> = orderBy(
    selectedSeason.maps,
    'number',
    'asc',
  ).map((item) => ({
    name: item.number.toString(),
    item,
  }));
  return (
    <div className="grid grid-cols-3 items-center gap-2 self-stretch sm:gap-4 lg:gap-6 xl:gap-8">
      <button className="flex items-center" onClick={selectPreviousMap}>
        <ChevronDoubleLeftIcon className="h-6 w-6 animate-bounce-left sm:hidden" />
        <ChevronLeftIcon className="hidden h-6 w-6 sm:block" />
        <span className="hidden text-base font-medium sm:block">
          Précédente
        </span>
      </button>
      <span className="sm:hidden">Swipe</span>
      <div className="hidden sm:block">
        <Select
          options={options}
          selected={
            options.find((o) => o.item === selectedMap) as Option<TMMap>
          }
          onSelect={(o) => selectMap(o.item)}
        />
      </div>
      <button className="flex items-center" onClick={selectNextMap}>
        <span className="hidden text-base font-medium sm:block">Suivante</span>
        <ChevronRightIcon className="hidden h-6 w-6 sm:block" />
        <ChevronDoubleRightIcon className="h-6 w-6 animate-bounce-right sm:hidden" />
      </button>
    </div>
  );
}

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
        Clip de {selectedMap.validated ? 'finish' : 'démo'}
      </span>
      <div className="flex flex-col items-start rounded-2xl bg-theme-7 p-3 shadow-md">
        <VideoPlayer url={selectedMap.video} />
      </div>
    </div>
  );
}
