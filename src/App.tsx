import { compact } from 'lodash';
import { Fragment, useEffect, useMemo } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSound } from 'use-sound';

import { Sidebar } from '@@/Sidebar';

import { Server, useServersRotation } from './hooks/useServersRotation';
import { useCurrentSeason } from './hooks/useCurrentSeason';
import { useSettings } from './hooks/useSettings';
import notificationSound from './notification.mp3';

export function App() {
  const { data: servers } = useServersRotation();
  const { data: season } = useCurrentSeason();
  const { theme, muted } = useSettings();
  const [play] = useSound(notificationSound);

  const favLiveMaps = useMemo(
    () =>
      compact(
        season?.season.maps?.map((m) => {
          const current = servers?.find(
            (s) => m.number === s.currentMap.number,
          );
          return m.favorite ? current : undefined;
        }),
      ),
    [season?.season.maps, servers],
  );

  useEffect(() => {
    if (favLiveMaps && favLiveMaps.length > 0) {
      toast(
        () => {
          if (!muted) {
            play();
          }
          return <Notification maps={favLiveMaps} />;
        },
        {
          theme,
          autoClose: 10000,
          pauseOnFocusLoss: false,
          className: 'bg-theme-6 border border-theme-2 text-theme-2',
          progressClassName: 'bg-none bg-theme-4',
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favLiveMaps]);

  return (
    <div className="flex h-full min-h-screen w-full flex-col gap-4 bg-theme-7 pb-24 sm:flex-row sm:px-8 sm:py-6">
      <Sidebar />
      <div className="flex grow flex-col gap-6 px-4 sm:pr-0">
        <Outlet />
      </div>
      <ScrollRestoration />
      <ToastContainer />
    </div>
  );
}

function Notification({ maps }: { maps: Server[] }) {
  return (
    <div className="grid grid-cols-2 gap-2 text-center">
      <span className="col-span-2 font-bold">Maps favorites en cours</span>
      {maps.map((s) => (
        <>
          {s && (
            <Fragment key={s.currentMap.number}>
              <span>{s.currentMap.number}</span>
              <span>Serveur {s.number}</span>
            </Fragment>
          )}
        </>
      ))}
    </div>
  );
}
