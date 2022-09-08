import { Edition, Streamer } from './consts';
import { DateField } from './dateField';

export interface TMMap {
  id: number;
  edition: Edition;
  streamer: Streamer;
  clip: string;
  finished: boolean;
  date?: DateField;
  time?: string;
  fav: boolean;
  firstToFinish: boolean;
  trolled: boolean;
}
