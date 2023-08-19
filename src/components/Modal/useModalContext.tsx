import {
  PropsWithChildren,
  createContext,
  useCallback,
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

  const show = useCallback(() => setIsOpen(true), []);
  const hide = useCallback(() => setIsOpen(false), []);

  const state: State = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      show,
      hide,
    }),
    [hide, isOpen, show],
  );

  return (
    <Context.Provider value={state}>
      <div ref={ref}>{children}</div>
    </Context.Provider>
  );
}
