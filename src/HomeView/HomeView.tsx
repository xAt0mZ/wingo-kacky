import { ExplanationCard } from './ExplanationCard';
import { FinishedMapsSummaryCard } from './FinishedMapsSummaryCard';
import { CurrentEditionCard } from './CurrentEditionCard';
import { RankCard } from './RankCard';
import { RecentlyFinishedMapsCard } from './RecentlyFinishedMapsCard';
import { UpcomingMapsCard } from './UpcomingMapsCard';

export function HomeView() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-home-md">
      <div className="md:col-span-1 md:row-span-2">
        <FinishedMapsSummaryCard finished={7} total={75} gainedRank={false} top={32} />
      </div>
      <div className="md:col-span-1">
        <RankCard />
      </div>
      <div className="md:col-span-1">
        <CurrentEditionCard />
      </div>
      <div className="md:col-span-2">
        <ExplanationCard />
      </div>
      <div className="md:col-span-2">
        <RecentlyFinishedMapsCard />
      </div>
      <div className="md:col-span-2">
        <UpcomingMapsCard />
      </div>
    </div>
  );
}
