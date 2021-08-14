import ButtonGroup from 'react-bootstrap/ButtonGroup';

import MapButton from './MapButton';

export default function MapsButtonGroup(props) {
  const selectedId = props.selectedId;

  return (
    <ButtonGroup size="sm" className="btn-group-justified">
      {props.maps.map((map) => {
        return (
          <MapButton
            map={map}
            key={map.id}
            checked={selectedId === map.id}
            onMapSelection={props.onMapSelection} />
        );
      })}
    </ButtonGroup>
  );
}
