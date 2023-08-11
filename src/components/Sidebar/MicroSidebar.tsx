import clsx from 'clsx';
import { Bars3Icon, FlagIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { Buttons, LogoButton } from './Buttons';
import { ThemeToggle } from './ThemeToggle';
import { Link } from 'react-router-dom';

import { Paths } from 'router';

import { Modal, ModalProvider, useModalContext } from 'components/Modal';

export function MicroSidebar() {
  return (
    <ModalProvider>
      <Content />
    </ModalProvider>
  );
}

function Content() {
  const { hide, invert, isOpen, setIsOpen } = useModalContext();
  return (
    <>
      {/* ghost div to compensate the top fixed bar in the static (default) flow */}
      <div className="h-16 w-full shrink-0" />

      <div className="transitionChildren fixed top-0 z-10 flex h-16 w-full shrink-0 flex-row items-center justify-between bg-theme-1 px-4 text-white-neutral">
        <BurgerButton expanded={isOpen} invert={invert} />
        <LogoButton onClick={hide} />
        <FinishedSummary onClick={hide} />
      </div>

      <Modal
        show={isOpen}
        setShow={setIsOpen}
        className="top-[4rem] z-20 flex w-full flex-col items-stretch gap-8 bg-theme-1 p-6 text-white-neutral"
        transition="ease-in-out duration-500"
        from="opacity-0 h-0"
        to="opacity-100 h-[calc(100vh-4rem)]"
      >
        <Buttons row labels onClick={hide} />
        <ThemeToggle labels />
      </Modal>

      <div className="fixed bottom-0 z-10 flex h-20 w-full flex-row items-center justify-evenly rounded-t-lg bg-theme-1">
        <Buttons labels />
      </div>
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

function FinishedSummary({ onClick }: { onClick: () => void }) {
  return (
    <Link
      to={Paths.MAPS}
      className={clsx(
        'flex flex-row items-center gap-2 rounded-lg px-4 py-3 text-white-neutral',
        'bg-[color:color-mix(in_srgb,var(--theme-6)_10%,transparent)]',
        'dark:bg-[color:color-mix(in_srgb,var(--theme-8)_50%,transparent)]'
      )}
      onClick={onClick}
    >
      <FlagIcon className="h-4 w-4" />
      <span className="text-base font-medium">7 / 75</span>
    </Link>
  );
}
