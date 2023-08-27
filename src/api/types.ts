export type Difficulty = 'white' | 'green' | 'blue' | 'red' | 'black' | 'all';
export const DifficultyOrder: {
  [k in Difficulty]: number;
} = {
  all: 0,
  white: 1,
  green: 2,
  blue: 3,
  red: 4,
  black: 5,
};
export type TMMap = {
  _id: string;
  seasonId: string;
  number: number;
  validated?: boolean;
  image?: string;
  video?: string;
  trolled?: boolean;
  finishedAt?: string;
  time?: string;
  first?: boolean;
  favorite?: boolean;
  difficulty?: Difficulty;
};

export type SeasonSummary = {
  _id: string;
  name: string;
  game: string;
  current?: boolean;
  startAt: string;
  endAt: string;
  startMap: string;
  nbMaps: string;
};

export type Season = SeasonSummary & {
  maps?: TMMap[];
};

export type Rank = {
  name: string;
  start: number;
  end: number;
  image: string;
  next: string;
};
