import carImage from './car.png';
import { ProgressBar } from './ProgressBar';

type Rank = {
  name: string;
  min: number;
  max: number;
  image: string;
};

function newRank(name: string, min: number, max: number, image: string): Rank {
  return {
    name,
    min,
    max,
    image,
  };
}

const ranks: Rank[] = [
  newRank('Plastique', 0, 10, carImage),
  newRank('Bronze', 10, 25, carImage),
  newRank('Argent', 25, 50, carImage),
  newRank('Or', 50, 65, carImage),
  newRank('Légende', 65, 75, carImage),
];

export function RankCard() {
  const value = 12;
  const { name, image, min, max } =
    ranks.find((r) => r.min <= value && value < r.max) ||
    newRank('Inconnu', 0, 0, carImage);

  return (
    <div className="relative h-full">
      <img width={176} height={108} className="absolute" src={image} />
      <div className="h-full shrink-0">
        <div className="h-6" />
        <div className="flex h-[calc(100%-1.5rem)] shrink-0 flex-col items-stretch rounded-2xl bg-theme-6 p-4">
          <div className="h-[68px]" />
          <div className="flex h-full flex-row items-stretch justify-between">
            <div className="flex grow flex-col justify-end">
              <span className="text-sm font-normal text-theme-3">
                Prochain rang
              </span>
              <span className="text-base font-bold text-theme-2">{name}</span>
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
