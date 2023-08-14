import { createHashRouter } from 'react-router-dom';

import { App } from './App';
import { ErrorPage } from './Error';
import { HomeView } from './HomeView/HomeView';
import { MapsView } from './MapsView/MapsView';
import { StatsView } from './StatsView/StatsView';

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
    ],
  },
]);
