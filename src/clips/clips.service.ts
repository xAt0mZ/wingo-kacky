import { chain, find, forEach, includes, startsWith } from 'lodash';

import { Edition, FAV_SHEET, Sheet, SheetRef, SheetRefs, SpecialValues, Streamer } from '../models/consts';
import { TMMap } from '../models/map';

import { parseDate, transformClip } from './clips.utils';

function extractEditionAndStreamer(str: string): SheetRef | undefined {
  if (startsWith(str, Sheet.K7W)) {
    return SheetRefs[Sheet.K7W];
  }

  if (startsWith(str, Sheet.KR2W)) {
    return SheetRefs[Sheet.KR2W];
  }

  if (startsWith(str, Sheet.KR2J)) {
    return SheetRefs[Sheet.KR2J];
  }

  if (startsWith(str, Sheet.KXD2W)) {
    return SheetRefs[Sheet.KXD2W];
  }

  if (startsWith(str, Sheet.KR3W)) {
    return SheetRefs[Sheet.KR3W];
  }

  if (startsWith(str, Sheet.KR3K)) {
    return SheetRefs[Sheet.KR3K];
  }

  if (startsWith(str, Sheet.KR3L)) {
    return SheetRefs[Sheet.KR3L];
  }

  if (startsWith(str, Sheet.KR3Init)) {
    return SheetRefs[Sheet.KR3Init];
  }

  return undefined;
}
type ValueRange = {
  range: string;
  values: [number, boolean, string, string, string, string | number][];
};
type FavValues = [number, boolean][];

function transformSpecialValue(specialValue: string | number) {
  const sv = `${specialValue}`;
  return {
    fav: includes(sv, SpecialValues.FAV),
    firstToFinish: includes(sv, SpecialValues.FIRST_TO_FINISH),
    trolled: includes(sv, SpecialValues.TROLLED),
  };
}

export function extractMaps({ valueRanges }: { valueRanges: ValueRange[] }): TMMap[] {
  return chain(valueRanges)
    .flatMap(({ range, values }): TMMap[] => {
      const ref = extractEditionAndStreamer(range);

      if (!ref) {
        return [];
      }
      const { edition, streamer } = ref;

      const maps = values.map(([id, finished, dateString, rawTime, rawClip, specialValue]): TMMap => {
        const clip = transformClip(rawClip);
        const { fav, firstToFinish, trolled } = transformSpecialValue(specialValue);
        let date;
        let time;
        if (finished) {
          date = parseDate(dateString);
          time = rawTime || '';
        }
        return {
          id,
          edition,
          streamer,
          clip,
          finished,
          date,
          time,
          fav,
          firstToFinish,
          trolled,
        };
      });

      if (edition === Edition.K7 && streamer === Streamer.WINGO) {
        const favRange = find(valueRanges, (r) => startsWith(r.range, FAV_SHEET));
        if (favRange) {
          const favValues = (<unknown>favRange.values) as FavValues;
          forEach(maps, (m) => {
            const tmpMap = m;
            const [, isFav] = find(favValues, ([id]) => id === m.id) || [0, false];
            tmpMap.fav = isFav;
          });
        }
      }
      return maps;
    })
    .sortBy(['edition', 'streamer', 'id'])
    .value();
}
