import { PropsWithChildren, createContext, useContext, useState } from 'react';

import { TMMap } from '@/api/types';

type State = {
  selectedMap: TMMap | undefined;
  setSelectedMap: (v: TMMap | undefined) => void;
  nextMap: TMMap | undefined;
  setNextMap: (v: TMMap | undefined) => void;
  previousMap: TMMap | undefined;
  setPreviousMap: (v: TMMap | undefined) => void;
};

const Context = createContext<State | undefined>(undefined);

export function useSelectedMap() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useSelectedMap');
  }
  return ctx;
}

export function SelectedMapProvider({ children }: PropsWithChildren) {
  const [selectedMap, setSelectedMap] = useState<TMMap | undefined>(undefined);
  const [nextMap, setNextMap] = useState<TMMap | undefined>(undefined);
  const [previousMap, setPreviousMap] = useState<TMMap | undefined>(undefined);

  return (
    <Context.Provider
      value={{
        selectedMap,
        setSelectedMap,
        nextMap,
        setNextMap,
        previousMap,
        setPreviousMap,
      }}
    >
      {children}
    </Context.Provider>
  );
}
