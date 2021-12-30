import Row from 'react-bootstrap/Row';
import { useGlobalState } from '../../hooks/useGlobalState';
import { MapsButtonGroup } from './MapsButtonGroup';


export function MapSelector() {
  const { maps, selectedEdition, selectedStreamer} = useGlobalState();
  
  const filteredMaps = maps ? maps[selectedEdition][selectedStreamer].maps : [];

  let rows = 3;
  let cols = Math.ceil(filteredMaps.length / rows);
  if (filteredMaps.length !== 75) {
    rows = 1;
    cols = filteredMaps.length;
  }

  return (
    <Row>
      {Array.from(Array(rows).keys()).map((row) =>
        <MapsButtonGroup
          key={row}
          maps={filteredMaps.slice(row * cols, (row + 1) * cols)} />
      )}
    </Row>
  );
}
