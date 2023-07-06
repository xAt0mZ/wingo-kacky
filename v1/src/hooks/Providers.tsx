import { PropsWithChildren } from 'react';

import { TMMap } from '../models/map';
import { Poule, PoulesProvider } from '../poules';
import { Fail,FailsProvider } from '../fails';

import { GlobalStateProvider } from './useGlobalState';
import { MapsFiltersProvider } from './useMapsFilters';

interface Props {
  maps: TMMap[];
  poules: Poule[];
  fails: Fail[];
}

export function Providers({ maps, poules, fails, children }: PropsWithChildren<Props>) {
  return (
    <GlobalStateProvider maps={maps}>
      <PoulesProvider poules={poules}>
        <FailsProvider fails={fails}>
          <MapsFiltersProvider>{children}</MapsFiltersProvider>
        </FailsProvider>
      </PoulesProvider>
    </GlobalStateProvider>
  );
}
