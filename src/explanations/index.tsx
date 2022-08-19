import { Col, Row } from 'react-bootstrap';

import { VStack } from '../components/VStack';

export function Explanations() {
  return (
    <VStack>
      <Row className='flex-fill h-100'>
        <Col>
        < iframe
          width="100%"
          height="50%"
          src="https://www.youtube-nocookie.com/embed/WyY7Yihd_1o"
          title="Le Kacky - Explications"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
        </Col>
        <Col>
        < iframe
          width="100%"
          height="50%"
          src="https://www.youtube-nocookie.com/embed/caX6BicmMos"
          title="Le Kacky - Explications"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
        </Col>
      </Row>
    </VStack>
  );
}
