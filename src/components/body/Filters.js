import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Filters({ options, onStreamerChange, onDateChange, onOrderChange }) {
  return (
    <Form className="ms-1">
      <Row className="align-items-center fs-3">
        <Col>
          <Form.Select aria-label="Date select" onChange={(e) => onDateChange(e.target.value)}>
            {options.map((o) =>
              <option key={o}>{o}</option>
            )}
          </Form.Select>
        </Col>
        <Col>
          <span>Trier par numéro</span>
          <Form.Check
            inline
            type="switch"
            id="custom-switch"
            className="mx-3 fs-4"
            onChange={(e) => onOrderChange(e.target.checked)}
          />
          <span>ordre de finish</span>
        </Col>
      </Row>
    </Form>
  );
}