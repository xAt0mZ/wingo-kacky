import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useResizeDetector } from 'react-resize-detector';

type State = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  show: () => void;
  hide: () => void;
};

const Context = createContext<State | null>(null);

export function useModalContext(): State {
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

  function show() {
    setIsOpen(true);
  }

  function hide() {
    setIsOpen(false);
  }

  const state: State = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      show,
      hide,
    }),
    [isOpen],
  );

  return (
    <Context.Provider value={state}>
      <div ref={ref}>{children}</div>
    </Context.Provider>
  );
}
