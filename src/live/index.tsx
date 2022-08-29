import { Col, Row } from 'react-bootstrap';

import { VStack } from '../components/VStack';

export function Live() {
  const liveUrl = `https://player.twitch.tv/?channel=wingobear&parent=${process.env.REACT_APP_DEPLOYMENT_URL}`;
  return (
    <VStack>
      <Row className="flex-fill h-100">
        <Col>
          <iframe
            width="100%"
            height="100%"
            title="Live video"
            src={liveUrl}
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            scrolling="no"
          />
        </Col>
      </Row>
    </VStack>
  );
}
