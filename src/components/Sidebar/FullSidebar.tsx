import { SizeDisplay } from '@@/SizeDisplay';

import { Buttons, LogoButton } from './Buttons';
import { ThemeToggle } from './ThemeToggle';
import { LeaderboardLink } from './LeaderboardLink';

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
            <LeaderboardLink />
          </div>
          <div className="flex h-[10%] flex-col justify-between">
            <ThemeToggle />
          </div>
        </div>
      </div>
      {/* ghost div to compensate the fixed sidebar in the relative flow */}
      <div className="h-full w-[105px] shrink-0" />
    </>
  );
}
