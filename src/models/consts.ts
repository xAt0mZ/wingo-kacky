export const LOCALE_LANG = 'fr-FR';
export const LOCALE_DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric' };
export const LOCALE_DATE_OPTIONS_WITH_HOUR: Intl.DateTimeFormatOptions = { year: "numeric", month: 'long', day: 'numeric', hour: 'numeric' };
export const ALL_DAYS = 'Tous les jours';

export const POULE_SHEET = "'KK7 POULES'";
export enum Sheet {
  KR2W = 'WINGO',
  KR2J = 'JR',
  K7W = "'WINGO KK7'",
};

export enum Edition {
  K7 = 'Kacky #7 - TMNF',
  KR2 = 'Kacky Reloaded 2 - TM2020',
}

export enum Streamer {
  WINGO = 'Wingo',
  JR = 'JR',
};

export type SheetRef = {
  edition: Edition,
  streamer: Streamer,
};

export const SheetRefs: {
  [k in Sheet]: {
    edition: Edition;
    streamer: Streamer;
  }
} = {
  [Sheet.KR2W]: { edition: Edition.KR2, streamer: Streamer.WINGO },
  [Sheet.KR2J]: { edition: Edition.KR2, streamer: Streamer.JR },
  [Sheet.K7W]: { edition: Edition.K7, streamer: Streamer.WINGO },
};
