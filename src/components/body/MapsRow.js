import Row from 'react-bootstrap/Row';
import MapsButtonGroup from './MapsButtonGroup';

export default function MapsRow(props) {
  const rows = props.rows;
  const cols = props.cols;
  const selectedId = props.selectedId;

  return (
    <Row>
      {[...Array(rows).keys()].map((row) =>
        <MapsButtonGroup
          className="d-flex justify-content-evenly"
          key={row}
          selectedId={selectedId}
          maps={props.maps.slice(row * cols, (row + 1) * cols)}
          onMapSelection={props.onMapSelection} />
      )}
    </Row>
  );
}
