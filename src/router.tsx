import { createHashRouter, useNavigate } from 'react-router-dom';

import { App } from './App';
import { ErrorPage } from './Error';
import { HomeView } from './HomeView/HomeView';
import { MapsView } from './MapsView/MapsView';
import { StatsView } from './StatsView/StatsView';
import { useEffect } from 'react';
import { useOAuthContext } from './providers/useOAuthContext';

export enum Paths {
  HOME = '/',
  MAPS = '/maps',
  STATS = '/stats',
}

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: Paths.HOME, element: <HomeView /> },
      { path: Paths.MAPS, element: <MapsView /> },
      { path: Paths.STATS, element: <StatsView /> },
      { path: '/callback', element: <OAuthCallback /> },
    ],
  },
]);

function OAuthCallback() {
  const navigate = useNavigate();
  const { handleOAuthCallback } = useOAuthContext();

  useEffect(() => {
    const fullHash = window.location.hash.substring(1);
    const [_, hash] = fullHash.split('#');
    if (!hash) {
      navigate(Paths.HOME);
    } else {
      handleOAuthCallback(hash);
      navigate(Paths.HOME);
    }
  }, [navigate]);

  return <></>;
}
