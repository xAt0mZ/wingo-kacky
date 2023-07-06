import { Col, Row } from 'react-bootstrap';

import { TMMap } from '../../../../models/map';

interface Props {
  map?: TMMap;
}

export function MapInfo({ map }: Props) {
  if (!map || !map.clip) {
    return null;
  }

  return (
    <>
      <Row>
        <Col>
          <span className="fs-1">{map.id}</span>
        </Col>
        <Col>
          <span className="fs-1">{map.time}</span>
        </Col>
      </Row>
      <Row>
        <Col>
        <span>
          {map.date?.localeDateString}&nbsp;&nbsp;{map.date?.localeTimeString}
        </span>
        </Col>
      </Row>
    </>
  );
}
