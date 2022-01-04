import { Edition, Streamer } from './consts';
import { DateField } from './dateField';

export class TMMap {
  constructor(
    public id: number,
    public edition: Edition,
    public streamer: Streamer,
    public clip: string,
    public finished: boolean = false,
    public firstToFinish: boolean = false,
    public date?: DateField,
    public time?: string
  ) { }
}
