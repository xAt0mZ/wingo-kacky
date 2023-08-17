import { Season } from '@/api/types';

let selected: Season | undefined = undefined;

export function useSelectedSeason(): [Season | undefined, (s: Season) => void] {
  function setSelectedSeason(s: Season) {
    selected = s;
  }

  return [selected, setSelectedSeason];
}
