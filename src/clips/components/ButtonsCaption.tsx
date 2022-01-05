import { Row, ToggleButton } from 'react-bootstrap';

export function ButtonsCaption() {
  return (
    <Row>
      <div className="hstack gap-2">
        <span>Légende des couleurs</span>
        <ToggleButton
          value="legend-demo"
          variant="outline-finished"
          className="fw-bolder"
          disabled
        > Terminée </ToggleButton>
        <ToggleButton
          value="legend-demo"
          variant="outline-first-to-finish"
          className="fw-bolder"
          disabled
        > First to finish </ToggleButton>
        <ToggleButton
          value="legend-demo"
          variant="outline-demo"
          className="fw-bolder"
          disabled
        > Clip de démo </ToggleButton>
        <ToggleButton
          value="legend-demo"
          variant="outline-not-finished"
          className="fw-bolder"
          disabled
        > Non terminée </ToggleButton>
        <ToggleButton
          value="legend-demo"
          variant="outline-rainbow"
          className="fw-bolder"
          disabled
        > Trolled </ToggleButton>
      </div>
    </Row>
  );
}