import { ToggleButton } from 'react-bootstrap';

import { Clap } from '../../components/icons/Clap';
import { Star } from '../../components/icons/Star';
import { useGlobalState } from '../../hooks/useGlobalState';
import { TMMap } from '../../models/map';

interface Props {
  map: TMMap;
}

export function getVariant(map: TMMap) {
  if (map.trolled) return 'outline-rainbow';
  if (map.firstToFinish) return 'outline-first-to-finish';
  if (map.finished) return 'outline-finished';
  return 'outline-not-finished'
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
      className="m-1 fw-bolder mw-10 p-auto d-flex align-items-center justify-content-center"
    >
      {!map.finished && !map.trolled && map.clip && <Clap /> }
      {map.id}
      {map.fav && <Star /> }
    </ToggleButton>
  );
}
