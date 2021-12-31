import { chain, concat, filter, orderBy } from 'lodash';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { get } from '../api';
import { ErrorScreen } from '../error';
import { LoadingScreen } from '../loading';
import { ALL_DAYS, Edition, Streamer } from '../models/consts';
import { extractMaps, TMMap } from '../models/map';

type Filters = {
  selectedEdition: Edition;
  selectedStreamer: Streamer;
  selectedDate: string;
  orderByFinishDate: boolean;
};

const initialFilters: Filters = {
  selectedEdition: Edition.K7,
  selectedStreamer: Streamer.WINGO,
  selectedDate: ALL_DAYS,
  orderByFinishDate: false
}

type Action =
  | { type: 'selectEdition', payload: Edition }
  | { type: 'selectStreamer', payload: Streamer }
  | { type: 'selectDate', payload: string }
  | { type: 'orderByFinishDate', payload: boolean };

function reducer(state: Filters, action: Action): Filters {
  switch (action.type) {
    case 'selectEdition':
      return { ...state, selectedEdition: action.payload };
    case 'selectStreamer':
      return { ...state, selectedStreamer: action.payload };
    case 'selectDate':
      return { ...state, selectedDate: action.payload };
    case 'orderByFinishDate':
      return { ...state, orderByFinishDate: action.payload };
    default:
      throw new Error('unknown action type');
  }
}

type DynamicState = {
  maps: TMMap[] | null;
  finishedMapsCount: number;
  totalMapsCount: number;
  streamers: Streamer[];
  dates: string[];
  filters: Filters;
}

type StaticState = {
  dispatchFilterChange: Dispatch<Action>;
  setSelectedMap: Dispatch<SetStateAction<TMMap | null>>;
}

type State = StaticState & DynamicState & {
  selectedMap: TMMap | null;
}

const Context = createContext<State | null>(null);

export function useGlobalState() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  }
  return ctx;
}

export function GlobalStateProvider({ children }: PropsWithChildren<unknown>) {
  const [allMaps, setAllMaps] = useState<TMMap[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [selectedMap, setSelectedMap] = useState<TMMap | null>(null);
  const [filters, dispatchFilterChange] = useReducer(reducer, initialFilters);

  useEffect(() => {
    (async () => {
      try {
        const res = await get();
        const allMaps = extractMaps(res.data);
        setAllMaps(allMaps);

      } catch (error) {
        console.error(error);
        setError(error as Error);
      }
    })();
  }, []);

  const staticState = useMemo(
    (): StaticState => ({ dispatchFilterChange, setSelectedMap }),
    []
  );

  const dynamicState = useMemo(
    (): DynamicState => {
      const [mapSubset, maps] = filterAndOrderMaps(allMaps, filters);
      const dates = concat(
        [ALL_DAYS],
        chain(mapSubset)
          .filter({ finished: true })
          .sortBy('date.date')
          .map(m => m.date?.localeDateString || '')
          .uniq().without('')
          .value()
      );
      const streamers = chain(allMaps).filter({ edition: filters.selectedEdition }).map('streamer').uniq().value();
      const finishedMapsCount = mapSubset.filter(m => m.finished).length;
      const totalMapsCount = mapSubset.length;

      return { maps, finishedMapsCount, totalMapsCount, streamers, dates, filters };
    },
    [allMaps, filters]
  );

  if (!!error) {
    return <ErrorScreen />
  }

  if (!!!allMaps) {
    return <LoadingScreen />
  }

  return (
    <Context.Provider value={{ ...staticState, selectedMap, ...dynamicState }}>
      {children}
    </Context.Provider>
  );
};

function filterAndOrderMaps(allMaps: TMMap[] | undefined, filters: Filters) : [TMMap[], TMMap[]] {
  const mapSubset = filter(allMaps, { edition: filters.selectedEdition, streamer: filters.selectedStreamer });
  let maps = mapSubset;

  if (filters.orderByFinishDate) {
    maps = orderBy(maps, 'date.date');
  }
  if (filters.selectedDate !== ALL_DAYS) {
    maps = filter(maps, (m) => m.finished && m.date?.localeDateString === filters.selectedDate);
  }
  return [mapSubset, maps];
}