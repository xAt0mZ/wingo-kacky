import { useEffect, useState } from 'react';

import { Header } from './components/header';
import { GlobalStateProvider } from './hooks/useGlobalState';
import { get } from './api';
import { EditionMap } from './models/editionMap';
import { extractMaps } from './services/map.service';
import { ErrorScreen } from './components/Error';
import { LoadingScreen } from './components/Loading';
import { TabsPanel } from './components/TabsPanel';
import { VStack } from './components/VStack';

export function App() {
  const [maps, setAllMaps] = useState<EditionMap | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await get();
        setAllMaps(extractMaps(res.data));
      } catch (error) {
        setError(error as Error);
      }
    })();
  }, []);

  if (error) {
    return <ErrorScreen />
  }

  if (!maps) {
    return <LoadingScreen />
  }

  return (
    <GlobalStateProvider maps={maps}>
      <VStack style={{ minHeight: "100vh" }}>
        <Header />
        <TabsPanel />
      </VStack>
    </GlobalStateProvider>
  );
}
