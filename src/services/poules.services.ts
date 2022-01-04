import { chain, startsWith } from 'lodash';

import { POULE_SHEET } from '../models/consts';
import { Poule } from '../models/poule';

export type ValueRange = {
  range: string,
  values: [string, number][]
}

export function extractPoules({ valueRanges }: { valueRanges: ValueRange[] }) {
  return chain(valueRanges).flatMap(({ range, values }) => {
    if (startsWith(range, POULE_SHEET)) {
      if (!values) {
        return []
      }
      return values.map((v) => {
        const [dateRaw, count] = v;
        const date = new Date(dateRaw);
        return new Poule(date, count);
      });
    }
    return [];
  })
    .orderBy('date')
    .value();
}
