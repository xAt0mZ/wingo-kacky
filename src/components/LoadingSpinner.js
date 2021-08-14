import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner() {
  return (
    <Spinner animation="border" role="status" size="xxl">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}