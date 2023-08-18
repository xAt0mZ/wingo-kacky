import { Option, Options } from '@/components/Select';

import { Filters, OrderBy, Status } from '../useMapsFilters';

export const LOCALE_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export type FilterOptions = {
  season: Options<Filters['season']>;
  orderBy: Options<Filters['orderBy']>;
  status: Options<Filters['status']>;
  date: Options<Filters['date']>;
};

export const orders: Options<OrderBy> = [
  {
    name: 'Numéro',
    item: 'number',
  },
  {
    name: 'Date',
    item: 'date',
  },
];

export const statuses: Options<Status> = [
  {
    name: 'Toutes',
    item: 'all',
  },
  {
    name: 'Terminées',
    item: 'finished',
  },
  {
    name: 'Non terminées',
    item: 'unfinished',
  },
];

export const allDates: Option<undefined> = {
  name: 'Toutes les dates',
  item: undefined,
};
