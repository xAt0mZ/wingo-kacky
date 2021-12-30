import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Edition, Streamer } from '../../models/consts';
import { useGlobalState } from '../../hooks/useGlobalState';

export function Filters() {
  const { dispatch, selectedEdition, selectedStreamer, maps } = useGlobalState();
  const streamers = maps ? (Object.keys(maps[selectedEdition])) : [];
  const dates = maps ? maps[selectedEdition][selectedStreamer].dates : [];

  return (
    <Form className="ms-1">
      <Row className="align-items-center fs-3">
        <Col xs={3}>
          <Form.Select aria-label="Edition select" onChange={(e) => dispatch({ type: 'selectEdition', payload: e.target.value as Edition })}>
            {Object.entries(Edition).map(([k, v]) =>
              <option key={k} value={v}>{v}</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={2}>
          <Form.Select aria-label="Streamer select" onChange={(e) => dispatch({ type: 'selectStreamer', payload: e.target.value as Streamer })}>
            {streamers.map((s) =>
              <option key={s}>{s}</option>
            )}
          </Form.Select>
        </Col>
        <Col xs={2}>
          <Form.Select aria-label="Date select" onChange={(e) => dispatch({ type: 'selectDate', payload: e.target.value })}>
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
            onChange={(e) => dispatch({ type: 'orderByFinishDate', payload: e.target.checked })}
          />
          <span>ordre de finish</span>
        </Col>
      </Row>
    </Form>
  );
}