import { LOCALE_DATE_OPTIONS, LOCALE_LANG } from "./filters";

/**
 * Model for date field in Map
 * @param {Date} date 
 * @returns 
 */
function DateField(date) {
  return {
    date: date,
    localeDateString: date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS),
    localeTimeString: date.toLocaleTimeString(LOCALE_LANG)
  }
}

/**
 * Model representing a Map
 * @param {int} id 
 * @param {String} streamer 
 * @param {Boolean} finished 
 * @param {DateField} date 
 * @param {String} time 
 * @param {String} clip 
 * @returns 
 */
function Map(id, streamer, finished, date, time, clip) {
  return { id, streamer, finished, date, time, clip }
}

function extractStreamer(str) {
  return str.match(/((WINGO)|(JR))!/)[1];
}

function transformClip(str) {
  let clip = str.match(/(https:\/\/clips\.twitch\.tv\/)(.+)";/);
  if (clip) {
    clip = `${clip[1]}embed?clip=${clip[2]}&parent=${process.env.REACT_APP_IFRAME_PARENT}`;
  } else {
    clip = str.match(/(https:\/\/streamable\.com\/)(.+)";/);
    clip = `${clip[1]}o/${clip[2]}`;
  }
  return clip;
}

function normalizeValues([D, M, Y, h, m, s]) {
  const parse = (x, def = 0) => x ? parseInt(x) : def;

  D = parse(D);
  M = parse(M, 8) - 1;
  Y = parse(Y, 2021);
  h = parse(h);
  m = parse(m);
  s = parse(s);
  return [Y, M, D, h, m, s];
}

function parseDate(str) {
  const [date, time] = str.split(' ');
  const [D, M, Y] = date.split('/');
  let [h, m, s] = [0, 0, 0];
  if (time) {
    [h, m, s] = time.split(':');
  }
  return new Date(...normalizeValues([D, M, Y, h, m, s]));
}

export function extractMaps(data) {
  return data.valueRanges.map((r) => {
    const streamer = extractStreamer(r.range);

    return r.values.map((v) => {
      let [id, finished, date, time, clip] = v;

      if (!finished) {
        return new Map(id, streamer, finished);
      }
      date = date && date !== '' ? parseDate(date) : new Date();
      time = time || '';
      clip = clip ? transformClip(clip) : undefined;
      return new Map(id, streamer, finished, new DateField(date), time, clip)
    })
  }).flat();
}