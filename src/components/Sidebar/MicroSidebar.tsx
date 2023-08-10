import clsx from 'clsx';
import { Bars3Icon, FlagIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Buttons, LogoButton } from './Buttons';
import { ThemeToggle } from './ThemeToggle';
import { Overlay } from 'components/Overlay';
import { Link } from 'react-router-dom';

import { Paths } from 'router';

export function MicroSidebar() {
  return (
    <>
      <Overlay>
        <Overlay.Collapsed>
          {({ expanded, invert, hide }) => (
            <div className="animated fixed z-10 flex h-16 w-full shrink-0 flex-row items-center justify-between bg-theme-1 px-4 text-white-neutral">
              <BurgerButton expanded={expanded} invert={invert} />
              <LogoButton hide={hide} />
              <FinishedSummary hide={hide} />
            </div>
          )}
        </Overlay.Collapsed>
        <Overlay.Expanded
          className="top-[4rem] flex w-full flex-col items-stretch gap-8 bg-theme-1 p-6 text-white-neutral"
          height="h-[calc(100vh-4rem)]"
        >
          {({ hide }) => (
            <>
              <Buttons row labels hide={hide} />
              <ThemeToggle labels />
            </>
          )}
        </Overlay.Expanded>
      </Overlay>

      <div className="animated fixed bottom-0 z-10 flex h-20 w-full flex-row items-center justify-evenly rounded-t-lg bg-theme-1">
        <Buttons labels />
      </div>

      {/* ghost div to compensate the top fixed bar in the static (default) flow. Always after all fixed divs */}
      <div className="h-16 w-full shrink-0" />
    </>
  );
}

function BurgerButton({
  expanded,
  invert,
}: {
  expanded: boolean;
  invert(): void;
}) {
  const Icon = expanded ? XMarkIcon : Bars3Icon;

  return (
    <button onClick={invert}>
      <Icon className="h-8 w-8" />
    </button>
  );
}

function FinishedSummary({ hide }: { hide: () => void }) {
  return (
    <Link
      to={Paths.MAPS}
      className={clsx(
        'flex flex-row items-center gap-2 rounded-lg px-4 py-3 text-white-neutral',
        'bg-[color:color-mix(in_srgb,var(--theme-6)_10%,transparent)]',
        'dark:bg-[color:color-mix(in_srgb,var(--theme-8)_50%,transparent)]'
      )}
      onClick={hide}
    >
      <FlagIcon className="h-4 w-4" />
      <span className="text-base font-medium">7 / 75</span>
    </Link>
  );
}
