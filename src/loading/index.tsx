import { Container } from 'react-bootstrap';
import { LoadingSpinner } from './components/LoadingSpinner';

export function LoadingScreen() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ width: "100vh", height: "100vh" }}>
      <LoadingSpinner></LoadingSpinner>
    </Container>
  );
}