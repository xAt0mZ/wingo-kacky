import clsx from 'clsx';
import { useGlobalState } from '../../hooks/useGlobalState';

export function MapsCounter() {
  const { finishedMapsCount, totalMapsCount  } = useGlobalState();

  return (
    <span className={clsx('ms-auto', 'fs-1')}>
      {finishedMapsCount} / {totalMapsCount}
    </span>
  );
}