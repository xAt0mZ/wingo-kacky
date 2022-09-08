import { VStack } from '../../../components/VStack';
import { useGlobalState } from '../../../hooks/useGlobalState';

import { MapInfo } from './components/MapInfo';
import { VideoPlayer } from './components/VideoPlayer';

export function MapDetails() {
  const { selectedMap } = useGlobalState();

  if (!selectedMap) return null;

  return (
    <VStack className="gap-2 p-0 pb-2 mt-1 text-center flex-fill h-100">
      <MapInfo map={selectedMap} />
      <VideoPlayer url={(selectedMap && selectedMap.clip) || ''} />
    </VStack>
  );
}
