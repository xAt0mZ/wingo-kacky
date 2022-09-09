import { chain, find, startsWith } from 'lodash';

import { transformClip } from '../clips/clips.utils';
import { FAIL_SHEET } from '../models/consts';

import { Fail } from './fails.types';

type ValueRange = {
  range: string;
  values: [number, string][];
};

export function extractFails({ valueRanges }: { valueRanges: ValueRange[] }): Fail[] {
  const failRange = find(valueRanges, (r) => startsWith(r.range, FAIL_SHEET));
  if (failRange) {
    return chain(failRange.values)
      .map(([id, clip], idx): Fail => {
        if (id && clip) {
          return {
            id,
            idx,
            clip: transformClip(clip),
          };
        }
        return {
          id: -1,
          idx: -1,
          clip: '',
        };
      })
      .filter((i) => i.id !== -1 && i.idx !== -1 && i.clip !== '')
      .value();
  }
  return [];
}
