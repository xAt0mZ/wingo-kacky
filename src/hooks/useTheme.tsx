import { createContext, PropsWithChildren, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

function useThemeLocal() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultDark ? 'dark' : 'light');
  const [colorblind, setColorblind] = useLocalStorage<boolean>('colorblind', false);

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

  return <Context.Provider value={state}> {children} </Context.Provider>;
}
