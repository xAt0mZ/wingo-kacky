import { Tab } from '@headlessui/react';

import { useCurrentSeason } from '@/hooks/useCurrentSeason';

import { Filters } from './Filters';
import { displayByDay } from './options';
import {
  PoulesFiltersProvider,
  Filters as PoulesFilters,
} from './usePoulesFilters';
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
    <Tab.Panel className="flex grow flex-col gap-4">
      <PoulesFiltersProvider initialValues={initialValues}>
        <Filters />
        <PoulesChart />
      </PoulesFiltersProvider>
    </Tab.Panel>
  );
}
