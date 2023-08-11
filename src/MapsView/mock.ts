import { TMMap } from 'api/types';

export const maps: TMMap[] = Array.from({ length: 75 }, (_, i) => {
  const m = i + 101;
  return {
    _id: `${m}`,
    seasonId: '1',
    number: m,
    validated: m % 3 === 0,
    video: m % 4 === 0 ? '' : undefined,
    first: m % 15 === 0,
    image: 'https://via.placeholder.com/1920x1080',
    favorite: m % 10 === 0,
  };
});
