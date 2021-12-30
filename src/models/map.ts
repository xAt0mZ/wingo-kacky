import { trim } from 'lodash';
import { Sheets } from '../api';
import { Edition, LOCALE_DATE_OPTIONS, LOCALE_LANG, SheetMap, Streamer } from './consts';

class DateField {
  localeDateString: string;
  localeTimeString: string;

  constructor(public date: Date) {
    this.localeDateString = date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS);
    this.localeTimeString = date.toLocaleTimeString(LOCALE_LANG);
  }
}

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
  const match = str.match(/((WINGO)|(JR)|('WINGO KK7'))!/)!;
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
  const parse = (x: string, def = 0) => x ? parseInt(x) : def;

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
      let [id, finished, datestring, time, clip] = v;

      if (!finished) {
        return new TMMap(id, edition, streamer, finished);
      }
      const date = datestring && datestring !== '' ? parseDate(datestring) : new Date();
      time = time || '';
      clip = transformClip(clip);
      return new TMMap(id, edition, streamer, finished, false, new DateField(date), time, clip)
    })
  }).flat();
}