import { useCallback, useState } from 'react';
import clsx from 'clsx';
import {
  CheckIcon,
  StarIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { Header } from 'components/Header';
import { TMMap } from 'api/types';

import { MapDetails } from './MapDetails';
import { Filters } from './Filters';
import { Modal, ModalProvider, useModalContext } from 'components/Modal';
import { IconType } from 'components/IconType';

import { maps } from './mock';

export function MapsView() {
  return (
    <>
      <Header title="Cartes" />
      <div className="flex grow flex-col gap-4">
        <Filters />
        <ModalProvider keepOnResize>
          <MapsList />
        </ModalProvider>
      </div>
    </>
  );
}

function MapsList() {
  const { show, hide } = useModalContext();
  const [selectedMap, setSelectedMap] = useState<TMMap | undefined>(undefined);

  const selectMapAndShow = useCallback(
    (map: TMMap) => {
      setSelectedMap(map);
      show();
    },
    [show]
  );

  return (
    <>
      <div className="grid grow grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-10">
        {maps.map((m) => (
          <MapCard key={m._id} map={m} onClick={selectMapAndShow} />
        ))}
      </div>

      <Modal from="top-full" to="top-16" withBackdrop onClose={hide}>
        {selectedMap && <MapDetails map={selectedMap} />}
      </Modal>
    </>
  );
}

type MapCardProps = {
  map: TMMap;
  onClick: (map: TMMap) => void;
};
function MapCard({ map, onClick }: MapCardProps) {
  const { number, validated, first, favorite, image, video } = map;
  const Icon = validated ? CheckIcon : video ? VideoCameraIcon : XMarkIcon;

  return (
    <button onClick={() => onClick(map)}>
      <div className={clsx('flex flex-col', colStart(number))}>
        <div
          className="relative h-12 grow rounded-t-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${image}")` }}
        >
          {favorite && (
            <MiniIcon
              className="right-0 top-0 rounded-bl-lg rounded-tr-lg bg-gold text-theme-7"
              icon={StarIcon}
            />
          )}
        </div>
        <div
          className={clsx(
            'relative rounded-b-lg border-2 px-4 py-1 text-center text-2xl font-bold text-theme-2',
            validated ? (first ? 'border-gold' : 'border-green') : 'border-red'
          )}
        >
          <MiniIcon
            className={clsx(
              '-left-0.5 -top-0.5 rounded-br-xl text-theme-7',
              validated ? (first ? 'bg-gold' : 'bg-green') : 'bg-red'
            )}
            icon={Icon}
          />
          <span>{number}</span>
        </div>
      </div>
    </button>
  );
}

type MiniIconProps = {
  className?: string;
  icon: IconType;
};
function MiniIcon({ className, icon: Icon }: MiniIconProps) {
  return (
    <div
      className={clsx(
        'absolute flex h-8 w-8 items-center justify-center',
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
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
