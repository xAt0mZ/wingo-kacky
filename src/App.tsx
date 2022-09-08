import { useEffect, useState } from 'react';

import { Header } from './components/header';
import { get } from './api';
import { extractMaps } from './clips/clips.service';
import { ErrorScreen } from './components/Error';
import { LoadingScreen } from './components/Loading';
import { TabsPanel } from './components/TabsPanel';
import { VStack } from './components/VStack';
import { Providers } from './hooks';
import { Poule } from './poules/poules.types';
import { extractPoules } from './poules/poules.service';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TMMap } from './models/map';

export function App() {
  const [maps, setAllMaps] = useState<TMMap[] | undefined>(undefined);
  const [poules, setPoules] = useState<Poule[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'Sombre' : 'Clair');

  useEffect(() => {
    (async () => {
      try {
        const res = await get();
        setAllMaps(extractMaps(res.data));
        setPoules(extractPoules(res.data));
      } catch (error) {
        setError(error as Error);
      }
    })();
  }, []);

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <div className="root" data-theme={theme}>
      {(!maps || !poules) && <LoadingScreen />}
      {maps && poules && (
        <Providers maps={maps} poules={poules}>
          <VStack className="gap-3" style={{ minHeight: '100vh' }}>
            <Header theme={theme} setTheme={setTheme} />
            <TabsPanel />
          </VStack>
        </Providers>
      )}
    </div>
  );
}
