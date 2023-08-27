import {
  MutableRefObject,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  useSwipeable,
  SwipeableProps,
  SwipeableHandlers,
} from 'react-swipeable';

import { Position, useScrollPosition } from './useScrollPosition';

type State = {
  scrollableRef: MutableRefObject<null>;
  scrollboxRef: MutableRefObject<null>;
  swipeZoneHandlers: SwipeableHandlers;
};

const Context = createContext<State | null>(null);

export function useSwipeContext(): State {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('useSwipeContext must be used inside a SwipeProvider');
  }
  return ctx;
}

type Props = SwipeableProps;

export function SwipeProvider({
  children,
  onSwipedDown,
  onSwipedLeft,
  onSwipedRight,
  onSwipedUp,
  onSwipeStart,
  ...remainingCallbacks
}: PropsWithChildren<Props>) {
  const scrollableRef = useRef(null);
  const scrollboxRef = useRef(null);

  const [elemPosition, setElemPosition] = useState<Position>({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });

  const swippeableCallbacks: SwipeableProps = useMemo(
    () => ({
      onSwipedDown: (data) => {
        if (startPosition.y === 0 && elemPosition.y === 0 && onSwipedDown) {
          onSwipedDown(data);
        }
      },
      onSwipedLeft: (data) => {
        if (onSwipedLeft) {
          onSwipedLeft(data);
        }
      },
      onSwipedRight: (data) => {
        if (onSwipedRight) {
          onSwipedRight(data);
        }
      },
      onSwipedUp: (data) => {
        if (elemPosition.y === 0 && onSwipedUp) {
          onSwipedUp(data);
        }
      },
      onSwipeStart: (data) => {
        setStartPosition(elemPosition);
        onSwipeStart && onSwipeStart(data);
      },
      ...remainingCallbacks,
    }),
    [
      elemPosition,
      onSwipeStart,
      onSwipedDown,
      onSwipedLeft,
      onSwipedRight,
      onSwipedUp,
      remainingCallbacks,
      startPosition.y,
    ],
  );

  const handlers = useSwipeable(swippeableCallbacks);

  useScrollPosition({
    effect: ({ currPos }) => setElemPosition(currPos),
    element: scrollableRef,
    boundingElement: scrollboxRef,
  });

  const state: State = useMemo(
    () => ({ scrollableRef, scrollboxRef, swipeZoneHandlers: handlers }),
    [handlers],
  );

  return <Context.Provider value={state}>{children}</Context.Provider>;
}
