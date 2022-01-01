import { chain, concat, forIn, reduce, startsWith } from 'lodash';

import { ALL_DAYS, Sheet, SheetRef, SheetRefs } from '../models/consts';
import { DateField } from '../models/dateField';
import { EditionMap } from '../models/editionMap';
import { TMMap } from '../models/map';

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

  return undefined;
}

function transformClip(str: string) {
  let clip = str.match(/(https:\/\/clips\.twitch\.tv\/)(.+?)(?:";|$)/) || '';
  if (clip) {
    clip = `${clip[1]}embed?clip=${clip[2]}&parent=${process.env.REACT_APP_IFRAME_PARENT}`;
  } else {
    clip = str.match(/(https:\/\/streamable\.com\/)(.+?)(?:";|$)/) || '';
    clip = `${clip[1]}o/${clip[2]}`;
  }
  return clip;
}

function normalizeValues(
  [Y, M, D, h, m, s]: [string, string, string, string, string, string]
): [number, number, number, number, number, number] {

  function parse(x: string, def = 0) {
    return x ? parseInt(x, 10) : def;
  }

  return [
    parse(Y, 2021),
    parse(M, 8) - 1,
    parse(D),
    parse(h),
    parse(m),
    parse(s)
  ];
}

function parseDate(str: string) {
  const [date, time] = str.split(' ');
  const [D, M, Y] = date.split('/');
  let [h, m, s] = ['', '', ''];
  if (time) {
    [h, m, s] = time.split(':');
  }
  return new Date(...normalizeValues([Y, M, D, h, m, s]));
}

type ValueRange = {
  range: string,
  values: [number, boolean, string, string, string, string | number][]
}

export function extractMaps({ valueRanges }: { valueRanges: ValueRange[] }): EditionMap {

  const allMaps = chain(valueRanges)
    .flatMap(({ range, values }) => {
      const ref = extractEditionAndStreamer(range);
      if (ref) {
        const { edition, streamer } = ref;
        return values.map((v) => {
          const [id, finished, datestring, rawTime, rawClip, firstToFinish] = v;

          if (!finished) {
            return new TMMap(id, edition, streamer, finished);
          }
          const date = datestring && datestring !== '' ? parseDate(datestring) : new Date();
          const time = rawTime || '';
          const clip = transformClip(rawClip);
          return new TMMap(id, edition, streamer, finished, firstToFinish === 1, new DateField(date), time, clip)
        });
      }
      return [];
    })
    .sortBy(['edition', 'streamer', 'id'])
    .value();

  const res = reduce(allMaps, (acc, map) => {
    const { edition, streamer } = map;

    acc[edition] = acc[edition] ?? {};
    acc[edition][streamer] = acc[edition][streamer] ?? { dates: [ALL_DAYS], maps: [] };
    acc[edition][streamer].maps.push(map);

    return acc;
  }, {} as EditionMap);

  forIn(res, (edition) => {
    forIn(edition, (streamer) => {
      const s = streamer;
      s.dates = concat(
        [ALL_DAYS],
        chain(streamer.maps)
          .filter({ finished: true })
          .sortBy('date.date')
          .map(m => m.date?.localeDateString || '')
          .uniq().without('')
          .value()
      );
    })
  });

  return res;
}