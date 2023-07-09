import { LOCALE_DATE_OPTIONS, LOCALE_LANG } from './consts';

export class DateField {
  localeDateString: string;

  localeTimeString: string;

  constructor(public date: Date) {
    this.localeDateString = date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS);
    this.localeTimeString = date.toLocaleTimeString(LOCALE_LANG);
  }
}
