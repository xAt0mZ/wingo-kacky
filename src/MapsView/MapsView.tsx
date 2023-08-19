import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import {
  CheckIcon,
  StarIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { orderBy, toNumber } from 'lodash';
import { useLocation } from 'react-router-dom';

import { TMMap } from '@/api/types';
import { useSeason } from '@/hooks/useSeason';
import { useCurrentSeason } from '@/hooks/useCurrentSeason';

import { Header } from '@@/Header';
import { Modal, ModalProvider, useModalContext } from '@@/Modal';
import { IconType } from '@@/IconType';

import { MapDetails } from './MapDetails';
import { Filters } from './Filters';
import {
  Filters as MapFilters,
  MapsFiltersProvider,
  useMapsFilters,
} from './useMapsFilters';
import { SelectedMapProvider, useSelectedMap } from './useSelectedMap';
import {
  LOCALE_DATE_OPTIONS,
  allDatesOption,
  orderByDate,
  orderByNumber,
  statusAll,
  statusFinished,
  statusFirst,
  statusUnfinished,
} from './Filters/options';

export function MapsView() {
  const { data, isLoading } = useCurrentSeason();
  if (!data || isLoading) {
    return null;
  }

  const initialValues: MapFilters = {
    demo: false,
    fav: false,
    orderBy: orderByNumber,
    status: statusAll,
    date: allDatesOption,
    season: { item: data.season, name: data.season.name },
  };

  return (
    <MapsFiltersProvider initialValues={initialValues}>
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
  const { filters } = useMapsFilters();
  const { data: season } = useSeason(filters.season.item._id);
  const { state } = useLocation();
  const [localState, setLocalState] = useState(null);

  useEffect(() => setLocalState(state), [state]);

  const selectMapAndShow = useCallback(
    (map: TMMap) => {
      setSelectedMap(map);
      show();
    },
    [setSelectedMap, show],
  );

  const maps = useMemo(() => {
    const [fields, orders] =
      filters.orderBy === orderByDate
        ? [
            ['finishedAt', 'number'],
            ['asc', toNumber(season?.startMap) < 0 ? 'desc' : 'asc'] as const,
          ]
        : [
            ['number'],
            [toNumber(season?.startMap) < 0 ? 'desc' : 'asc'] as const,
          ];
    return orderBy(season?.maps, fields, orders);
  }, [filters.orderBy, season]);

  useEffect(() => {
    const mapId = localState ? localState['mapId'] : undefined;
    if (mapId) {
      const map = maps.find((m) => m.number === toNumber(mapId));
      if (map) {
        selectMapAndShow(map);
      }
      setLocalState(null);
    }
  }, [maps, selectMapAndShow, localState]);

  return (
    <>
      <div className="grid grow grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-10">
        {maps.map((m) => (
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
  const { filters } = useMapsFilters();
  const { number, validated, first, favorite, image, video } = map;
  const Icon = validated ? CheckIcon : video ? VideoCameraIcon : XMarkIcon;

  return (
    <button
      className={clsx(colStart(number, filters), grayScale(map, filters))}
      onClick={() => onClick(map)}
    >
      <div className="flex flex-col">
        <div
          className="relative h-12 grow rounded-t-lg bg-cover bg-center bg-no-repeat"
          style={image ? { backgroundImage: `url("${image}")` } : {}}
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
function colStart(id: number, f: MapFilters) {
  if (f.orderBy === orderByDate) {
    return '';
  }
  switch (Math.abs(id) % 10) {
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

function grayScale(m: TMMap, f: MapFilters): string {
  const inDate =
    f.date === allDatesOption
      ? true
      : m.finishedAt &&
        f.date.name ===
          new Date(m.finishedAt).toLocaleDateString(
            'fr-FR',
            LOCALE_DATE_OPTIONS,
          );

  const inFav = f.fav ? !!m.favorite : true;
  const inDemo = f.demo ? !m.validated && m.video : true;
  const inStatus =
    f.status === statusFinished
      ? m.validated
      : f.status === statusUnfinished
      ? !m.validated
      : f.status === statusFirst
      ? !!m.first
      : true;
  const inGlobalFilter = inDate && inFav && inDemo && inStatus;
  return inGlobalFilter ? '' : 'grayscale';
}
