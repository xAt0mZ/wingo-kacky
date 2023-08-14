import { createContext, PropsWithChildren, useContext, useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

function useThemeLocal() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setThemeInStorage] = useLocalStorage<Theme>(
    'theme',
    defaultDark ? 'dark' : 'light',
  );
  const [colorblind, setColorblindInStorage] = useLocalStorage<boolean>(
    'colorblind',
    false,
  );

  function setTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
    setThemeInStorage(theme);
  }

  function setColorblind(colorblind: boolean) {
    document.documentElement.setAttribute(
      'data-colorblind',
      String(colorblind),
    );
    setColorblindInStorage(colorblind);
  }

  return { theme, setTheme, colorblind, setColorblind };
}

interface State {
  theme: Theme;
  setTheme(value: Theme): void;
  colorblind: boolean;
  setColorblind(value: boolean): void;
}

const Context = createContext<State | null>(null);

export function useTheme() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error('Should be inside a ThemeProvider component');
  }
  return context;
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const state = useThemeLocal();

  useEffect(() => {
    state.setTheme(state.theme);
    state.setColorblind(state.colorblind);
  }, [state]);

  return <Context.Provider value={state}> {children} </Context.Provider>;
}
