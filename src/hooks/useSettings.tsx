import { createContext, PropsWithChildren, useContext, useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

function useSettingsLocal() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setThemeInStorage] = useLocalStorage<Theme>(
    'theme',
    defaultDark ? 'dark' : 'light',
  );
  const [colorblind, setColorblindInStorage] = useLocalStorage<boolean>(
    'colorblind',
    false,
  );

  const [muted, setMuted] = useLocalStorage<boolean>('muted', false);

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

  return { theme, setTheme, colorblind, setColorblind, muted, setMuted };
}

interface State {
  theme: Theme;
  setTheme(value: Theme): void;
  colorblind: boolean;
  setColorblind(value: boolean): void;
  muted: boolean;
  setMuted(value: boolean): void;
  lightMode: boolean;
}

const Context = createContext<State | null>(null);

export function useSettings() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error('Should be used inside a SettingsProvider component');
  }
  return context;
}

export function SettingsProvider({ children }: PropsWithChildren) {
  const state = useSettingsLocal();

  useEffect(() => {
    state.setTheme(state.theme);
    state.setColorblind(state.colorblind);
    state.setMuted(state.muted);
  }, [state]);

  return (
    <Context.Provider value={{ ...state, lightMode: state.theme === 'light' }}>
      {children}
    </Context.Provider>
  );
}
