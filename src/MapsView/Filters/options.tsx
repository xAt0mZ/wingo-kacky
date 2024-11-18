import { Option } from '@/components/Select';
import { Difficulty } from '@/api/types';
import { UnionOf } from '@/utils';

import { OrderBy, Status } from './useMapsFilters';

function opt<T>(name: string, item: T): Option<T> {
  return { name, item };
}

export const orderByNumber = opt<OrderBy>('Numéro', 'number');
export const orderByDate = opt<OrderBy>('Date', 'date');
export const orderbyDifficulty = opt<OrderBy>('Difficulté', 'difficulty');
export const orderByOptions = [orderByNumber, orderByDate, orderbyDifficulty];

export const allDifficultiesOption = opt<Difficulty>('Toutes', 'all');
export const defaultDifficultyOptions = [
  allDifficultiesOption,
  opt<Difficulty>('Blanc', 'white'),
  opt<Difficulty>('Vert', 'green'),
  opt<Difficulty>('Bleu', 'blue'),
  opt<Difficulty>('Rouge', 'red'),
  opt<Difficulty>('Noir', 'black'),
];

const specificSeasons = [
  // 'Kacky Reloaded #5'
] as const;
export type SpecificSeasonName = UnionOf<typeof specificSeasons>;
export const seasonSpecificDifficultiesOptions: {
  [k in SpecificSeasonName]: Option<Difficulty>[];
} = {
  // 'Kacky Reloaded #5': [
  //   allDifficultiesOption,
  //   opt<Difficulty>('Vert', 'green'),
  //   opt<Difficulty>('Jaune', 'blue'),
  //   opt<Difficulty>('Rouge', 'red'),
  // ],
};
export const specificSeasonDifficultyColors: {
  [k in SpecificSeasonName]: { [k in Difficulty]?: string };
} = {
  // 'Kacky Reloaded #5': {
  //   blue: 'gold',
  // },
};

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
