import { Header } from 'Header';
import { HomeView } from 'HomeView/HomeView';
import { Sidebar } from 'components/Sidebar';

export function App() {
  return (
    <div className="flex h-screen w-full flex-col content-start items-start gap-4 bg-white md:flex-row md:px-8 md:py-6">
      <Sidebar />
      <div className="flex w-full flex-col items-start gap-6 px-4">
        <Header />
        <HomeView />
      </div>
    </div>
  );
}
