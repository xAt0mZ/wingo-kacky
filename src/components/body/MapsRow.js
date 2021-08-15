import Row from 'react-bootstrap/Row';
import MapsButtonGroup from './MapsButtonGroup';

export default function MapsRow(props) {
  let rows = 3;
  let cols = Math.ceil(props.maps.length / rows);
  if (props.maps.length !== 75) {
    rows = 1;
    cols = props.maps.length;
  }
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
