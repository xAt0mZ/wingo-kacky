import Row from 'react-bootstrap/Row';
import MapDetails from './MapDetails';

import VideoPlayer from './VideoPlayer';

export default function Footer(props) {
  return (
    <Row className="flex-fill">
      <div className="hstack gap-2">
        <MapDetails map={props.selectedMap} />
        <VideoPlayer URL={props.selectedMap ? props.selectedMap.clip : ''} />
      </div>
    </Row>
  );
}