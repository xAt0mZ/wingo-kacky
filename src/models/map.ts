import { Edition, Streamer } from './consts';
import { DateField } from './dateField';

export class TMMap {
  constructor(
    public id: number,
    public edition: Edition,
    public streamer: Streamer,
    public finished: boolean = false,
    public firstToFinish: boolean = false,
    public date?: DateField,
    public time?: string,
    public clip?: string
  ) { }
}
