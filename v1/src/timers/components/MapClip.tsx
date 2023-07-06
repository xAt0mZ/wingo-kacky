import { VideoPlayer } from '../../clips/components/map-details/components/VideoPlayer';
import { useSelectedMap } from '../hooks/useSelectedMap';

export function MapClip() {
  const { selectedMap } = useSelectedMap();

  return (
    <VideoPlayer url={selectedMap?.clip || ''} />
  )
}