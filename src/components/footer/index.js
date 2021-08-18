import Row from 'react-bootstrap/Row';
import MapDetails from './MapDetails';

import VideoPlayer from './VideoPlayer';

export default function Footer({selectedMap}) {
  return (
    <Row className="flex-fill">
      <div className="hstack gap-2">
        <MapDetails map={selectedMap} />
        <VideoPlayer url={selectedMap ? selectedMap.clip : ''} />
      </div>
    </Row>
  );
}