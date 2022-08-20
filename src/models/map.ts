import { includes } from 'lodash';

import { Edition, SpecialValues, Streamer } from './consts';
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
      if (includes(`${specialValue}`, SpecialValues.TROLLED)) this.trolled = true;
      if (includes(`${specialValue}`, SpecialValues.FIRST_TO_FINISH)) this.firstToFinish = true;
      if (includes(`${specialValue}`, SpecialValues.FAV)) this.fav = true;
    }
  }
}
