import Row from 'react-bootstrap/Row';

export function ErrorMessage() {
  return (
    <Row>
      <span className="d-block fs-1 mx-auto">Impossible de récupérer les données</span>
      <span className="fs-1 d-block mx-auto">Recharge la page</span>
    </Row>
  );
}
