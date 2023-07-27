import { ProgressCircle } from './ProgressCircle';

export function CurrentEditionCard() {
  const edition = 'Kacky Reloaded';
  const gameVersion = 'Trackmania 2020';
  return (
    <div className="flex h-full flex-row items-end justify-between gap-2.5 rounded-2xl bg-gray-gold p-4">
      <div className="flex flex-col items-start justify-end gap-1">
        <div className="text-sm font-medium text-gray-dark">En cours</div>
        <div className="text-lg font-bold text-purple-blue">{edition}</div>
        <div className="inline-flex items-start justify-start gap-2.5 rounded border border-gray-medium bg-white px-1 py-0.5">
          <div className="text-[10px] font-medium text-purple-blue">{gameVersion}</div>
        </div>
      </div>
      <ProgressCircle progress={75} />
    </div>
  );
}
