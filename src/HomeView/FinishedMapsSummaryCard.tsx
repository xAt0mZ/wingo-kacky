import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

type Props = {
  finished: number;
  total: number;
  top: number;
  gainedRank: boolean;
};

export function FinishedMapsSummaryCard({ finished, total, top, gainedRank }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl bg-gray-light px-4 py-6">
      <div className="flex flex-col items-center gap-2">
        <div>
          <span className="text-center text-4xl font-bold text-purple-blue">{finished}</span>
          <span className="text-center align-top text-base font-normal text-purple-blue opacity-50">/{total}</span>
        </div>
        <div className="text-center text-lg font-bold text-purple-blue">cartes terminées</div>
        <div className="inline-flex items-center justify-start gap-2.5 rounded-2xl border border-gray-medium bg-white px-4 py-2">
          <div className="text-base font-medium text-purple-blue">Top {top}</div>
          {gainedRank && <ArrowTrendingUpIcon className="h-4 w-4 text-green" />}
          {!gainedRank && <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />}
        </div>
      </div>
      <button className="flex flex-row items-center justify-center gap-2 self-stretch rounded-lg bg-purple px-6 py-3.5">
        <ChevronRightIcon className="h-4 w-4 text-white" />
        <span className="text-base font-medium text-white">Voir le détails</span>
      </button>
    </div>
  );
}
