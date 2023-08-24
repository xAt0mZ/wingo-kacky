import { Header } from '@/components/Header';

import { FinishedChart } from './FinishedChart';

export function StatsView() {
  return (
    <>
      <Header title="Statistiques" />
      <div className="flex grow flex-col items-center justify-center">
        <FinishedChart />
      </div>
    </>
  );
}
