import { ButtonGroup } from 'react-bootstrap';

import { TMMap } from '../../models/map';

import { MapButton } from './MapButton';

interface Props {
  maps?: TMMap[];
}

export function MapsButtonsRow({ maps }: Props) {
  return (
    <ButtonGroup size="sm" className="btn-group-justified map-selector">
      {maps && maps.map((map) => (
          <MapButton
            map={map}
            key={map.id} />
        ))}
    </ButtonGroup>
  );
}
