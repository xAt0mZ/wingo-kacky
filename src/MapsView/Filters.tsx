import clsx from 'clsx';
import { XMarkIcon, Bars2Icon, CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

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
  const [expanded, setExpanded] = useState(false);
  const { ref } = useResizeDetector({ onResize: () => setExpanded(false) });

  return (
    <>
      <button
        ref={ref}
        onClick={() => setExpanded(true)}
        className="flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-theme-6 px-6 py-3.5 text-theme-2"
      >
        <Bars2Icon className="h-4 w-4" />
        <span className="text-base font-medium">Filter</span>
      </button>

      <div
        className={clsx(
          'absolute inset-0 z-10 flex h-full w-full flex-col justify-between bg-theme-6 p-4 transition-all duration-500 ease-in-out',
          expanded ? 'h-full opacity-100' : 'invisible h-0 opacity-0'
        )}
      >
        <div className="flex flex-col items-start gap-8">
          <button onClick={() => setExpanded(false)} className="self-end">
            <XMarkIcon className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-start gap-6 self-stretch">
            <span className="text-4xl font-bold text-theme-2">Filtrer</span>
            <Items />
          </div>
        </div>
        <button className="flex flex-row items-center justify-center gap-2 self-stretch rounded-lg bg-theme-4 px-6 py-3.5 text-white">
          <CheckIcon className="h-4 w-4" />
          <span className="text-base font-medium">Valider les filtres</span>
        </button>
      </div>
    </>
  );
}

function FullFilters() {
  return (
    <div className="flex flex-row flex-wrap items-end gap-4 ">
      <Items />
    </div>
  );
}

function Items() {
  return (
    <>
      <Item label="Trier par" options={['Numéro', 'azer']} />
      <Item label="Difficulté" options={['Toutes']} />
      <Item label="Statut" options={['Tous']} />
      <Item label="Editions" options={['KKR3 - 2022']} />
      <Item label="Dates" options={['Tous les jours']} />
      <Checkbox label="Démo" />
      <Checkbox label="Favoris" />
    </>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <div className="flex flex-row gap-1">
      <input
        type="checkbox"
        className="h-5 w-5 appearance-none rounded border border-theme-8 checked:text-theme-2"
      />
      <span className="text-base font-medium text-theme-2">{label}</span>
    </div>
  );
}

function Item({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="flex grow flex-col items-start gap-1 self-stretch">
      <span className="text-base font-semibold text-theme-1">{label}</span>
      <Select options={options} />
    </div>
  );
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="flex items-center justify-center self-stretch rounded-2xl border border-[#D9E0EB] bg-white px-4 py-3">
      {options.map((opt, idx) => (
        <option key={idx}>{opt}</option>
      ))}
    </select>
  );
}
