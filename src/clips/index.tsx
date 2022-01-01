import { Filters } from './components/Filters';
import { MapDetails } from './components/map-details';
import { MapSelector } from './components/MapSelector';

export function Clips() {
  return (
    <>
      <Filters />
      <MapSelector />
      <MapDetails />
    </>
  );
}