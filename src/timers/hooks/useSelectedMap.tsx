import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import { TMMap } from '../../models/map';

type State = {
  selectedMap?: TMMap;
  setSelectedMap: (value: TMMap) => void
}

const Context = createContext<State | null>(null);

export function useSelectedMap() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useSelectedMap must be used within SelectedMapProvider");
  }
  return ctx;
}

export function SelectedMapProvider({ children }: PropsWithChildren<unknown>) {
  const [selectedMap, setSelectedMap] = useState<TMMap | undefined>(undefined);

  const state: State = useMemo(() => ({ selectedMap, setSelectedMap }), [selectedMap]);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};
