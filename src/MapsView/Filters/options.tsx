import { Option } from '@/components/Select';

import { OrderBy, Status } from '../useMapsFilters';

function opt<T>(name: string, item: T): Option<T> {
  return { name, item };
}

export const LOCALE_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const orderByNumber = opt<OrderBy>('Numéro', 'number');
export const orderByDate = opt<OrderBy>('Date', 'date');
export const orderByOptions = [orderByNumber, orderByDate];

export const statusAll = opt<Status>('Toutes', 'all');
export const statusFinished = opt<Status>('Terminées', 'finished');
export const statusUnfinished = opt<Status>('Non terminées', 'unfinished');
export const statusFirst = opt<Status>('1er à terminer', 'first');
export const statusOptions = [
  statusAll,
  statusFinished,
  statusUnfinished,
  statusFirst,
];

export const allDatesOption = opt<undefined>('Toutes les dates', undefined);
