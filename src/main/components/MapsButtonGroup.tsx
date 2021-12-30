import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { TMMap } from '../../models/map';
import { MapButton } from './MapButton';

interface Props {
  maps?: TMMap[];
}

export function MapsButtonGroup({ maps }:Props) {
  return (
    <ButtonGroup size="sm" className="btn-group-justified">
      {maps && maps.map((map) => {
        return (
          <MapButton
            map={map}
            key={map.id} />
        );
      })}
    </ButtonGroup>
  );
}
