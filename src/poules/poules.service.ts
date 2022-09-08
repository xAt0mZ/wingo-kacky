import { chain, find, startsWith, toPairs } from 'lodash';

import { Edition, PoulesSheets } from '../models/consts';

import { Poule } from './poules.types';

type ValueRange = {
  range: string,
  values: [string, number, number, number][]
}

const poulesSheets = toPairs(PoulesSheets);

export function extractPoules({ valueRanges }: { valueRanges: ValueRange[] }) {
  return chain(poulesSheets).flatMap(([edition, sheet]) => {
    if (!sheet) {
      return [];
    }
    const raw = find(valueRanges, ({ range }) => startsWith(range, sheet));
    if (raw) {
      const { values } = raw;
      if (!values) {
        return [];
      }
      return values.map((v) => {
        const [dateRaw, pouleCount, shakeCount, petCount] = v;
        return new Poule(edition as Edition, new Date(dateRaw), pouleCount, shakeCount, petCount);
      });
    }
    return [];
  })
    .orderBy('date')
    .value();
}
