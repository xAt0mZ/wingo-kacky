export type TMMap = {
  _id: string;
  seasonId: string;
  number: number;
  current?: boolean;
  validated?: boolean;
  image?: string;
  video?: string;
  trolled?: boolean;
  finishedAt?: string;
  time?: string;
  first?: boolean;
  favorite?: boolean;
};

export type SeasonSummary = {
  _id: string;
  name: string;
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
};
