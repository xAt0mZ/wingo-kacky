import { Sheets } from '../api';

export const LOCALE_LANG: string = 'fr-FR';
export const LOCALE_DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric' };
export const ALL_DAYS: string = 'Tous les jours';

export enum Edition {
  K7 = 'Kacky #7 - TMNF',
  KR2 = 'Kacky Reloaded 2 - TM2020',
}

export enum Streamer {
  WINGO = 'Wingo',
  JR = 'JR'
};

export const SheetMap: {
  [key in Sheets]: [Edition, Streamer];
} = {
  'WINGO': [Edition.KR2, Streamer.WINGO],
  'JR': [Edition.KR2, Streamer.JR],
  'WINGO KK7': [Edition.K7, Streamer.WINGO]
}
