import { Edition, Streamer } from './consts';
import { DateField } from './dateField';

export class TMMap {
  public fav = false;

  public firstToFinish = false;

  public trolled = false;

  constructor(
    public id: number,
    public edition: Edition,
    public streamer: Streamer,
    public clip: string,
    specialValue?: string | number,
    public finished: boolean = false,
    public date?: DateField,
    public time?: string
  ) {
    if (specialValue !== undefined) {
      switch (specialValue) {
        case 0:
          this.trolled = true;
          break;
        case 1:
          this.firstToFinish = true;
          break;
        default:
          break;
      }
    }
  }
}
