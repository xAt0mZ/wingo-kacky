import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { maps } from 'MapsView/mock';
import { TMMap } from 'api/types';
import { useModalContext } from 'components/Modal';
import { Select } from 'components/Select';

type Props = {
  map: TMMap;
};

export function MapDetails({ map: { number } }: Props) {
  const { hide } = useModalContext();
  return (
    <>
      <div className="flex w-full items-center justify-between rounded-t-3xl bg-theme-7 px-20 py-4 text-theme-2">
        <span className="text-3xl font-semibold">{number}</span>
        <div className="hidden sm:block">
          <Controller />
        </div>
        <button
          onClick={hide}
          className="flex content-center items-center gap-1"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
      <div className="flex h-full w-full items-center justify-between bg-theme-6 text-white"></div>
    </>
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
