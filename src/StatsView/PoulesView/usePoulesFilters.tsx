import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { SeasonSummary } from '@/api/types';
import { Option } from '@/components/Select';

export type DisplayBy = 'day' | 'hour';
export type Filters = {
  season: Option<SeasonSummary>;
  displayBy: Option<DisplayBy>;
  poule: boolean;
  pet: boolean;
  shake: boolean;
  total: boolean;
};

type State = {
  filters: Filters;
  dispatch: Dispatch<Action>;
};

const Context = createContext<State | null>(null);

export function usePoulesFilter() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('usePoulesFilter should be inside PoulesFiltersProvider');
  }
  return ctx;
}

type Actionize<T extends object> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

type Action = Actionize<Filters>;

function updateFilters(state: Filters, [key, value]: Action): Filters {
  return { ...state, [key]: value };
}

export function PoulesFiltersProvider({
  children,
  initialValues,
}: PropsWithChildren<{ initialValues: Filters }>) {
  const [filters, dispatch] = useReducer(updateFilters, initialValues);

  const state: State = useMemo(
    () => ({
      filters,
      dispatch,
    }),
    [dispatch, filters],
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
