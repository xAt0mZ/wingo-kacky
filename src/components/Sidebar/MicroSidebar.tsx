import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Bars3Icon, FlagIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Paths } from '@/router';
import { useCurrentSeason } from '@/hooks/useCurrentSeason';

import { Modal, ModalProvider, useModalContext } from '@@/Modal';

import { ThemeToggle } from './ThemeToggle';
import { Buttons, LogoButton } from './Buttons';
import { LeaderboardLink } from './LeaderboardLink';
import { LoginButton } from '../LoginButton';

export function MicroSidebar() {
  return (
    <ModalProvider>
      <Content />
    </ModalProvider>
  );
}

function Content() {
  const { hide } = useModalContext();

  return (
    <>
      {/* ghost div to compensate the top fixed bar in the static (default) flow */}
      <div className="h-16 w-full shrink-0" />

      <div className="transitionChildren bg-theme-1 text-white-neutral fixed top-0 z-10 flex h-16 w-full shrink-0 flex-row items-center justify-between px-4">
        <BurgerButton />
        <LogoButton />
        <FinishedSummary />
      </div>

      <Modal
        className="bg-theme-1 text-white-neutral top-16 z-20 flex w-full flex-col items-stretch justify-between p-6"
        from="opacity-0 h-0"
        to="opacity-100 h-[calc(100vh-4rem)]"
      >
        <div className="flex flex-col gap-8">
          <LoginButton />
          <Buttons row labels onClick={hide} />
          <LeaderboardLink row labels onClick={hide} />
        </div>
        <div className="flex flex-col gap-8">
          <ThemeToggle labels />
        </div>
      </Modal>

      <div className="bg-theme-1 fixed bottom-0 z-10 flex h-20 w-full flex-row items-center justify-evenly rounded-t-lg">
        <Buttons labels />
      </div>
    </>
  );
}

function BurgerButton() {
  const { isOpen, show, hide } = useModalContext();
  const Icon = isOpen ? XMarkIcon : Bars3Icon;

  return (
    <button
      onClick={() => {
        if (!isOpen) {
          show();
        } else {
          hide();
        }
      }}
    >
      <Icon className="h-8 w-8" />
    </button>
  );
}

function FinishedSummary() {
  const { data, isLoading } = useCurrentSeason();

  if (!data || isLoading) {
    return null;
  }

  const {
    season: { nbMaps, maps },
  } = data;
  const finished = maps?.filter((m) => m.validated).length || 0;
  return (
    <Link
      to={Paths.MAPS}
      className={clsx(
        'text-white-neutral flex flex-row items-center gap-2 rounded-lg px-4 py-3',
        'bg-[color-mix(in_srgb,var(--theme-6)_10%,transparent)]',
        'dark:bg-[color-mix(in_srgb,var(--theme-8)_50%,transparent)]',
      )}
    >
      <FlagIcon className="h-4 w-4" />
      <span className="text-base font-medium">
        {finished} / {nbMaps}
      </span>
    </Link>
  );
}
