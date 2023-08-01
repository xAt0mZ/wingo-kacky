import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { ErrorPage } from './Error';
import { HomeView } from 'HomeView/HomeView';
import { MapsView } from 'MapsView/MapsView';
import { StatsView } from 'StatsView/StatsView';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <HomeView /> },
      { path: '/maps', element: <MapsView /> },
      { path: '/stats', element: <StatsView /> },
    ],
  },
]);
