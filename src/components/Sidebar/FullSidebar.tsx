import { Buttons, LogoButton } from './Buttons';
import { ThemeToggle } from './ThemeToggle';

export function FullSidebar() {
  return (
    <>
      <div className="fixed h-[calc(100%-3rem)] w-[105px] shrink-0 rounded-2xl bg-theme-1 text-white-neutral">
        <div className="flex h-full flex-col items-center justify-between py-12">
          <div>
            <LogoButton />
            <div className="text-center">
              <span className="sm:hidden">xs</span>
              <span className="hidden sm:block md:hidden">sm</span>
              <span className="hidden md:block lg:hidden ">md</span>
              <span className="hidden lg:block xl:hidden ">lg</span>
              <span className="hidden xl:block 2xl:hidden ">XL</span>
              <span className="hidden 2xl:block ">2XL</span>
            </div>
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
