import clsx from 'clsx';
import { useEffect } from 'react';
import { XMarkIcon, Bars2Icon, CheckIcon } from '@heroicons/react/24/outline';

import { useSeasons } from '@/hooks/useSeasons';
import { SeasonSummary } from '@/api/types';
// import { useSelectedSeason } from '@/hooks/useSelectedEdition';

import { Modal, ModalProvider, useModalContext } from '@@/Modal';
import { Option, Select } from '@@/Select';
import { Checkbox } from '@@/Checkbox';

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
  const { data: seasons, isLoading } = useSeasons();
  // const [selectedSeason, setSelectedSeaon] = useSelectedSeason();
  useEffect(() => {}, []);

  if (!seasons || isLoading) {
    return null;
  }

  const orderByOptions: Option<string>[] = [{ name: 'Numéro', item: 'Numéro' }];
  const statusOptions: Option<string>[] = [
    { name: 'Tous', item: 'Tous' },
    { name: 'Terminées', item: '' },
  ];
  const editionsOptions: Option<SeasonSummary>[] = seasons.map((s) => ({
    name: s.name,
    item: s,
  }));
  // const datesOptions: Option<Date> = selectedSeason ? selectedSeason.maps?.filter({}).map((m) => ({name: m.})) : [{name: 'Tous les jours', item: new Date() }]
  const datesOptions: Option<Date>[] = [{ name: 'Tous', item: new Date() }];

  return (
    <>
      <Item label="Trier par" options={orderByOptions} />
      <Item label="Statut" options={statusOptions} />
      <Item label="Editions" options={editionsOptions} />
      <Item label="Dates" options={datesOptions} />
      <div className="flex gap-4 py-3">
        <Checkbox label="Démo" />
        <Checkbox label="Favoris" />
      </div>
    </>
  );
}

function Item<T>({ label, options }: { label: string; options: Option<T>[] }) {
  return (
    <div className="flex flex-col items-start gap-1 self-stretch">
      <span className="text-base font-semibold text-theme-2 dark:text-white-neutral">
        {label}
      </span>
      <Select options={options} onSelect={() => ({})} />
    </div>
  );
}
