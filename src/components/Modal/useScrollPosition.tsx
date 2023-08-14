import {
  DependencyList,
  useLayoutEffect,
  useEffect,
  useState,
  RefObject,
} from 'react';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const isBrowser = typeof window !== `undefined`;
const zeroPosition = { x: 0, y: 0 };

type ElementRef = RefObject<HTMLElement | null>;

function getClientRect(element?: HTMLElement | null) {
  return element?.getBoundingClientRect();
}

function getScrollPosition({
  element,
  boundingElement,
}: {
  element?: ElementRef;
  boundingElement?: ElementRef;
}) {
  if (!isBrowser) {
    return zeroPosition;
  }

  if (!element && !boundingElement) {
    return { x: window.scrollX, y: window.scrollY };
  }

  const targetPosition = getClientRect(element?.current || document.body);
  const containerPosition = getClientRect(boundingElement?.current);

  if (!targetPosition) {
    return zeroPosition;
  }

  return containerPosition
    ? {
        x: (containerPosition.x || 0) - (targetPosition.x || 0),
        y: (containerPosition.y || 0) - (targetPosition.y || 0),
      }
    : { x: targetPosition.left, y: targetPosition.top };
}

export type Position = {
  x: number;
  y: number;
};

export type ScrollProps = {
  prevPos: Position;
  currPos: Position;
};

type Props = {
  effect: (props: ScrollProps) => void;
  deps?: DependencyList;
  element?: ElementRef;
  boundingElement?: ElementRef;
  wait?: number;
};
export function useScrollPosition({
  effect,
  deps,
  element,
  wait,
  boundingElement,
}: Props): void {
  const [position, setPosition] = useState(
    getScrollPosition({ element, boundingElement }),
  );

  let throttleTimeout: number | null = null;

  function callBack() {
    const currPos = getScrollPosition({ element, boundingElement });
    setPosition(currPos);
    effect({ prevPos: position, currPos });
    throttleTimeout = null;
  }

  useIsomorphicLayoutEffect(() => {
    const parentElement = boundingElement?.current || window;
    if (!isBrowser) {
      return;
    }

    function handleScroll() {
      if (!wait) {
        return callBack();
      }

      if (throttleTimeout === null) {
        throttleTimeout = window.setTimeout(callBack, wait);
      }
    }

    parentElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      parentElement.removeEventListener('scroll', handleScroll);
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, [element, boundingElement, ...(deps ?? [])]);
}
