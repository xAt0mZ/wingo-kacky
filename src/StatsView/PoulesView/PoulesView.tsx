import { Tab } from '@headlessui/react';

import { useCurrentSeason } from '@/hooks/useCurrentSeason';

import { Filters } from './Filters';
import { displayByDay } from './Filters/options';
import {
  MapsFiltersProvider,
  Filters as PoulesFilters,
} from './Filters/usePoulesFilters';
import { PoulesChart } from './PoulesChart';

export function PoulesView() {
  const { data, isLoading } = useCurrentSeason();

  if (!data || isLoading) {
    return null;
  }
  const initialValues: PoulesFilters = {
    season: { item: data.season, name: data.season.name },
    displayBy: displayByDay,
    pet: true,
    poule: true,
    shake: true,
    total: true,
  };
  return (
    // <div className="flex grow flex-col gap-4"></div>
    // <Tab.Panel className="flex grow flex-col items-center justify-center gap-10">
    <Tab.Panel className="flex grow flex-col gap-4">
      <MapsFiltersProvider initialValues={initialValues}>
        <Filters />
        <PoulesChart />
      </MapsFiltersProvider>
    </Tab.Panel>
  );
}
