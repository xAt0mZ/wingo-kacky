import { chain, startsWith } from 'lodash';

import { POULE_SHEET } from '../models/consts';
import { Poule } from '../models/poule';

export type ValueRange = {
  range: string,
  values: [string, number, number][]
}

export function extractPoules({ valueRanges }: { valueRanges: ValueRange[] }) {
  return chain(valueRanges).flatMap(({ range, values }) => {
    if (startsWith(range, POULE_SHEET)) {
      if (!values) {
        return []
      }
      return values.map((v) => {
        const [dateRaw, pouleCount, shakeCount] = v;
        const date = new Date(dateRaw);
        return new Poule(date, pouleCount, shakeCount);
      });
    }
    return [];
  })
    .orderBy('date')
    .value();
}
