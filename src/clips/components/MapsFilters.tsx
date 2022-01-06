import { ButtonGroup, Row, ToggleButton } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { useMapsFilters } from '../../hooks/useMapsFilters';
import { YELLOW } from '../../models/colors';

export function MapsFilters() {
  const { filters, updateFilters } = useMapsFilters();

  return (
    <Row>
      <ButtonGroup size="sm" className="btn-group-justified flex-fill">
        <ToggleButton
          value=""
          id="finished"
          variant="outline-finished"
          className="mx-1 fw-bolder"
          type='checkbox'
          checked={filters.finished}
          onChange={(e) => updateFilters({ finished: e.target.checked })}
        > Terminée </ToggleButton>
        <ToggleButton
          value=""
          id="firstToFinish"
          variant="outline-first-to-finish"
          className="mx-1 fw-bolder"
          type='checkbox'
          checked={filters.firstToFinish}
          onChange={(e) => updateFilters({ firstToFinish: e.target.checked })}
        > First to finish </ToggleButton>
        <ToggleButton
          value=""
          id="hasDemoClip"
          variant="outline-demo"
          className="mx-1 fw-bolder"
          type='checkbox'
          checked={filters.hasDemoClip}
          onChange={(e) => updateFilters({ hasDemoClip: e.target.checked })}
        > Clip de démo </ToggleButton>
        <ToggleButton
          value=""
          id="notFinished"
          variant="outline-not-finished"
          className="mx-1 fw-bolder"
          type='checkbox'
          checked={filters.notFinished}
          onChange={(e) => updateFilters({ notFinished: e.target.checked })}
        > Non terminée </ToggleButton>
        <ToggleButton
          value=""
          id="trolled"
          variant="outline-rainbow"
          className="mx-1 fw-bolder"
          type='checkbox'
          checked={filters.trolled}
          onChange={(e) => updateFilters({ trolled: e.target.checked })}
        > Trolled </ToggleButton>
        <ToggleButton
          value=""
          id="starred"
          variant="outline-fav"
          className="mx-1 fw-bolder"
          type='checkbox'
          checked={filters.starred}
          onChange={(e) => updateFilters({ starred: e.target.checked })}
        > Favorites <FaStar className='button-icon' color={YELLOW} />
        </ToggleButton>
      </ButtonGroup>
    </Row>
  );
}