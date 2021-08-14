import Row from 'react-bootstrap/Row';

import VideoPlayer from './VideoPlayer';

export default function Footer(props) {
  return (
    <Row className="justify-content-center flex-fill">
      <VideoPlayer URL={props.selectedMap ? props.selectedMap.clip : ''} />
    </Row>
  );
}