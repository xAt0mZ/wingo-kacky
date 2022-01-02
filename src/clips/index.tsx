import { VStack } from '../components/VStack';

import { Filters } from './components/Filters';
import { MapDetails } from './components/map-details';
import { MapSelector } from './components/MapSelector';

export function Clips() {
  return (
    <VStack>
      <Filters />
      <MapSelector />
      <MapDetails />
    </VStack>
  );
}