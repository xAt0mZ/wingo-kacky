export type TMMap = {
  _id: string;
  seasonId: string;
  number: number;
  validated?: boolean;
  image?: string;
  video?: string;
  trolled?: boolean;
  finishedAt?: Date;
  time?: string;
  first?: boolean;
  favorite?: boolean;
};

export type Season = {
  _id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  startMap: string;
  nbMaps: string;
  maps?: TMMap[];
};