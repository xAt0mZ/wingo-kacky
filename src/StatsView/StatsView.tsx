import { Header } from '@/components/Header';

import { WIPPanel } from '../components/WipPanel';

export function StatsView() {
  return (
    <>
      <Header title="Statistiques" />
      <div className="flex grow items-center justify-center">
        <WIPPanel />
      </div>
    </>
  );
}
