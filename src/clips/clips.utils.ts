import { DateField } from '../models/dateField';

export function transformClip(str: string) {
  let clip = '';
  let matchArray = str.match(/(https:\/\/clips\.twitch\.tv\/)(.+?)(?:";|$)/);
  if (matchArray) {
    clip = `${matchArray[1]}embed?clip=${matchArray[2]}&parent=${process.env.REACT_APP_DEPLOYMENT_URL}`;
  } else {
    matchArray = str.match(/(https:\/\/streamable\.com\/)(.+?)(?:";|$)/);
    if (matchArray) {
      clip = `${matchArray[1]}o/${matchArray[2]}`;
    }
  }
  return clip;
}

function normalizeValues([Y, M, D, h, m, s]: [string, string, string, string, string, string]): [number, number, number, number, number, number] {
  function parse(x: string, def = 0) {
    return x ? parseInt(x, 10) : def;
  }

  return [parse(Y, 2021), parse(M, 8) - 1, parse(D), parse(h), parse(m), parse(s)];
}

export function parseDate(dateString: string) {
  if (!dateString || dateString === '') {
    return new DateField(new Date());
  }
  const [date, time] = dateString.split(' ');
  const [D, M, Y] = date.split('/');
  let [h, m, s] = ['', '', ''];
  if (time) {
    [h, m, s] = time.split(':');
  }
  return new DateField(new Date(...normalizeValues([Y, M, D, h, m, s])));
}
