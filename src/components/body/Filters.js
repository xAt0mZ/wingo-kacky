import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Filters(props) {
  return (
    <Form>
      <Row className="align-items-center fs-3">
        <Col>
          <Form.Select aria-label="Filter select" onChange={(e) => props.onFilterChange(e.target.value)}>
            {props.options.map((o) =>
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
            onChange={(e) => props.onOrderChange(e.target.checked)}
          />
          <span>date</span>
        </Col>
      </Row>
    </Form>
  );
}