import { Option } from '@/components/Select';
import { Difficulty } from '@/api/types';

import { OrderBy, Status } from './useMapsFilters';

function opt<T>(name: string, item: T): Option<T> {
  return { name, item };
}

export const orderByNumber = opt<OrderBy>('Numéro', 'number');
export const orderByDate = opt<OrderBy>('Date', 'date');
export const orderbyDifficulty = opt<OrderBy>('Difficulté', 'difficulty');
export const orderByOptions = [orderByNumber, orderByDate, orderbyDifficulty];

export const allDifficultiesOption = opt<Difficulty>('Toutes', 'all');
export const difficultyOptions = [
  allDifficultiesOption,
  opt<Difficulty>('Blanc', 'white'),
  opt<Difficulty>('Vert', 'green'),
  opt<Difficulty>('Bleu', 'blue'),
  opt<Difficulty>('Rouge', 'red'),
  opt<Difficulty>('Noir', 'black'),
];

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
