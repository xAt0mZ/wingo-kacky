import { CSSProperties } from 'react';

// https://stackoverflow.com/a/42110995
// minAllowed = 0 | maxAllowed = 100
function getPercent(currentNum: number, min: number, max: number) {
  return (100 * (currentNum - min)) / (max - min);
  // return ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed;
}

// calculation derivated from getPercent function
// trying to get the left offset of the thumb
// minAllowed = 0 | maxAllowed = 100
// min = 0 | max = 160 (bar width - thumb width = 192 - 32)
//
// percent = ((maxAllowed - minAllowed) * (currentNum - min)) / (max - min) + minAllowed
// percent = (100 * (x - min)) / (max - min)
// percent * (max - min) = 100 * (x - min)
// x - min = (percent * (max - min)) / 100
// x = (percent * (max - min)) / 100 + min
function getOffset(percent: number, min: number, max: number) {
  return (percent * (max - min)) / 100 + min;
}

type Props = {
  min: number;
  max: number;
  value: number;
};

export function ProgressBar({ min, max, value }: Props) {
  const percent = Math.round(getPercent(value, min, max));
  const thumbOffset = getOffset(percent, 0, 160);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="relative pt-2">
        <div
          className="h-4 w-48 rounded-full bg-gradient-to-r from-purple to-gray-medium"
          style={
            {
              '--tw-gradient-stops': `var(--tw-gradient-from) 0%, var(--tw-gradient-from) ${percent}%, var(--tw-gradient-to) ${percent}%, var(--tw-gradient-to) 100%`,
            } as CSSProperties
          }
        />
        <div
          className="absolute top-0 flex h-8 w-8 items-center justify-center rounded-full bg-purple text-center text-lg text-white"
          style={{ filter: 'drop-shadow(-1px 1px 3px rgba(17, 0, 124, 0.35))', left: `${thumbOffset}px` }}
        >
          {value}
        </div>
      </div>
      <span className="text-xl font-semibold text-purple-blue">{max}</span>
    </div>
  );
}
