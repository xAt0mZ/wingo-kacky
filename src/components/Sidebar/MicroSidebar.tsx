import clsx from 'clsx';
import { useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Bars3Icon, FlagIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Buttons, LogoButton } from './Buttons';
import { ThemeToggle } from './ThemeToggle';

export function MicroSidebar() {
  const [expanded, setExpanded] = useState(false);
  const { ref } = useResizeDetector({ onResize: () => setExpanded(false) });
  const Icon = expanded ? XMarkIcon : Bars3Icon;

  return (
    <>
      <div
        ref={ref}
        className="fixed z-10 h-16 w-full shrink-0 bg-theme-1 text-white-neutral transition-all duration-500 ease-in-out"
      >
        <div className="flex h-full flex-row items-center justify-between px-4">
          <button onClick={() => setExpanded(!expanded)}>
            <Icon className="h-8 w-8" />
          </button>
          <LogoButton />
          <FinishedSummary />
        </div>
      </div>
      <ExpandedBar expanded={expanded} />
      <BottomBar />

      {/* ghost div to compensate the fixed sidebar in the relative flow. Always after all fixed divs */}
      <div className="h-16 w-full shrink-0" />
    </>
  );
}

function ExpandedBar({ expanded }: { expanded: boolean }) {
  return (
    <div
      className={clsx(
        'fixed top-[4rem] z-10 flex w-full flex-col items-stretch gap-8 bg-theme-1 p-6 text-white-neutral transition-all duration-500 ease-in-out',
        expanded
          ? 'h-[calc(100vh-4rem)] opacity-100'
          : 'invisible h-0 opacity-0'
      )}
    >
      <Buttons row labels />
      <ThemeToggle labels />
    </div>
  );
}

function BottomBar() {
  return (
    <div className="fixed bottom-0 z-10 flex h-20 w-full flex-row items-center justify-evenly rounded-t-lg bg-theme-1">
      <Buttons labels />
    </div>
  );
}

function FinishedSummary() {
  return (
    <div
      className={clsx(
        'flex flex-row items-center gap-2 rounded-lg px-4 py-3 text-white-neutral',
        'bg-[color:color-mix(in_srgb,var(--theme-6)_10%,transparent)]',
        'dark:bg-[color:color-mix(in_srgb,var(--theme-8)_50%,transparent)]'
      )}
    >
      <FlagIcon className="h-4 w-4" />
      <span className="text-base font-medium">7 / 75</span>
    </div>
  );
}
