import { Row } from 'react-bootstrap';

import { useGlobalState } from '../../../hooks/useGlobalState';

import { MapInfo } from './components/MapInfo';
import { VideoPlayer } from './components/VideoPlayer';

export function MapDetails() {
  const { selectedMap } = useGlobalState();

  if (!selectedMap) return null;

  return (
    <Row className="flex-fill">
      <div className="hstack gap-2">
        <MapInfo map={selectedMap} />
        <VideoPlayer url={(selectedMap && selectedMap.clip) || ''} />
      </div>
    </Row>
  );
}