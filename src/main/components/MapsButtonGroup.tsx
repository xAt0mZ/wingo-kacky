import { ButtonGroup } from 'react-bootstrap';

import { TMMap } from '../../models/map';

import { MapButton } from './MapButton';

interface Props {
  maps?: TMMap[];
}

export function MapsButtonGroup({ maps }: Props) {
  return (
    <ButtonGroup size="sm" className="btn-group-justified">
      {maps && maps.map((map) => (
          <MapButton
            map={map}
            key={map.id} />
        ))}
    </ButtonGroup>
  );
}
