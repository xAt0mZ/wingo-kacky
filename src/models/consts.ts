import { BLUE, GREEN, RED, YELLOW } from './colors';

export const LOCALE_LANG = 'fr-FR';
export const LOCALE_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
export const LOCALE_DATE_OPTIONS_WITH_HOUR: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
};
export const ALL_DAYS = 'Tous les jours';

export const FAV_SHEET = "'[KK7] WINGO FAV'";
export const FAIL_SHEET = "'[KKR3] WINGO FAILS'";

export enum Sheet {
  KR2W = "'[KKR2] WINGO'",
  KR2J = "'[KKR2] JR'",
  K7W = "'[KK7] WINGO'",
  KXD2W = "'[KRxd] WINGO'",
  KR3W = "'[KKR3] WINGO'",
  KR3Init = "'[KKR3] Initiation'",
  KR3K = "'[KKR3] KHALEN'",
  KR3L = "'[KKR3] LAINK'",
}

export enum SpecialValuesMapColor {
  WHITE = 'white',
  GREEN = 'green',
  BLUE = 'blue',
  RED = 'red',
  BLACK = 'black',
}

export enum MapDifficulty {
  NONE = '',
  ALL = 'Toutes les difficultés',
  WHITE = 'Blanc',
  GREEN = 'Vert',
  BLUE = 'Bleu',
  RED = 'Rouge',
  BLACK = 'Noir',
}

export const MapDifficulties: {
  [k in SpecialValuesMapColor]: MapDifficulty;
} = {
  [SpecialValuesMapColor.WHITE]: MapDifficulty.WHITE,
  [SpecialValuesMapColor.GREEN]: MapDifficulty.GREEN,
  [SpecialValuesMapColor.BLUE]: MapDifficulty.BLUE,
  [SpecialValuesMapColor.RED]: MapDifficulty.RED,
  [SpecialValuesMapColor.BLACK]: MapDifficulty.BLACK,
};

export enum SpecialValue {
  TROLLED = 'troll',
  FIRST_TO_FINISH = 'first',
  FAV = 'fav',
}

export const SheetRanges: {
  [k in Sheet]: string[];
} = {
  [Sheet.KR2W]: ['A2:F33', 'G2:L33', 'M2:R12'],
  [Sheet.KR2J]: ['A2:F33', 'G2:L33', 'M2:R12'],
  [Sheet.K7W]: ['A2:F33', 'G2:L33', 'M2:R12'],
  [Sheet.KXD2W]: ['A2:F33', 'G2:L20'],
  [Sheet.KR3W]: ['A2:F33', 'G2:L33', 'M2:R12'],
  [Sheet.KR3K]: ['A2:F33', 'G2:L33', 'M2:R12'],
  [Sheet.KR3L]: ['A2:F33', 'G2:L33', 'M2:R12'],
  [Sheet.KR3Init]: ['A2:F'],
};

export enum Edition {
  K7 = 'Kacky #7 - TMNF',
  KR2 = 'Kacky Reloaded 2 - TM2020',
  KXD2 = 'Kacky Remixed 2 - TM2020',
  KR3 = 'Kacky Reloaded 3 - TM2020',
}

// default edition selected when loading pages
export const DEFAULT_EDITION = Edition.KR3;

export const PoulesSheets: {
  [k in Edition]: string;
} = {
  [Edition.KR2]: '',
  [Edition.K7]: "'[KK7] POULES'",
  [Edition.KR3]: "'[KKR3] POULES'",
  [Edition.KXD2]: "'[KRxd] POULES'",
};

export enum Streamer {
  WINGO = 'Wingo',
  JR = 'JR',
  KHALEN = 'Khalen',
  LAINK = 'Laink',
  INITIATION = 'Initiation',
}

export const StreamerColors: {
  [k in Streamer]: string;
} = {
  [Streamer.WINGO]: BLUE,
  [Streamer.JR]: RED,
  [Streamer.KHALEN]: RED,
  [Streamer.LAINK]: GREEN,
  [Streamer.INITIATION]: YELLOW,
};

export type SheetRef = {
  edition: Edition;
  streamer: Streamer;
};

export const SheetRefs: {
  [k in Sheet]: {
    edition: Edition;
    streamer: Streamer;
  };
} = {
  [Sheet.KR2W]: { edition: Edition.KR2, streamer: Streamer.WINGO },
  [Sheet.KR2J]: { edition: Edition.KR2, streamer: Streamer.JR },
  [Sheet.K7W]: { edition: Edition.K7, streamer: Streamer.WINGO },
  [Sheet.KXD2W]: { edition: Edition.KXD2, streamer: Streamer.WINGO },
  [Sheet.KR3W]: { edition: Edition.KR3, streamer: Streamer.WINGO },
  [Sheet.KR3K]: { edition: Edition.KR3, streamer: Streamer.KHALEN },
  [Sheet.KR3L]: { edition: Edition.KR3, streamer: Streamer.LAINK },
  [Sheet.KR3Init]: { edition: Edition.KR3, streamer: Streamer.INITIATION },
};
