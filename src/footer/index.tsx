import { Row } from 'react-bootstrap';
import { useGlobalState } from '../hooks/useGlobalState';
import { MapDetails } from './components/MapDetails';
import { VideoPlayer } from './components/VideoPlayer';

export function Footer() {
  const { selectedMap } = useGlobalState();

  if (!selectedMap) return null;

  return (
    <Row className="flex-fill">
      <div className="hstack gap-2">
        <MapDetails map={selectedMap} />
        <VideoPlayer url={(selectedMap && selectedMap.clip) || ''} />
      </div>
    </Row>
  );
}