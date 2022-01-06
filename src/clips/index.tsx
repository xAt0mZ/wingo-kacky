import { VStack } from '../components/VStack';

import { MapsFilters } from './components/MapsFilters';
import { Filters } from './components/Filters';
import { MapDetails } from './components/map-details';
import { MapSelector } from './components/MapSelector';

export function Clips() {
  return (
    <VStack>
      <Filters />
      <MapsFilters />
      <MapSelector />
      <MapDetails />
    </VStack>
  );
}