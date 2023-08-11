import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useResizeDetector } from 'react-resize-detector';

type ModalContext = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  invert: () => void;
  show: () => void;
  hide: () => void;
};

const ModalCtx = createContext<ModalContext | null>(null);

export function useModalContext(): ModalContext {
  const ctx = useContext(ModalCtx);
  if (!ctx) {
    throw new Error('useModalContext must be used inside a ModalProvider');
  }
  return ctx;
}

export function ModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref } = useResizeDetector({
    onResize: () => setIsOpen(false),
  });
  const invert = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const show = useCallback(() => setIsOpen(true), []);
  const hide = useCallback(() => setIsOpen(false), []);

  return (
    <ModalCtx.Provider value={{ isOpen, setIsOpen, invert, show, hide }}>
      <div ref={ref}>{children}</div>
    </ModalCtx.Provider>
  );
}
