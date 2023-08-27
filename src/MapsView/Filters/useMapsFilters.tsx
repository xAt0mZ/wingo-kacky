import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { Difficulty, SeasonSummary } from '@/api/types';
import { Option } from '@/components/Select';

export type OrderBy = 'number' | 'date' | 'difficulty';
export type Status = 'all' | 'finished' | 'unfinished' | 'first';
export type Filters = {
  season: Option<SeasonSummary>;
  orderBy: Option<OrderBy>;
  status: Option<Status>;
  difficulty: Option<Difficulty>;
  date: Option<Date | undefined>;
  demo: boolean;
  fav: boolean;
  live: boolean;
  showDifficulty: boolean;
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
  | ['season', Filters['season']]
  | ['orderBy', Filters['orderBy']]
  | ['difficulty', Filters['difficulty']]
  | ['status', Filters['status']]
  | ['date', Filters['date']]
  | ['demo', Filters['demo']]
  | ['fav', Filters['fav']]
  | ['live', Filters['live']]
  | ['showDifficulty', Filters['showDifficulty']];

function updateFilters(state: Filters, [type, value]: Action): Filters {
  switch (type) {
    case 'season':
      return { ...state, season: value };
    case 'orderBy':
      return { ...state, orderBy: value };
    case 'status':
      return { ...state, status: value };
    case 'difficulty':
      return { ...state, difficulty: value };
    case 'date':
      return { ...state, date: value };
    case 'demo':
      return { ...state, demo: value };
    case 'fav':
      return { ...state, fav: value };
    case 'live':
      return { ...state, live: value };
    case 'showDifficulty':
      return { ...state, showDifficulty: value };
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
