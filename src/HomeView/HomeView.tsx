import { ExplanationCard } from './ExplanationCard';
import { FinishedMapsSummaryCard } from './FinishedMapsSummaryCard';
import { Footer } from './Footer';
import { CurrentEditionCard } from './CurrentEditionCard';
import { RankCard } from './RankCard';
import { RecentlyFinishedMapsCard } from './RecentlyFinishedMapsCard';
import { UpcomingMapsCard } from './UpcomingMapsCard';

export function HomeView() {
  return (
    <>
      <FinishedMapsSummaryCard finished={7} total={75} gainedRank={false} top={32} />
      <RankCard />
      <CurrentEditionCard />
      <ExplanationCard />
      <RecentlyFinishedMapsCard />
      <UpcomingMapsCard />
      <Footer />
    </>
  );
}
