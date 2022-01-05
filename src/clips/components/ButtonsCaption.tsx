import { ButtonGroup, Row, ToggleButton } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { YELLOW } from '../../models/colors';

export function ButtonsCaption() {
  return (
    <Row>
      <div className="hstack gap-2">
        <span className='fs-5'>Légende des couleurs</span>
        <ButtonGroup size="sm" className="btn-group-justified flex-fill">
          <ToggleButton
            value=""
            variant="outline-finished"
            className="fw-bolder"
            disabled
          > Terminée </ToggleButton>
          <ToggleButton
            value=""
            variant="outline-first-to-finish"
            className="fw-bolder"
            disabled
          > First to finish </ToggleButton>
          <ToggleButton
            value=""
            variant="outline-demo"
            className="fw-bolder"
            disabled
          > Clip de démo </ToggleButton>
          <ToggleButton
            value=""
            variant="outline-not-finished"
            className="fw-bolder"
            disabled
          > Non terminée </ToggleButton>
          <ToggleButton
            value=""
            variant="outline-rainbow"
            className="fw-bolder"
            disabled
          > Trolled </ToggleButton>
          <ToggleButton
            value=""
            variant="outline-fav"
            className="fw-bolder"
            disabled
            type='radio'
            name='azer'
          > Starred <FaStar className='button-icon' color={YELLOW} />
          </ToggleButton>
        </ButtonGroup>
      </div>
    </Row>
  );
}