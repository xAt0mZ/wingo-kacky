import { Row } from 'react-bootstrap';

import { useGlobalState } from '../../hooks/useGlobalState';

import { MapsButtonsRow } from './MapsButtonsRow';


export function MapSelector() {
  const { maps } = useGlobalState();

  let rows = 3;
  let cols = Math.ceil(maps.length / rows);
  if (maps.length !== 75) {
    rows = 1;
    cols = maps.length;
  }

  return (
    <Row>
      {Array.from(Array(rows).keys()).map((row) =>
        <MapsButtonsRow
          key={row}
          maps={maps.slice(row * cols, (row + 1) * cols)} />
      )}
    </Row>
  );
}
