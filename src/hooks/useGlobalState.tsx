import { chain, filter, includes } from 'lodash';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';

import { ErrorScreen } from '../components/Error';
import { ALL_DAYS, DEFAULT_EDITION, Edition, Streamer } from '../models/consts';
import { EditionMap } from '../models/editionMap';
import { TMMap } from '../models/map';

type Filters = {
  selectedEdition: Edition;
  selectedStreamer: Streamer;
  selectedDate: string;
  orderByFinishDate: boolean;
};

const initialFilters: Filters = {
  selectedEdition: DEFAULT_EDITION,
  selectedStreamer: Streamer.WINGO,
  selectedDate: ALL_DAYS,
  orderByFinishDate: false
}

type Action =
  | { type: 'selectEdition', payload: Edition }
  | { type: 'selectStreamer', payload: Streamer }
  | { type: 'selectDate', payload: string }
  | { type: 'orderByFinishDate', payload: boolean };

type State = {
  allMaps: EditionMap;
  filters: Filters;
  maps: TMMap[];
  finishedMapsCount: number;
  totalMapsCount: number;
  streamers: Streamer[];
  dates: string[];
  selectedMap: TMMap | null;
  dispatchFilterChange: Dispatch<Action>;
  setSelectedMap: Dispatch<SetStateAction<TMMap | null>>;
}

const Context = createContext<State | null>(null);

export function useGlobalState() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  }
  return ctx;
}

function updateFilters(state: Filters, action: Action): Filters {
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
      return state;
  }
}

export function GlobalStateProvider({ maps, children }: PropsWithChildren<{ maps: EditionMap }>) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [selectedMap, setSelectedMap] = useState<TMMap | null>(null);
  const allMaps = maps;

  const dispatchFilterChange = useCallback(
    (action: Action) => {
      let state = updateFilters(filters, action);

      if (!(state.selectedStreamer in allMaps[state.selectedEdition])) {
        state = updateFilters(state, { type: 'selectStreamer', payload: initialFilters.selectedStreamer });
      }

      if (!includes(allMaps[state.selectedEdition][state.selectedStreamer]?.dates, state.selectedDate)) {
        state = updateFilters(state, { type: 'selectDate', payload: initialFilters.selectedDate });
      }

      setFilters(state);
      if (action.type !== 'orderByFinishDate') {
        setSelectedMap(null);
      }
    },
    [allMaps, filters]
  );

  const state = useMemo((): State | undefined => {
    const { selectedEdition, selectedStreamer, selectedDate, orderByFinishDate } = filters;
    const data = allMaps[selectedEdition][selectedStreamer];

    if (!data) {
      return undefined;
    }

    const { dates, maps: mapSubset } = data;
    const maps = chain(mapSubset)
      .orderBy(orderByFinishDate ? 'date.date' : 'id')
      .filter((m) => selectedDate === ALL_DAYS || m.date?.localeDateString === selectedDate)
      .value();

    const finishedMapsCount = filter(mapSubset, { finished: true }).length;
    const totalMapsCount = mapSubset.length;

    const streamers = Object.keys(allMaps[selectedEdition]) as Streamer[];

    return { allMaps, filters, maps, dates, finishedMapsCount, totalMapsCount, streamers, dispatchFilterChange, setSelectedMap, selectedMap }
  }, [allMaps, dispatchFilterChange, filters, selectedMap]);

  if (!state) {
    return (
      <ErrorScreen />
    )
  }

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};
