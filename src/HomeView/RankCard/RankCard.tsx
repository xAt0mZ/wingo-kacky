import carImage from './car.png';
import { ProgressBar } from './ProgressBar';

export function RankCard() {
  const min = 0;
  const value = 5;
  const max = 10;
  const rankName = 'Plastique';

  return (
    <div className="relative h-full">
      <img width={176} height={108} className="absolute" src={carImage} />
      <div className="h-full shrink-0">
        <div className="h-6" />
        <div className="flex h-[calc(100%-1.5rem)] shrink-0 flex-col items-stretch rounded-2xl bg-gray-light p-4">
          <div className="h-[68px]" />
          <div className="flex h-full flex-row items-stretch justify-between">
            <div className="flex grow flex-col justify-end">
              <span className="text-sm font-normal text-gray-dark">Prochain rang</span>
              <span className="text-base font-bold text-purple-blue">{rankName}</span>
            </div>
            <div className="flex grow items-end pl-2">
              <ProgressBar min={min} max={max} value={value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
