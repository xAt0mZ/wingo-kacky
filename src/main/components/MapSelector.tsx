import Row from 'react-bootstrap/Row';
import { useGlobalState } from '../../hooks/useGlobalState';
import { MapsButtonGroup } from './MapsButtonGroup';


export function MapSelector() {
  const { maps } = useGlobalState();

  if (!maps) {
    return <>No map matching filters</>;
  }

  let rows = 3;
  let cols = Math.ceil(maps.length / rows);
  if (maps.length !== 75) {
    rows = 1;
    cols = maps.length;
  }

  return (
    <Row>
      {Array.from(Array(rows).keys()).map((row) =>
        <MapsButtonGroup
          key={row}
          maps={maps.slice(row * cols, (row + 1) * cols)} />
      )}
    </Row>
  );
}
