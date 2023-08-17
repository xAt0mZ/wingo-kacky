import { useCurrentSeason } from '@/hooks/useCurrentSeason';

import { ProgressBar } from './ProgressBar';

export function RankCard() {
  const { data, isLoading } = useCurrentSeason();

  if (isLoading || !data) {
    return null;
  }

  const {
    rank: { image, name, start, end },
    season: { maps },
  } = data;

  const value = maps?.filter((m) => m.validated).length || 0;

  return (
    <div className="relative h-full">
      <img width={176} height={108} className="absolute" src={image} />
      <div className="h-full shrink-0">
        <div className="h-6" />
        <div className="flex h-[calc(100%-1.5rem)] shrink-0 flex-col items-stretch rounded-2xl bg-theme-6 p-4">
          <div className="h-[68px]" />
          <div className="flex h-full flex-row items-stretch justify-between">
            <div className="flex grow flex-col justify-end">
              <span className="text-2xl font-bold text-theme-2">{name}</span>
              <span className="text-sm font-normal text-theme-3">
                Prochain rang
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
