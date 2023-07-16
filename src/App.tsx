import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { Sidebar } from 'components/Sidebar';
import { HomeView } from 'HomeView/HomeView';

export function App() {
  return (
    <div className="flex h-full w-full flex-col gap-4 bg-white pb-24 sm:min-h-screen sm:flex-row sm:px-8 sm:py-6">
      <Sidebar />
      <div className="flex grow flex-col gap-6 px-4 sm:!pr-0">
        <Header />
        <HomeView />
        <Footer />
      </div>
    </div>
  );
}
