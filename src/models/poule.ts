import { LOCALE_DATE_OPTIONS, LOCALE_DATE_OPTIONS_WITH_HOUR, LOCALE_LANG } from './consts';

export class Poule {
  public localeDateString: string;

  public localeDateStringHour: string;

  constructor(
    public date: Date,
    public pouleCount: number = 0,
    public shakeCount: number = 0,
    public petCount: number = 0,
  ) {
    this.localeDateString = date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS);
    this.localeDateStringHour = date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS_WITH_HOUR);
  }
}