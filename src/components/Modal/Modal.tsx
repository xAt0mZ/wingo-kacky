import clsx from 'clsx';
import { Fragment, PropsWithChildren } from 'react';
import {
  Dialog,
  Transition,
  TransitionClasses as HeadlessUITransitionClasses,
} from '@headlessui/react';
import { useModalContext } from './useModalContext';

type Props = {
  className?: string;
  transition?: string;
  from: string;
  to: string;
  withBackdrop?: boolean;
  onClose?: () => void;
};

const backdropTransition = {
  transition: 'ease-in-out duration-500',
  from: 'opacity-0',
  to: 'opacity-75 dark:opacity-75 sm:opacity-30',
};

export function Modal({
  children,
  className,
  withBackdrop,
  transition = 'ease-in-out duration-500',
  from,
  to,
  onClose,
}: PropsWithChildren<Props>) {
  const { isOpen, hide } = useModalContext();

  const transitionClasses: HeadlessUITransitionClasses = {
    enter: transition,
    enterFrom: from,
    enterTo: to,
    leave: transition,
    leaveFrom: to,
    leaveTo: from,
  };

  return (
    <Transition show={isOpen} as={Fragment} afterLeave={onClose}>
      <Dialog className="relative z-10" onClose={hide}>
        {withBackdrop && (
          <Transition.Child
            as={Fragment}
            enter={backdropTransition.transition}
            enterFrom={backdropTransition.from}
            enterTo={backdropTransition.to}
            leave={backdropTransition.transition}
            leaveFrom={backdropTransition.to}
            leaveTo={backdropTransition.from}
          >
            <div className="fixed inset-0 bg-theme-1" />
          </Transition.Child>
        )}

        <Transition.Child as={Fragment} {...transitionClasses}>
          <Dialog.Panel
            className={clsx('transitionChildren fixed inset-0', className)}
          >
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
