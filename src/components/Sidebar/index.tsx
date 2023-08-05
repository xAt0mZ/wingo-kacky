import { FullSidebar } from './FullSidebar';
import { MicroSidebar } from './MicroSidebar';

export function Sidebar() {
  return (
    <>
      <div className="sm:hidden">
        <MicroSidebar />
      </div>
      <div className="hidden sm:block">
        <FullSidebar />
      </div>
    </>
  );
}
