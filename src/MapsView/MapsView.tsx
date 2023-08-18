import { useCallback } from 'react';
import clsx from 'clsx';
import {
  CheckIcon,
  StarIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { TMMap } from '@/api/types';
import { useSeason } from '@/hooks/useSeason';

import { Header } from '@@/Header';
import { Modal, ModalProvider, useModalContext } from '@@/Modal';
import { IconType } from '@@/IconType';

import { MapDetails } from './MapDetails';
import { Filters } from './Filters';
import { MapsFiltersProvider, useMapsFilters } from './useMapsFilters';
import { SelectedMapProvider, useSelectedMap } from './useSelectedMap';

export function MapsView() {
  return (
    <MapsFiltersProvider>
      <SelectedMapProvider>
        <Header title="Cartes" />
        <div className="flex grow flex-col gap-4">
          <Filters />
          <ModalProvider keepOnResize>
            <MapsList />
          </ModalProvider>
        </div>
      </SelectedMapProvider>
    </MapsFiltersProvider>
  );
}

function MapsList() {
  const { show, hide } = useModalContext();
  const { selectedMap, setSelectedMap } = useSelectedMap();
  const {
    filters: { season: selectedSeason },
  } = useMapsFilters();
  const { data: season } = useSeason(selectedSeason?._id);

  const selectMapAndShow = useCallback(
    (map: TMMap) => {
      setSelectedMap(map);
      show();
    },
    [setSelectedMap, show],
  );

  return (
    <>
      <div className="grid grow grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-10">
        {season?.maps?.map((m) => (
          <MapCard key={m._id} map={m} onClick={selectMapAndShow} />
        ))}
      </div>

      <Modal
        from="top-full"
        to="top-16"
        transition="ease-in-out duration-300"
        withBackdrop
        onClose={hide}
      >
        {selectedMap && <MapDetails />}
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
    <button className={colStart(number)} onClick={() => onClick(map)}>
      <div className="flex flex-col">
        <div
          className="relative h-12 grow rounded-t-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${image}")` }}
        >
          <>
            {!image && (
              <div className="flex h-full w-full items-center justify-center rounded-t-lg bg-theme-8" />
            )}
            {favorite && (
              <MiniIcon
                className="right-0 top-0 rounded-bl-lg rounded-tr-lg bg-gold text-theme-7"
                icon={StarIcon}
              />
            )}
          </>
        </div>
        <div
          className={clsx(
            'relative rounded-b-lg border-2 px-4 py-1 text-center text-2xl font-bold text-theme-2',
            validated ? (first ? 'border-gold' : 'border-green') : 'border-red',
          )}
        >
          <MiniIcon
            className={clsx(
              'left-0 top-0 rounded-br-xl pb-0.5 pr-0.5 text-theme-7',
              validated ? (first ? 'bg-gold' : 'bg-green') : 'bg-red',
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
        className,
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
