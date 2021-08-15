import Row from 'react-bootstrap/Row';
import MapsButtonGroup from './MapsButtonGroup';

export default function MapsRow(props) {
  const rows = 3;
  const cols = Math.ceil(props.maps.length / rows);
  const selectedId = props.selectedId;

  return (
    <Row>
      {[...Array(rows).keys()].map((row) =>
        <MapsButtonGroup
          key={row}
          selectedId={selectedId}
          maps={props.maps.slice(row * cols, (row + 1) * cols)}
          onMapSelection={props.onMapSelection} />
      )}
    </Row>
  );
}
