import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';

type ModalContext = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  invert: () => void;
  show: () => void;
  hide: () => void;
};

const Context = createContext<ModalContext | null>(null);

export function useModalContext(): ModalContext {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useModalContext must be used inside a ModalProvider');
  }
  return ctx;
}

type ModalProviderProps = {
  keepOnResize?: boolean;
};

export function ModalProvider({
  children,
  keepOnResize,
}: PropsWithChildren<ModalProviderProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useResizeDetector({
    onResize: () => !keepOnResize && setIsOpen(false),
  });

  function invert() {
    setIsOpen(!isOpen);
  }

  function show() {
    setIsOpen(true);
  }

  function hide() {
    setIsOpen(false);
  }

  return (
    <Context.Provider value={{ isOpen, setIsOpen, invert, show, hide }}>
      <div ref={ref}>{children}</div>
    </Context.Provider>
  );
}
