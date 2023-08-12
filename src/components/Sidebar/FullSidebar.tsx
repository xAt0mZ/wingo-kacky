import { SizeDisplay } from 'components/SizeDisplay';
import { Buttons, LogoButton } from './Buttons';
import { ThemeToggle } from './ThemeToggle';

export function FullSidebar() {
  return (
    <>
      <div className="fixed h-[calc(100%-3rem)] w-[105px] shrink-0 rounded-2xl bg-theme-1 text-white-neutral">
        <div className="flex h-full flex-col items-center justify-between py-12">
          <div>
            <LogoButton />
            <SizeDisplay />
          </div>
          <div className="flex h-1/3 flex-col justify-between">
            <Buttons />
          </div>
          <ThemeToggle />
        </div>
      </div>
      {/* ghost div to compensate the fixed sidebar in the relative flow */}
      <div className="h-full w-[105px] shrink-0" />
    </>
  );
}
