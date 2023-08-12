import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { maps } from 'MapsView/mock';
import { TMMap } from 'api/types';
import { useModalContext } from 'components/Modal';
import { Select } from 'components/Select';

type Props = {
  map: TMMap;
};

export function MapDetails({ map: { number, video } }: Props) {
  return (
    <>
      <Header number={number} />
      <div className="flex h-full w-full flex-col items-stretch gap-6 bg-theme-6 p-4 text-theme-2">
        <div className="flex items-start justify-between rounded-lg bg-theme-7 p-4 shadow-md">
          <span className="text-base font-semibold">Dans X minutes</span>
          <span className="text-base font-medium text-theme-4">Serveur 7</span>
        </div>
        <div className="flex flex-col items-stretch gap-4">
          <span className="text-base font-semibold">Clip de démo</span>
          <div className="flex flex-col items-start rounded-2xl bg-theme-7 p-3 shadow-md">
            <VideoPlayer url={video} />
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">Leaderboard</span>
            <div className="flex items-center gap-1.5 text-theme-4">
              <FlagIcon className="h-4 w-4" />
              <span className="text-base font-medium">90 finish</span>
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-4 rounded-2xl bg-theme-7 p-4 shadow-md">
            <LeaderboardItem />
            <LeaderboardItem />
          </div>
        </div>
      </div>
    </>
  );
}

function LeaderboardItem() {
  return (
    <div className="flex items-stretch justify-between text-base font-medium">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-theme-2 text-xl font-normal text-theme-7 shadow">
          1
        </span>
        <span className="w-32 truncate">Super long name that will be cut</span>
      </div>
      <span className="inline-flex items-center">00:11.162</span>
      <span className="inline-flex items-center">10 september 2023</span>
    </div>
  );
}

function Header({ number }: { number: number }) {
  const { hide } = useModalContext();
  return (
    <div className="flex w-full items-center justify-between rounded-t-3xl bg-theme-7 p-4 text-theme-2 sm:px-20">
      <span className="text-3xl font-semibold">{number}</span>
      <div className="hidden sm:block">
        <Controller />
      </div>
      <button onClick={hide} className="flex content-center items-center gap-1">
        <XMarkIcon className="h-8 w-8" />
      </button>
    </div>
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

// for the aspect ratio trick
// see https://www.w3schools.com/howto/howto_css_responsive_iframes.asp
type VideoPlayerProps = {
  url?: string;
};
function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="relative w-full overflow-hidden pt-[56.25%]">
      {url && (
        <iframe
          className="absolute inset-0 h-full w-full rounded-lg"
          title="Map clip"
          src={url}
          allowFullScreen
        />
      )}
    </div>
  );
}
