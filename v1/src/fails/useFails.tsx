import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { Fail } from './fails.types';

type State = {
  fails: Fail[];
};

const Context = createContext<State | null>(null);

export function useFails() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useFails must be used within FailsProvider');
  }
  return ctx;
}

export function FailsProvider({ fails, children }: PropsWithChildren<{ fails: Fail[] }>) {
  const state = useMemo((): State => ({ fails }), [fails]);

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
