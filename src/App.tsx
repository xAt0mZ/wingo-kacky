import { isEmpty } from 'lodash';
import { Container } from 'react-bootstrap';

import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

import { Header } from './header';
import { Main } from './main';
import { Footer } from './footer';
import { useGlobalState } from './hooks/useGlobalState';

const ErrorScreen = () =>
  <Container className="d-flex align-items-center text-center" style={{ width: "100vh", height: "100vh" }}>
    <ErrorMessage />
  </Container>

const LoadingScreen = () =>
  <Container className="d-flex justify-content-center align-items-center" style={{ width: "100vh", height: "100vh" }}>
    <LoadingSpinner></LoadingSpinner>
  </Container>

export function App() {
  const { maps } = useGlobalState();

  if (isEmpty(maps)) {
    return <LoadingScreen />
  }

  return (
    <Container className="vstack gap-2 p-0 pb-2 text-center" style={{ minHeight: "100vh" }}>
      <Header />
      <Main />
      <Footer />
    </Container>
  )
}