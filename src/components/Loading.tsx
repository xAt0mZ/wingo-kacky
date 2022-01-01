import { Container, Spinner } from 'react-bootstrap';

export function LoadingScreen() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ width: "100vh", height: "100vh" }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}