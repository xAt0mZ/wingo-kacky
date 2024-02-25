import { differenceInCalendarDays, isBefore } from 'date-fns';

import { useCurrentSeason } from '@/hooks/useCurrentSeason';

import { ProgressCircle } from './ProgressCircle';

export function CurrentEditionCard() {
  const { data, isLoading } = useCurrentSeason();

  if (!data || isLoading) {
    return null;
  }

  const {
    season: { name, startAt, endAt, game },
    ended,
  } = data;

  const started = isBefore(new Date(startAt), new Date());

  let totalDays, remainingDays: number;

  if (started) {
    totalDays = differenceInCalendarDays(new Date(endAt), new Date(startAt));
    remainingDays = differenceInCalendarDays(new Date(endAt), new Date());
  } else {
    totalDays = differenceInCalendarDays(new Date(startAt), new Date());
    remainingDays = totalDays;
  }
  const progress = Math.round((remainingDays / totalDays) * 100);

  return (
    <div className="flex h-full flex-row items-end justify-between gap-2.5 rounded-2xl bg-theme-5 p-4">
      {!started && (
        <>
          <div className="flex flex-col items-start justify-end gap-1">
            <div className="text-sm font-medium text-theme-3">
              Prochaine édition
            </div>
            <div className="text-lg font-bold text-theme-2">{name}</div>
            <div className="inline-flex items-start justify-start gap-2.5 rounded border border-theme-8 bg-theme-7 px-1 py-0.5 dark:border-theme-3">
              <div className="text-[10px] font-medium text-theme-2">{game}</div>
            </div>
          </div>
          <ProgressCircle progress={progress} displayed={remainingDays} />
        </>
      )}
      {started && !ended && (
        <>
          <div className="flex flex-col items-start justify-end gap-1">
            <div className="text-sm font-medium text-theme-3">En cours</div>
            <div className="text-lg font-bold text-theme-2">{name}</div>
            <div className="inline-flex items-start justify-start gap-2.5 rounded border border-theme-8 bg-theme-7 px-1 py-0.5 dark:border-theme-3">
              <div className="text-[10px] font-medium text-theme-2">{game}</div>
            </div>
          </div>
          <ProgressCircle progress={progress} displayed={remainingDays} />
        </>
      )}
      {ended && (
        <>
          <div className="flex flex-col items-start justify-end gap-1">
            <div className="text-lg font-bold text-theme-2">
              Pas d&apos;événement en cours
            </div>
          </div>
          <div className="pb-2 pt-4">
            <div className="h-[100px] w-[100px]" />
          </div>
        </>
      )}
    </div>
  );
}
