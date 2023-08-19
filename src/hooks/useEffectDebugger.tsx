/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

function usePrevious(value: any, initialValue: any) {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function useEffectDebugger(
  effectHook: () => void,
  dependencies: any[],
  dependencyNames: any[] = [],
) {
  const previousDeps = usePrevious(dependencies, []);

  const changedDeps = dependencies.reduce((accum, dependency, index) => {
    if (dependency !== previousDeps[index]) {
      const keyName = dependencyNames[index] || index;
      return {
        ...accum,
        [keyName]: {
          before: previousDeps[index],
          after: dependency,
        },
      };
    }

    return accum;
  }, {});

  if (Object.keys(changedDeps).length) {
    // eslint-disable-next-line no-console
    console.log('[use-effect-debugger] ', changedDeps);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effectHook, dependencies);
}
/* eslint-enable @typescript-eslint/no-explicit-any */
