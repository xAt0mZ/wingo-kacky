import { useCurrentSeason } from '@/hooks/useCurrentSeason';

import { ProgressBar } from './ProgressBar';

export function RankCard() {
  const { data, isLoading } = useCurrentSeason();

  if (isLoading || !data) {
    return null;
  }

  const {
    rank: { image, name, start, end, next },
    season: { maps },
  } = data;

  const value = maps?.filter((m) => m.validated).length || 0;

  return (
    <div className="relative h-full">
      <img
        width={176}
        height={108}
        className="drop-shadow-theme-4/50 absolute drop-shadow-lg"
        src={image}
      />
      <div className="h-full shrink-0">
        <div className="h-6" />
        <div className="bg-theme-6 flex h-[calc(100%-1.5rem)] shrink-0 flex-col items-stretch rounded-2xl p-4">
          <div className="h-[68px]" />
          <div className="flex h-full flex-row items-stretch justify-between">
            <div className="flex grow flex-col justify-end">
              <span className="text-theme-2 text-2xl font-bold">{name}</span>
              <span className="text-theme-3 text-sm font-normal">
                Prochain rang {next}
              </span>
            </div>
            <div className="flex grow items-end pl-2">
              <ProgressBar min={start} max={end} value={value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
