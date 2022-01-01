import { Container, Row } from 'react-bootstrap';

export function ErrorScreen() {
  return (
    <Container className="d-flex align-items-center text-center" style={{ width: "100vh", height: "100vh" }}>
      <Row>
        <span className="d-block fs-1 mx-auto">Impossible de récupérer les données</span>
        <span className="fs-1 d-block mx-auto">Recharge la page</span>
      </Row>
    </Container>
  );
}

