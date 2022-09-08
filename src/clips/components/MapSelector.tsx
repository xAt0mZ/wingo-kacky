import { filter } from 'lodash';
import { useMemo } from 'react';
import { ButtonGroup, Row } from 'react-bootstrap';

import { useGlobalState } from '../../hooks/useGlobalState';
import { useMapsFilters } from '../../hooks/useMapsFilters';
import { TMMap } from '../../models/map';

import { MapButton } from './MapButton';

export function MapSelector() {
  const { filteredMaps } = useGlobalState();
  const { filters: f } = useMapsFilters();

  const maps = useMemo(
    (): TMMap[] =>
      filter(
        filteredMaps,
        (m): boolean =>
          !!(
            (f.finished && m.finished) ||
            (f.firstToFinish && m.firstToFinish) ||
            (f.hasDemoClip && !m.finished && !m.trolled && m.clip) ||
            (f.notFinished && !m.finished) ||
            (f.starred && m.fav) ||
            (f.trolled && m.trolled) ||
            (!f.finished && !f.firstToFinish && !f.hasDemoClip && !f.notFinished && !f.starred && !f.trolled)
          )
      ) || [],
    [f, filteredMaps]
  );

  if (!maps.length) {
    return <>Aucune map ne correspond à ces critères.</>;
  }
  return (
    <Row className="flex-wrap">
      <ButtonGroup size="sm" className="flex-wrap">
        {maps && maps.map((map) => <MapButton map={map} key={map.id} />)}
      </ButtonGroup>
    </Row>
  );
}
