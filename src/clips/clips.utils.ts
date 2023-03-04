import { DateField } from '../models/dateField';

export function transformClip(str: string) {
  // twitch
  let matchArray = str.match(/(https:\/\/clips\.twitch\.tv\/)(.+?)(?:";|$)/);
  if (matchArray) {
    return `${matchArray[1]}embed?clip=${matchArray[2]}&parent=${process.env.REACT_APP_DEPLOYMENT_URL}`;
  }

  // streamable
  matchArray = str.match(/(https:\/\/streamable\.com\/)(.+?)(?:";|$)/);
  if (matchArray) {
    return `${matchArray[1]}o/${matchArray[2]}`;
  }

  // youtube short link
  matchArray = str.match(/(https:\/\/youtu.be\/)(.+?)(?:";|$)/);
  if (matchArray) {
    return `https://www.youtube-nocookie.com/embed/${matchArray[2]}`;
  }

  // youtube long link
  matchArray = str.match(/(https:\/\/www.youtube.com\/watch\?v=)(.+?)(?:";|$)/);
  if (matchArray) {
    return `https://www.youtube-nocookie.com/embed/${matchArray[2]}`;
  }
  return '';
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
