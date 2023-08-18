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
export type Status = 'all' | 'finished' | 'unfinished';
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

// const dates = chain(allMaps)
//   .filter({
//     edition: state.selectedEdition,
//     streamer: state.selectedStreamer,
//   })
//   .map((m) => m.date?.localeDateString || '')
//   .without('')
//   .uniq()
//   .value();
// if (!includes(dates, state.selectedDate)) {
//   state = updateFilters(state, {
//     type: 'selectDate',
//     payload: initialFilters.selectedDate,
//   });
// }

// const difficulties = chain(allMaps)
//   .filter({
//     edition: state.selectedEdition,
//     streamer: state.selectedStreamer,
//   })
//   .map('difficulty')
//   .uniq()
//   .without(MapDifficulty.NONE)
//   .value();
// if (!includes(difficulties, state.selectedDifficulty)) {
//   state = updateFilters(state, {
//     type: 'selectDifficulty',
//     payload: initialFilters.selectedDifficulty,
//   });
// }
