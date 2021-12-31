import { trim } from 'lodash';

import { Sheets } from '@/api';

import { Edition, SheetMap, Streamer } from './consts';
import { DateField } from './dateField';

export class TMMap {
  constructor(
    public id: number,
    public edition: Edition,
    public streamer: Streamer,
    public finished: boolean = false,
    public firstToFinish: boolean = false,
    public date?: DateField,
    public time?: string,
    public clip?: string
  ) { }
}

function extractEditionAndStreamer(str: string) {
  const match = str.match(/((WINGO)|(JR)|('WINGO KK7'))!/);

  if (!match) return ['' as Edition, '' as Streamer] as const;

  return SheetMap[trim(match[1], '\'') as Sheets];
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

type NormalizedValues = [number, number, number, number, number, number];

function normalizeValues([Y, M, D, h, m, s]: [string, string, string, string, string, string]) {
  function parse(x: string, def = 0) {
    return x ? parseInt(x, 10) : def;
  }

  const normalizedValues: NormalizedValues = [
    parse(Y, 2021),
    parse(M, 8) - 1,
    parse(D),
    parse(h),
    parse(m),
    parse(s)
  ];
  return normalizedValues;
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
  values: [number, boolean, string, string, string, string][]
}

export function extractMaps({ valueRanges }: { valueRanges: ValueRange[] }) {
  return valueRanges.map(({ range, values }) => {
    const [edition, streamer] = extractEditionAndStreamer(range);

    return values.map((v) => {
      const [id, finished, datestring, rawTime, rawClip] = v;

      if (!finished) {
        return new TMMap(id, edition, streamer, finished);
      }
      const date = datestring && datestring !== '' ? parseDate(datestring) : new Date();
      const time = rawTime || '';
      const clip = transformClip(rawClip);
      return new TMMap(id, edition, streamer, finished, false, new DateField(date), time, clip)
    })
  }).flat();
}