import Row from 'react-bootstrap/Row';

import { TMMap } from '../models/map';
import { MapDetails } from './components/MapDetails';
import { VideoPlayer } from './components/VideoPlayer';

interface Props {
  selectedMap?: TMMap
}
export function Footer({selectedMap}: Props) {
  return (
    <Row className="flex-fill">
      <div className="hstack gap-2">
        <MapDetails map={selectedMap} />
        <VideoPlayer url={(selectedMap && selectedMap.clip) || ''} />
      </div>
    </Row>
  );
}