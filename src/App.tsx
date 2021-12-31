import { Container } from 'react-bootstrap';

import { Header } from './header';
import { Main } from './main';
import { Footer } from './footer';

export function App() {
  return (
    <Container className="vstack gap-2 p-0 pb-2 text-center" style={{ minHeight: "100vh" }}>
      <Header />
      <Main />
      <Footer />
    </Container>
  );
}
