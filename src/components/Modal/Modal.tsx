import clsx from 'clsx';
import { Fragment, PropsWithChildren, useCallback } from 'react';
import {
  Dialog,
  Transition,
  TransitionClasses as HeadlessUITransitionClasses,
} from '@headlessui/react';

type Props = {
  className?: string;
  show: boolean;
  setShow: (show: boolean) => void;
  transition?: string;
  from?: string;
  to?: string;
  withBackdrop?: boolean;
};

export function Modal({
  children,
  className,
  withBackdrop,
  show,
  setShow,
  transition,
  from,
  to,
}: PropsWithChildren<Props>) {
  const hide = useCallback(() => setShow(false), [setShow]);

  const transitionClasses: HeadlessUITransitionClasses = {
    enter: transition,
    enterFrom: from,
    enterTo: to,
    leave: transition,
    leaveFrom: to,
    leaveTo: from,
  };

  return (
    <Transition show={show} as={Fragment}>
      <Dialog className="relative z-10" onClose={hide}>
        {withBackdrop && (
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-theme-1/10 fixed inset-0" />
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
