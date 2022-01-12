import { PropsWithChildren } from 'react';

import { EditionMap } from '../models/editionMap';
import { Poule } from '../models/poule';

import { GlobalStateProvider } from './useGlobalState';
import { MapsFiltersProvider } from './useMapsFilters';
import { PoulesProvider } from './usePoules';

interface Props {
  maps: EditionMap;
  poules: Poule[];
}

export function Providers({ maps, poules, children }: PropsWithChildren<Props>) {
  return (
    <GlobalStateProvider maps={maps}>
      <PoulesProvider poules={poules}>
        <MapsFiltersProvider>
          {children}
        </MapsFiltersProvider>
      </PoulesProvider>
    </GlobalStateProvider>
  );
}
