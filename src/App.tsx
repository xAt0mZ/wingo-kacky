import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import { Header } from './header';
import { Main } from './main';
import { Footer } from './footer';
import { GlobalStateProvider } from './hooks/useGlobalState';
import { get } from './api';
import { EditionMap } from './models/editionMap';
import { extractMaps } from './services/map.service';
import { ErrorScreen } from './error';
import { LoadingScreen } from './loading';

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
      <Container className="vstack gap-2 p-0 pb-2 text-center" style={{ minHeight: "100vh" }}>
        <Header />
        <Main />
        <Footer />
      </Container>
    </GlobalStateProvider>
  );
}
