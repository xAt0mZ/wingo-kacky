import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { compact, concat, sortBy, uniqBy } from 'lodash';
import { XMarkIcon, Bars2Icon, CheckIcon } from '@heroicons/react/24/outline';

import { useSeasons } from '@/hooks/useSeasons';
import { useSeason } from '@/hooks/useSeason';

import { Modal, ModalProvider, useModalContext } from '@@/Modal';
import { Select, Props as SelectProps } from '@@/Select';
import { Checkbox } from '@@/Checkbox';

import { useMapsFilters } from '../useMapsFilters';

import {
  FilterOptions,
  LOCALE_DATE_OPTIONS,
  allDates,
  orders,
  statuses,
} from './Options';

export function Filters() {
  return (
    <>
      <div className="sm:hidden">
        <MicroFilters />
      </div>
      <div className="hidden sm:block">
        <FullFilters />
      </div>
    </>
  );
}

function MicroFilters() {
  return (
    <ModalProvider>
      <Content />
    </ModalProvider>
  );
}

function Content() {
  const { show, hide } = useModalContext();
  return (
    <>
      <button
        onClick={show}
        className="flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-theme-6 px-6 py-3.5 text-theme-2"
      >
        <Bars2Icon className="h-4 w-4" />
        <span className="text-base font-medium">Filtrer</span>
      </button>

      <Modal
        className="flex h-full w-full flex-col justify-between bg-theme-6 p-4"
        from="opacity-0"
        to="opacity-100"
      >
        <>
          <div className="flex flex-col items-start gap-6 text-theme-2">
            <button onClick={hide} className="self-end">
              <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="flex flex-col items-start gap-6 self-stretch">
              <span className="text-4xl font-bold text-theme-2">Filtrer</span>
              <Items />
            </div>
          </div>
          <button
            onClick={hide}
            className={clsx(
              'flex flex-row items-center justify-center gap-2 self-stretch rounded-lg px-6 py-3.5',
              'bg-theme-4 text-white-neutral',
              'dark:border dark:border-theme-4 dark:bg-theme-6',
            )}
          >
            <CheckIcon className="h-4 w-4" />
            <span className="text-base font-medium">Valider les filtres</span>
          </button>
        </>
      </Modal>
    </>
  );
}

function FullFilters() {
  return (
    <div className="grid grid-cols-2 items-end justify-center gap-4 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
      <Items />
    </div>
  );
}

function Items() {
  const { filters, dispatch } = useMapsFilters();
  const { data: seasons, isLoading: seasonsLoading } = useSeasons();
  const { data: selectedSeason, isLoading: selectedLoading } = useSeason(
    filters.season?._id,
  );

  const initial = useMemo(() => seasons?.find((s) => s.current), [seasons]);

  useEffect(() => {
    if (initial) {
      dispatch({ type: 'season', payload: initial });
    }
  }, [dispatch, initial]);

  if (seasonsLoading || selectedLoading || !seasons || !selectedSeason) {
    return null;
  }

  const seasonsOptions: FilterOptions['season'] = seasons.map((s) => ({
    name: s.name,
    item: s,
  }));

  const datesOptions: FilterOptions['date'] = concat(
    allDates,
    ...sortBy(
      uniqBy(
        compact(
          selectedSeason.maps
            ?.filter((m) => m.validated)
            .map((m) => (m.finishedAt ? new Date(m.finishedAt) : undefined)),
        ).map((d) =>
          !d
            ? allDates
            : {
                item: d,
                name: d.toLocaleDateString('fr-FR', LOCALE_DATE_OPTIONS),
              },
        ),
        'name',
      ),
      'item',
    ),
  );

  return (
    <>
      <Item
        label="Trier par"
        options={orders}
        selected={filters.orderBy}
        onSelect={(payload) => dispatch({ type: 'orderBy', payload })}
      />
      <Item
        label="Statut"
        options={statuses}
        selected={filters.status}
        onSelect={(payload) => dispatch({ type: 'status', payload })}
      />
      <Item
        label="Editions"
        options={seasonsOptions}
        selected={filters.season}
        onSelect={(payload) => dispatch({ type: 'season', payload })}
      />
      <Item
        label="Dates"
        options={datesOptions}
        selected={filters.date}
        onSelect={(payload) => dispatch({ type: 'date', payload })}
      />
      <div className="flex gap-4 py-3">
        <Checkbox
          label="Démo"
          enabled={filters.demo}
          setEnabled={(v) => dispatch({ type: 'demo', payload: v })}
        />
        <Checkbox
          label="Favoris"
          enabled={filters.fav}
          setEnabled={(v) => dispatch({ type: 'fav', payload: v })}
        />
      </div>
    </>
  );
}

type ItemProps<T> = SelectProps<T> & {
  label: string;
};
function Item<T>({ label, options, selected, onSelect }: ItemProps<T>) {
  return (
    <div className="flex flex-col items-start gap-1 self-stretch">
      <span className="text-base font-semibold text-theme-2 dark:text-white-neutral">
        {label}
      </span>
      <Select options={options} selected={selected} onSelect={onSelect} />
    </div>
  );
}
