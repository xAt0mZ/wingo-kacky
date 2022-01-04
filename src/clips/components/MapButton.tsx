import { ToggleButton } from 'react-bootstrap';

import { useGlobalState } from '../../hooks/useGlobalState';
import { TMMap } from '../../models/map';

interface Props {
  map: TMMap;
}

function getVariant(map: TMMap) {
  if (map.firstToFinish) return 'outline-first-to-finish';
  if (map.finished) return 'outline-finished';
  return map.clip ? 'outline-demo' : 'outline-not-finished'
}

export function MapButton({ map }: Props) {
  const { selectedMap, setSelectedMap} = useGlobalState()
  return (
    <ToggleButton
      id={`radio-${map.id}`}
      type="radio"
      variant={getVariant(map)}
      name="radio"
      value={map.id}
      checked={selectedMap?.id === map.id}
      onChange={() => setSelectedMap(map)}
      className="m-1 fw-bolder"
    >
      {map.id}
    </ToggleButton>
  );
}
