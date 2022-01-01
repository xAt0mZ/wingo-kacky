import { Edition, Streamer } from './consts';
import { TMMap } from './map';

export type EditionMap = {
  [k in Edition]: {
    [k in Streamer]: {
      dates: string[];
      maps: TMMap[];
    };
  }
}