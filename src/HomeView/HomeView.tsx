import { ExplanationCard } from './ExplanationCard';
import { FinishedMapsSummaryCard } from './FinishedMapsSummaryCard';
import { CurrentEditionCard } from './CurrentEditionCard';
import { RankCard } from './RankCard';
import { RecentlyFinishedMapsCard } from './RecentlyFinishedMapsCard';
import { UpcomingMapsCard } from './UpcomingMapsCard';
import clsx from 'clsx';

export function HomeView() {
  return (
    <div
      className={clsx(
        'grid grow grid-cols-1 gap-6',
        'md:grid-cols-2 md:grid-rows-5-auto',
        'lg:grid-cols-3-auto lg:grid-rows-3-auto',
        'xl:grid-cols-7'
      )}
    >
      <div
        className={clsx(
          'md:col-span-1 md:row-span-2',
          'lg:col-span-1 lg:row-span-2',
          'xl:col-span-2'
        )}
      >
        <FinishedMapsSummaryCard
          finished={7}
          total={75}
          gainedRank={false}
          top={32}
        />
      </div>
      <div className="md:col-span-1 xl:col-span-2">
        <RankCard />
      </div>
      <div
        className={clsx(
          'md:col-span-1',
          'lg:col-start-2 lg:row-start-2',
          'xl:col-span-2 xl:col-start-3'
        )}
      >
        <CurrentEditionCard />
      </div>
      <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 xl:col-span-3">
        <ExplanationCard />
      </div>
      <div className="md:col-span-2 xl:col-span-5">
        <RecentlyFinishedMapsCard />
      </div>
      <div className="md:col-span-2 lg:col-span-1 xl:col-span-2">
        <UpcomingMapsCard />
      </div>
    </div>
  );
}
