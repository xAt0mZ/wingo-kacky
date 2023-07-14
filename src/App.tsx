import { Header } from 'Header';
import { HomeView } from 'HomeView/HomeView';
import { Sidebar } from 'components/Sidebar';

export function App() {
  return (
    <div className="flex h-full w-full flex-col content-start items-start gap-4 bg-white pb-24 sm:h-screen sm:flex-row sm:overflow-y-scroll sm:px-8 sm:py-6">
      <Sidebar />
      <div className="flex w-full flex-col items-stretch gap-6 px-4">
        <Header />
        <HomeView />
      </div>
    </div>
  );
}
