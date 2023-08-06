import { Outlet } from 'react-router-dom';

import { Sidebar } from 'components/Sidebar';
import { useTheme } from 'hooks/useTheme';

export function App() {
  const { theme, colorblind } = useTheme();

  return (
    <div
      className="flex h-full w-full flex-col gap-4 bg-theme-7 pb-24 sm:min-h-screen sm:flex-row sm:px-8 sm:py-6"
      data-theme={theme}
      data-colorblind={colorblind}
    >
      <Sidebar />
      <div className="flex grow flex-col gap-6 px-4 sm:pr-0">
        <Outlet />
      </div>
    </div>
  );
}
