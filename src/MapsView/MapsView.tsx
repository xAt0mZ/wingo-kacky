import { useState } from 'react';
import clsx from 'clsx';
import {
  CheckIcon,
  StarIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { Header } from 'components/Header';
// import { Overlay, useOverlayContext } from 'components/Overlay';
import { TMMap } from 'api/types';

import { MapDetails } from './MapDetails';
import { Filters } from './Filters';

export function MapsView() {
  return (
    <>
      <Header title="Cartes" />
      <div className="flex grow flex-col gap-4">
        <Filters />
        {/* <Overlay> */}
        <MapsList />
        {/* </Overlay> */}
      </div>
    </>
  );
}

function MapsList() {
  // const { show, hide } = useOverlayContext();
  const [selectedMap, setSelectedMap] = useState<TMMap | undefined>(undefined);

  const maps = Array.from({ length: 75 }, (_, i) => i + 101);

  function selectMap(map?: TMMap) {
    setSelectedMap(map);
    // if (map) {
    //   show();
    // } else {
    //   hide();
    // }
  }

  return (
    <>
      <div className="grid grow grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-10">
        {maps.map((m, idx) => (
          <MapCard
            key={idx}
            map={{
              _id: `${m}`,
              seasonId: '1',
              number: m,
              validated: m % 3 === 0,
              video: m % 4 === 0 ? '' : undefined,
              first: m % 15 === 0,
              image: 'https://via.placeholder.com/1920x1080',
              favorite: m % 10 === 0,
            }}
            onClick={selectMap}
          />
        ))}
      </div>
      {/* {selectedMap && (
        <Overlay.Expanded
          className="top-[10%] flex w-full flex-col items-stretch gap-8 bg-green p-6 text-white-neutral"
          height="h-[calc(100vh-4rem)]"
        >
          <MapDetails map={selectedMap} />
        </Overlay.Expanded>
      )} */}
    </>
  );
}

type MapCardProps = {
  map: TMMap;
  onClick: () => void;
};
function MapCard({
  map: { number, validated, first, favorite, image, video },
  onClick,
}: MapCardProps) {
  const Icon = validated ? CheckIcon : video ? VideoCameraIcon : XMarkIcon;

  return (
    <button onClick={onClick}>
      <div className={clsx('flex flex-col', colStart(number))}>
        <div
          className="relative h-12 grow rounded-t-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${image}")` }}
        >
          {favorite && (
            <div className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-bl-xl rounded-tr-lg bg-gold text-theme-7">
              <StarIcon className="h-5 w-5" />
            </div>
          )}
        </div>
        <div
          className={clsx(
            'relative rounded-b-lg border-2 px-4 py-1 text-center text-2xl font-bold text-theme-2',
            validated ? (first ? 'border-gold' : 'border-green') : 'border-red'
          )}
        >
          <div
            className={clsx(
              'absolute -left-0.5 -top-0.5 flex h-8 w-8 items-center justify-center rounded-br-xl text-theme-7',
              validated ? (first ? 'bg-gold' : 'bg-green') : 'bg-red'
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <span>{number}</span>
        </div>
      </div>
    </button>
  );
}

// needed to make tailwind keep all the classes
function colStart(id: number) {
  switch (id % 10) {
    case 1:
      return '2xl:col-start-2';
    case 2:
      return '2xl:col-start-3';
    case 3:
      return '2xl:col-start-4';
    case 4:
      return '2xl:col-start-5';
    case 5:
      return '2xl:col-start-6';
    case 6:
      return '2xl:col-start-7';
    case 7:
      return '2xl:col-start-8';
    case 8:
      return '2xl:col-start-9';
    case 9:
      return '2xl:col-start-10';
    default:
      return '2xl:col-start-1';
  }
}
