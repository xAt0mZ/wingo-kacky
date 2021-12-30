import clsx from 'clsx';
import { useGlobalState } from '../../hooks/useGlobalState';

export function MapsCounter() {
  const { maps, selectedEdition, selectedStreamer } = useGlobalState();

  // const finished = useMemo(() => filter(, { finished: true }).length, [maps, selectedEdition, selectedStreamer]);
  // const total = maps?.length;

  const finished = 10;
  const total = 10;

  return (
    <span className={clsx('ms-auto', 'fs-1')}>
      {finished} / {total}
    </span>
  );
}