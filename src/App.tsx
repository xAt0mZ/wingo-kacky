import { Outlet, ScrollRestoration } from 'react-router-dom';

import { Sidebar } from 'components/Sidebar';

export function App() {
  return (
    <div className="flex h-full min-h-screen w-full flex-col gap-4 bg-theme-7 pb-24 sm:flex-row sm:px-8 sm:py-6">
      <Sidebar />
      <div className="flex grow flex-col gap-6 px-4 sm:pr-0">
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
}
