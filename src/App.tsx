import { Header } from 'Header';
import { HomeView } from 'HomeView/HomeView';
import { Sidebar } from 'components/Sidebar';

export function App() {
  return (
    <div className="flex h-full w-full flex-col content-start items-start gap-4 bg-white pb-24 md:h-screen md:flex-row md:px-8 md:py-6">
      <Sidebar />
      <div className="flex w-full flex-col items-stretch gap-6 px-4">
        <Header />
        <HomeView />
      </div>
    </div>
  );
}
