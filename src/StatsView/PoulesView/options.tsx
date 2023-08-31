import { Option } from '@/components/Select';

import { DisplayBy } from './usePoulesFilters';

function opt<T>(name: string, item: T): Option<T> {
  return { name, item };
}

export const displayByDay = opt<DisplayBy>('Par jour', 'day');
export const displayByHour = opt<DisplayBy>('Par heure', 'hour');
export const displayByOptions = [displayByDay, displayByHour];
