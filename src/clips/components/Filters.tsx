import { Form, Row, Col } from 'react-bootstrap';

import { Edition, Streamer } from '../../models/consts';
import { useGlobalState } from '../../hooks/useGlobalState';

export function Filters() {
  const { filters: { selectedEdition, selectedStreamer, selectedDate, orderByFinishDate }, streamers, dates, dispatchFilterChange } = useGlobalState();

  return (
    <Row className="align-items-center fs-3">
      <Col xs={3}>
        <Form.Select
          aria-label="Edition select"
          onChange={(e) => dispatchFilterChange({ type: 'selectEdition', payload: e.target.value as Edition })}
          value={selectedEdition}>
          {Object.entries(Edition).map(([k, v]) =>
            <option key={k} value={v}>{v}</option>
          )}
        </Form.Select>
      </Col>
      <Col xs={2}>
        <Form.Select
          aria-label="Streamer select"
          onChange={(e) => dispatchFilterChange({ type: 'selectStreamer', payload: e.target.value as Streamer })}
          value={selectedStreamer}
        >
          {streamers.map((s) =>
            <option key={s}>{s}</option>
          )}
        </Form.Select>
      </Col>
      <Col xs={2}>
        <Form.Select
          aria-label="Date select"
          onChange={(e) => dispatchFilterChange({ type: 'selectDate', payload: e.target.value })}
          value={selectedDate}
        >
          {dates.map((d) =>
            <option key={d}>{d}</option>
          )}
        </Form.Select>
      </Col>
      <Col xs={5}>
        <span>Trier par numéro</span>
        <Form.Check
          inline
          type="switch"
          id="custom-switch"
          className="mx-3 fs-4"
          onChange={(e) => dispatchFilterChange({ type: 'orderByFinishDate', payload: e.target.checked })}
          checked={orderByFinishDate}
        />
        <span>ordre de finish</span>
      </Col>
    </Row>
  );
}