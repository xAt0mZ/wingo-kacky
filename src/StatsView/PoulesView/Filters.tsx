import clsx from 'clsx';
import { PropsWithChildren, useEffect, useMemo } from 'react';
// import { compact, concat, sortBy, uniqBy } from 'lodash';
import { XMarkIcon, Bars2Icon, CheckIcon } from '@heroicons/react/24/outline';

import { useSeasons } from '@/hooks/useSeasons';
import { useSeason } from '@/hooks/useSeason';
import { useSettings } from '@/hooks/useSettings';
// import { LOCALE_DATE_OPTIONS } from '@/consts';

import { Modal, ModalProvider, useModalContext } from '@@/Modal';
import { Select } from '@@/Select';
import { Checkbox } from '@@/Checkbox';

import {
  //  Filters as PoulesFilters,
  usePoulesFilter,
} from './usePoulesFilters';
import { displayByOptions } from './options';
import pouleImg from './images/poule.gif';
import petImg from './images/pet.gif';
import shakeImg from './images/shake.gif';

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
    <div className="grid grid-cols-2 items-end justify-center gap-4 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      <Items />
    </div>
  );
}

// type FilterOptions = {
//   season: PoulesFilters['season'][];
//   displayBy: PoulesFilters['displayBy'][];
// };

function Items() {
  const { lightMode } = useSettings();
  const { filters, dispatch } = usePoulesFilter();
  const { data: seasons, isLoading: seasonsLoading } = useSeasons();
  const { data: selectedSeason, isLoading: selectedLoading } = useSeason(
    filters.season?.item._id,
  );

  const initial = useMemo(() => seasons?.find((s) => s.current), [seasons]);

  useEffect(() => {
    if (initial) {
      dispatch(['season', { name: initial.name, item: initial }]);
    }
  }, [dispatch, initial]);

  if (
    seasonsLoading ||
    selectedLoading ||
    !seasons ||
    !selectedSeason ||
    !filters.season
  ) {
    return null;
  }

  // const seasonsOptions: FilterOptions['season'] = seasons.map((s) => ({
  //   name: s.name,
  //   item: s,
  // }));

  return (
    <>
      {/* <Item label="Editions">
        <Select
          options={seasonsOptions}
          selected={filters.season}
          onSelect={(v) => dispatch(['season', v])}
        />
      </Item> */}
      <Item label="Affichage">
        <Select
          options={displayByOptions}
          selected={filters.displayBy}
          onSelect={(v) => dispatch(['displayBy', v])}
        />
      </Item>
      <Item
        label="Poules"
        className="sm:col-span-2 md:col-span-1 lg:col-span-2"
      >
        <div className="my-3 flex gap-4 md:my-auto md:grid md:grid-cols-2 md:gap-2 lg:flex lg:gap-4">
          <Checkbox
            label={<Label src={pouleImg} />}
            checkClasses={clsx(
              'text-white-neutral',
              lightMode ? 'bg-theme-4' : 'bg-blue',
            )}
            enabled={filters.poule}
            setEnabled={(v) => dispatch(['poule', v])}
          />
          <Checkbox
            label={<Label src={petImg} />}
            checkClasses="bg-red text-theme-1"
            enabled={filters.pet}
            setEnabled={(v) => dispatch(['pet', v])}
          />
          <Checkbox
            label={<Label src={shakeImg} />}
            checkClasses="bg-gold text-theme-1"
            enabled={filters.shake}
            setEnabled={(v) => dispatch(['shake', v])}
          />
          <Checkbox
            label="total"
            enabled={filters.total}
            setEnabled={(v) => dispatch(['total', v])}
          />
        </div>
      </Item>
    </>
  );
}

type ItemProps = {
  label: string;
  className?: string;
};
function Item({ label, className, children }: PropsWithChildren<ItemProps>) {
  return (
    <div
      className={clsx(
        'flex flex-col items-start gap-1 self-stretch',
        className,
      )}
    >
      <span className="text-base font-semibold text-theme-2 dark:text-white-neutral">
        {label}
      </span>
      {children}
    </div>
  );
}

function Label({ src }: { src: string }) {
  return (
    <span className="flex gap-2">
      <img src={src} className="w-5" />
    </span>
  );
}
