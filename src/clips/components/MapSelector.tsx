import { filter } from 'lodash';
import { useMemo } from 'react';
import { Row } from 'react-bootstrap';

import { useGlobalState } from '../../hooks/useGlobalState';
import { useMapsFilters } from '../../hooks/useMapsFilters';
import { TMMap } from '../../models/map';

import { MapsButtonsRow } from './MapsButtonsRow';


export function MapSelector() {
  const { maps: editionMaps } = useGlobalState();
  const { filters: f } = useMapsFilters();

  const maps = useMemo((): TMMap[] => filter(editionMaps, (m): boolean => !!(
    (f.finished && m.finished)
    || (f.firstToFinish && m.firstToFinish)
    || (f.hasDemoClip && !m.finished && !m.trolled && m.clip)
    || (f.notFinished && !m.finished)
    || (f.starred && m.fav)
    || (f.trolled && m.trolled)
    || (!f.finished && !f.firstToFinish && !f.hasDemoClip && !f.notFinished && !f.starred && !f.trolled)
  )
  ) || [], [f, editionMaps]);

  if (!maps.length) {
    return (<>Aucune map ne correspond à ces critères.</>)
  }
  const cols = 25;
  const rows = Math.ceil(maps.length / cols);

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
