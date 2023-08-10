import clsx from 'clsx';
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useResizeDetector } from 'react-resize-detector';

/**
 * DEFINTIONS
 */

type SubComponents = {
  Collapsed: typeof CollapsedComponent;
  Expanded: typeof ExpandedComponent;
};

export const Overlay: typeof MainComponent & SubComponents =
  MainComponent as typeof MainComponent & SubComponents;

MainComponent.displayName = 'Overlay';
Overlay.Collapsed = CollapsedComponent;
Overlay.Expanded = ExpandedComponent;

/**
 * CONTEXT
 */

type OverlayContext = {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  invert: () => void;
  show: () => void;
  hide: () => void;
};

const OverlayCtx = createContext<OverlayContext | null>(null);

function useOverlayContext(): OverlayContext {
  const ctx = useContext(OverlayCtx);
  if (!ctx) {
    throw new Error(
      'useOverlayContext must be used inside an Overlay component'
    );
  }
  return ctx;
}

/**
 * MAIN COMPONENT
 */

function MainComponent({ children }: PropsWithChildren) {
  const [expanded, setExpanded] = useState(false);
  const { ref } = useResizeDetector<HTMLDivElement>({
    onResize: () => setExpanded(false),
  });
  const invert = useCallback(() => setExpanded(!expanded), [expanded]);
  const show = useCallback(() => setExpanded(true), []);
  const hide = useCallback(() => setExpanded(false), []);

  return (
    <OverlayCtx.Provider value={{ expanded, setExpanded, invert, show, hide }}>
      <div ref={ref}>{children}</div>
    </OverlayCtx.Provider>
  );
}

/**
 * COLLAPSED
 */

type SubComponentsProps = {
  children: ReactNode | ((context: OverlayContext) => ReactNode);
};

function CollapsedComponent({ children }: SubComponentsProps) {
  const ctx = useOverlayContext();

  if (typeof children === 'function') {
    return <>{children(ctx)}</>;
  }
  return <>{children}</>;
}

/**
 * EXPANDED
 */

type ExpandedComponentProps = {
  className: string;
  height?: string;
} & SubComponentsProps;

function ExpandedComponent({
  children,
  className,
  height,
}: ExpandedComponentProps) {
  const { expanded, ...ctx } = useOverlayContext();
  const classes = clsx(
    className,
    'animated fixed inset-0 z-20',
    expanded ? clsx('opacity-100', height) : 'invisible h-0 opacity-0'
  );

  if (typeof children === 'function') {
    return <div className={classes}>{children({ expanded, ...ctx })}</div>;
  }
  return <div className={classes}>{children}</div>;
}
