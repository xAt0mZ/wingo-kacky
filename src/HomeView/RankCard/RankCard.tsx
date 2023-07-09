import carImage from './car.png';
import { ProgressBar } from './ProgressBar';

export function RankCard() {
  const min = 0;
  const value = 7;
  const max = 10;
  const rankName = 'Plastique';

  return (
    <div className="relative shrink-0 self-stretch">
      <img width={176} height={107} className="absolute shrink-0" src={carImage} />
      <div className="shrink-0">
        <div className="h-[23px]" />
        <div className="flex shrink-0 items-end gap-2.5 rounded-2xl bg-gray-light p-4">
          <div className="h-[117px]" />
          <div className="flex shrink-0 grow basis-0 flex-row items-end justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-normal text-gray-dark">Prochain rang</span>
              <span className="text-base font-bold text-purple-blue">{rankName}</span>
            </div>
            <ProgressBar min={min} max={max} value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}
