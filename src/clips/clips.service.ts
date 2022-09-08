import { chain, find, forEach, includes, startsWith } from 'lodash';

import { Edition, FAV_SHEET, MapDifficulties, MapDifficulty, Sheet, SheetRef, SheetRefs, SpecialValue, SpecialValuesMapColor, Streamer } from '../models/consts';
import { TMMap } from '../models/map';

import { parseDate, transformClip } from './clips.utils';

function extractEditionAndStreamer(str: string): SheetRef | undefined {
  const sheets = Object.values(Sheet);
  const sheet = find(sheets, (s) => startsWith(str, s));
  return (sheet && SheetRefs[sheet]) || undefined;
}

type ValueRange = {
  range: string;
  values: [number, boolean, string, string, string, string | number][];
};
type FavValues = [number, boolean][];

function transformSpecialValue(specialValue: string | number) {
  const sv = `${specialValue}`;

  const colors = Object.values(SpecialValuesMapColor);
  const difficultyKey = find(colors, (color) => includes(sv, color));
  const difficulty = difficultyKey && MapDifficulties[difficultyKey] || MapDifficulty.NONE;

  return {
    fav: includes(sv, SpecialValue.FAV),
    firstToFinish: includes(sv, SpecialValue.FIRST_TO_FINISH),
    trolled: includes(sv, SpecialValue.TROLLED),
    difficulty,
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
        const { fav, firstToFinish, trolled, difficulty } = transformSpecialValue(specialValue);
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
          difficulty
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
