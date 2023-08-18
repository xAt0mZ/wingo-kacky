import { Option, Options } from '@/components/Select';

import { OrderBy, Status } from '../useMapsFilters';

export {
  orderByDate,
  orderByNumber,
  orderByOptions,
  statusAll,
  statusFinished,
  statusUnfinished,
  statusOptions,
  allDatesOption,
};

const orderByNumber: Option<OrderBy> = {
  name: 'Numéro',
  item: 'number',
};
const orderByDate: Option<OrderBy> = {
  name: 'Date',
  item: 'date',
};
const orderByOptions: Options<OrderBy> = [orderByNumber, orderByDate];

const statusAll: Option<Status> = {
  name: 'Toutes',
  item: 'all',
};
const statusFinished: Option<Status> = {
  name: 'Terminées',
  item: 'finished',
};
const statusUnfinished: Option<Status> = {
  name: 'Non terminées',
  item: 'unfinished',
};

const statusOptions: Options<Status> = [
  statusAll,
  statusFinished,
  statusUnfinished,
];

const allDatesOption: Option<undefined> = {
  name: 'Toutes les dates',
  item: undefined,
};
