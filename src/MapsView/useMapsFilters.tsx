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

export type OrderBy = 'number' | 'date';
export type Status = 'all' | 'finished' | 'unfinished' | 'first';
export type Filters = {
  season: Option<SeasonSummary>;
  orderBy: Option<OrderBy>;
  status: Option<Status>;
  date: Option<Date | undefined>;
  demo: boolean;
  fav: boolean;
};

type State = {
  filters: Filters;
  dispatch: Dispatch<Action>;
};

const Context = createContext<State | null>(null);

export function useMapsFilters() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useMapsFilters inside FiltersProvider');
  }
  return ctx;
}

type Action =
  | { type: 'season'; payload: Filters['season'] }
  | { type: 'orderBy'; payload: Filters['orderBy'] }
  | { type: 'status'; payload: Filters['status'] }
  | { type: 'date'; payload: Filters['date'] }
  | { type: 'demo'; payload: Filters['demo'] }
  | { type: 'fav'; payload: Filters['fav'] };

function updateFilters(state: Filters, action: Action): Filters {
  switch (action.type) {
    case 'season':
      return { ...state, season: action.payload };
    case 'orderBy':
      return { ...state, orderBy: action.payload };
    case 'status':
      return { ...state, status: action.payload };
    case 'date':
      return { ...state, date: action.payload };
    case 'demo':
      return { ...state, demo: action.payload };
    case 'fav':
      return { ...state, fav: action.payload };
    default:
      return state;
  }
}

export function MapsFiltersProvider({
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
