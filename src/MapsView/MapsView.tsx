import {
  CheckIcon,
  VideoCameraIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Filters } from './Filters';

export function MapsView() {
  return (
    <div className="flex grow flex-col gap-4">
      <Filters />
      <MapsList />
    </div>
  );
}

function MapsList() {
  const maps = Array.from({ length: 75 }, (_, i) => i + 101);
  return (
    <div className="grid grow grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-10">
      {maps.map((m, idx) => (
        <MapCard
          key={idx}
          map={{
            id: m,
            finished: m % 3 === 0,
            clip: m % 4 === 0,
            firstToFinish: m % 15 === 0,
          }}
        />
      ))}
    </div>
  );
}

type Map = {
  id: number;
  finished: boolean;
  clip: boolean;
  firstToFinish: boolean;
};

function MapCard({ map: { id, clip, finished, firstToFinish } }: { map: Map }) {
  const Icon = finished ? CheckIcon : clip ? VideoCameraIcon : XMarkIcon;

  return (
    <div className={clsx('flex shrink-0 flex-col', colStart(id))}>
      <div className='h-12 grow rounded-t-lg bg-[url("https://via.placeholder.com/1920x1080")] bg-cover bg-center bg-no-repeat' />
      <div
        className={clsx(
          'relative rounded-b-lg border-2 px-4 py-1 text-center text-2xl font-bold text-theme-2',
          finished
            ? firstToFinish
              ? 'border-gold'
              : 'border-green'
            : 'border-red'
        )}
      >
        <div
          className={clsx(
            'absolute -left-0.5 -top-0.5 flex h-8 w-8 items-center justify-center rounded-br-xl text-theme-7',
            finished ? (firstToFinish ? 'bg-gold' : 'bg-green') : 'bg-red'
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span>{id}</span>
      </div>
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
