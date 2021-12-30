import { chain, concat, transform } from 'lodash';
import { createContext, Dispatch, PropsWithChildren, ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import { get } from '../api';
import { ALL_DAYS, Edition, Streamer } from '../models/consts';
import { extractMaps, TMMap } from '../models/map';

type StreamerDictionary = {
  maps: TMMap[],
  dates: string[]
}

type EditionDictionary = {
  [s in Streamer]: StreamerDictionary
}

type MapsDictionary = {
  [e in Edition]: EditionDictionary
}

type Data = {
  maps?: MapsDictionary;
};

type Filters = {
  selectedEdition: Edition;
  selectedStreamer: Streamer;
  selectedDate: string;
  orderByFinishDate: boolean;
  selectedMap?: TMMap;
};

type Action =
  | { type: 'selectEdition', payload: Edition }
  | { type: 'selectStreamer', payload: Streamer }
  | { type: 'selectDate', payload: string }
  | { type: 'orderByFinishDate', payload: boolean }
  | { type: 'selectMap', payload: TMMap };

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
    case 'selectMap':
      return { ...state, selectedMap: action.payload };
    default:
      throw new Error('unknown action type');
  }
}

function computeDates(maps: MapsDictionary) {
  for (const edition in maps) {
    const streamers = maps[edition as Edition];
    for (const streamer in streamers) {
      const s = streamers[streamer as Streamer];
      if (!s) continue;
      const dates = chain(s.maps)
        .filter({ finished: true })
        .sortBy('date.date')
        .map(m => m.date?.localeDateString || 'aa')
        .uniq()
        .without('')
        .value();
        s.dates = concat([ALL_DAYS], ...dates);
    }
  }
}

function groupMaps(maps: TMMap[]) {
  return transform(maps, (r, v) => {
    const e = (r[v.edition] || (r[v.edition] = {} as EditionDictionary));
    const s = (e[v.streamer] || (e[v.streamer] = {} as StreamerDictionary));
    (s.maps || (s.maps = [])).push(v);
  }, {} as MapsDictionary);
}

const initialState: Filters = {
  selectedEdition: Edition.K7,
  selectedStreamer: Streamer.WINGO,
  selectedDate: ALL_DAYS,
  orderByFinishDate: false
}

export function GlobalStateProvider({ children }: PropsWithChildren<unknown>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [data, setData] = useState<Data | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await get();
        const allMaps = extractMaps(res.data);
        const maps = groupMaps(allMaps);
        computeDates(maps);
        setData({ maps });

        dispatch({ type: 'selectEdition', payload: Edition.K7 });
        dispatch({ type: 'selectStreamer', payload: Streamer.WINGO });
        dispatch({ type: 'selectDate', payload: ALL_DAYS });
      } catch (error) {
        console.error(error)
      }
    })();
  }, [])

  return (
    <Context.Provider value={{ ...state, ...data, dispatch }}>
      {children}
    </Context.Provider>
  );
};

type ContextType = Data & Filters & {
  dispatch: Dispatch<Action>;
};

const Context = createContext<ContextType | undefined>(undefined);

export function useGlobalState() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useGlobalState must be used within GlobalStateProvider");
  }
  return ctx;
}
