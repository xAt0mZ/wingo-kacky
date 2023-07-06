import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

type Filters = {
  finished: boolean;
  firstToFinish: boolean;
  hasDemoClip: boolean;
  notFinished: boolean;
  trolled: boolean;
  starred: boolean;
}

const initialFilters: Filters = {
  finished: false,
  firstToFinish: false,
  hasDemoClip: false,
  notFinished: false,
  trolled: false,
  starred: false,
}

type State = {
  filters: Filters;
  updateFilters: (value: Partial<Filters>) => void
}

const Context = createContext<State | null>(null);

export function useMapsFilters() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  }
  return ctx;
}

export function MapsFiltersProvider({ children }: PropsWithChildren<unknown>) {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const updateFilters = useCallback((value: Partial<Filters>) => {
    setFilters({ ...filters, ...value });
  }, [filters])

  const state = useMemo(() => ({ filters, updateFilters }), [filters, updateFilters]);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};
