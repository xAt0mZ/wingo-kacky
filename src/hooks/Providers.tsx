import { PropsWithChildren } from 'react';

import { TMMap } from '../models/map';
import { Poule, PoulesProvider } from '../poules';

import { GlobalStateProvider } from './useGlobalState';
import { MapsFiltersProvider } from './useMapsFilters';


interface Props {
  maps: TMMap[];
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
