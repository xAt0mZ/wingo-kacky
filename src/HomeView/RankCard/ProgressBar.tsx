import { CSSProperties } from 'react';

// https://stackoverflow.com/a/42110995
// minAllowed = 0 | maxAllowed = 100
function getPercent(currentNum: number, min: number, max: number) {
  return (100 * (currentNum - min)) / (max - min);
  // return ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed;
}

type Props = {
  min: number;
  max: number;
  value: number;
};

export function ProgressBar({ min, max, value }: Props) {
  const percent = Math.round(getPercent(value, min, max));

  return (
    <div className="ml-auto flex w-full max-w-[12rem] flex-col items-end justify-center gap-1">
      <div className="flex w-full items-end pt-2">
        <div
          className="h-4 w-full min-w-[30px] max-w-[12rem] rounded-full bg-gradient-to-r from-theme-4 to-theme-8"
          style={
            {
              '--tw-gradient-stops': `var(--tw-gradient-from) 0%, var(--tw-gradient-from) ${percent}%, var(--tw-gradient-to) ${percent}%, var(--tw-gradient-to) 100%`,
            } as CSSProperties
          }
        >
          <div className="relative mr-8 h-full">
            <div
              className="absolute -top-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-theme-4 text-lg text-theme-7 drop-shadow-[-1px_1px_3px_rgba(17,0,124,0.35)]"
              style={{ left: `${percent}%` }}
            >
              {value}
            </div>
          </div>
        </div>
      </div>
      <span className="text-xl font-semibold text-theme-2">{max}</span>
    </div>
  );
}
