import clsx from 'clsx';
import { HomeIcon, FlagIcon, PresentationChartBarIcon, MoonIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import logo from './logo.png';
import { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

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

function MicroSidebar() {
  const [expanded, setExpanded] = useState(false);
  const { ref } = useResizeDetector({ onResize: () => setExpanded(false) });
  const Icon = expanded ? XMarkIcon : Bars3Icon;

  return (
    <>
      <div ref={ref} className="fixed z-10 h-16 w-full shrink-0 bg-purple-dark text-white">
        <div className="flex h-full flex-row items-center justify-between px-4 sm:hidden">
          {/* ghost item to truly center the logo and have the bar at far right */}
          <div className="invisible h-8 w-8" />
          <img src={logo} className="mx-auto" />
          <button onClick={() => setExpanded(!expanded)}>
            <Icon className="h-8 w-8" />
          </button>
        </div>
      </div>
      <div
        className={clsx(
          'fixed top-[4rem] z-20 flex w-full flex-col items-stretch gap-8 bg-purple-dark px-6 transition-all duration-500 ease-in-out',
          expanded ? 'h-[calc(100vh-4rem)] opacity-100' : 'invisible h-0 opacity-0'
        )}
      >
        <div></div>
        <Buttons row labels />
      </div>
      <div className="fixed bottom-0 z-10 flex h-20 w-full flex-row items-center justify-evenly rounded-t-lg bg-purple-dark">
        <Buttons labels />
      </div>
      {/* ghost div to compensate the fixed sidebar in the relative flow */}
      <div className="h-16 w-full shrink-0" />
    </>
  );
}

function FullSidebar() {
  return (
    <>
      <div className="fixed h-[calc(100%-3rem)] w-[105px] shrink-0 rounded-2xl bg-purple-dark text-white">
        <div className="flex h-full flex-col items-center justify-between py-12">
          <div>
            <img src={logo} />
            <div className="text-center">
              <span className="sm:hidden">xs</span>
              <span className="hidden sm:block md:hidden">sm</span>
              <span className="hidden md:block lg:hidden ">md</span>
              <span className="hidden lg:block xl:hidden ">lg</span>
              <span className="hidden xl:block 2xl:hidden ">XL</span>
              <span className="hidden 2xl:block ">2XL</span>
            </div>
          </div>
          <div className="flex flex-col gap-20">
            <Buttons />
          </div>
          <button>
            <MoonIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      {/* ghost div to compensate the fixed sidebar in the relative flow */}
      <div className="h-full w-[105px] shrink-0" />
    </>
  );
}

function Buttons({ labels, row }: { labels?: boolean; row?: boolean }) {
  return (
    <>
      <Item label={labels ? 'Accueil' : ''} icon={HomeIcon} row={row} />
      <Item label={labels ? 'Cartes' : ''} icon={FlagIcon} row={row} />
      <Item label={labels ? 'Statistiques' : ''} icon={PresentationChartBarIcon} row={row} />
    </>
  );
}

type ItemProps = {
  label?: string;
  icon: typeof HomeIcon;
  row?: boolean;
};

function Item({ label, icon: Icon, row }: ItemProps) {
  return (
    <button className={clsx('flex content-center items-center text-white', row ? 'w-full flex-row gap-2' : 'w-20 flex-col gap-1')} onClick={() => console.log(label)}>
      <Icon className={clsx('sm:h-8 sm:w-8', row ? 'h-5 w-5' : 'h-6 w-6')} />
      {label && <span className={clsx(row ? 'text-base font-bold' : 'text-xs font-medium')}>{label}</span>}
    </button>
  );
}
