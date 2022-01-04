import { VStack } from '../components/VStack';

import { ButtonsCaption } from './components/ButtonsCaption';
import { Filters } from './components/Filters';
import { MapDetails } from './components/map-details';
import { MapSelector } from './components/MapSelector';

export function Clips() {
  return (
    <VStack>
      <Filters />
      <ButtonsCaption />
      <MapSelector />
      <MapDetails />
    </VStack>
  );
}