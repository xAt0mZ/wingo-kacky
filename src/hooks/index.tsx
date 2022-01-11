import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { EditionMap } from '../models/editionMap';
import { Poule } from '../models/poule';

import { GlobalStateProvider } from './useGlobalState';
import { MapsFiltersProvider } from './useMapsFilters';
import { PoulesProvider } from './usePoules';

const queryClient = new QueryClient();

interface Props {
  maps: EditionMap;
  poules: Poule[];
}

export function Providers({ maps, poules, children }: PropsWithChildren<Props>) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider maps={maps}>
        <PoulesProvider poules={poules}>
          <MapsFiltersProvider>
            {children}
          </MapsFiltersProvider>
        </PoulesProvider>
      </GlobalStateProvider>
    </QueryClientProvider>
  );
}
