import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { Poule } from './poules.types';

type State = {
  poules: Poule[];
}

const Context = createContext<State | null>(null);

export function usePoules() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("usePoules must be used within PoulesProvider");
  }
  return ctx;
}

export function PoulesProvider({ poules, children }: PropsWithChildren<{ poules: Poule[] }>) {

  const state = useMemo((): State => ({ poules }), [poules]);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};
