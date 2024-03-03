import { useQuery } from '@tanstack/react-query';
import {
  // addMinutes,
  addSeconds,
  differenceInMilliseconds,
  differenceInSeconds,
  // isBefore,
} from 'date-fns';
import { findIndex, orderBy, range } from 'lodash';

import { withError } from '@/react-query';
// import { axios } from '@/axios';

type Map = {
  number: number;
  author: string;
  // finished: boolean;
};

type APIServer = {
  serverNumber: number;
  serverDifficulty: string;
  maps: Map[];
  timeLimit: number; // in minutes
  timeLeft: number; // in seconds
};

// type Response = {
//   servers: APIServer[];
//   comptimeLeft: number;
// };

export type Server = {
  number: number;
  currentMap: Map;
  nextMap: Map;
  dateLimit: Date;
};

// const emptyMap: Map = {
//   author: '',
//   // finished: false,
//   number: 0,
// };
// async function get(): Promise<Server[]> {
//   const { data, headers } = await axios.get<Response>(`/rotations`);
//   return data.servers.map((s) => {
//     let dateLimit = addSeconds(new Date(headers['x-cache-date']), s.timeLeft);
//     let i = 1;
//     let nextMap = s.maps[i];
//     let currentMap = s.maps[i - 1];
//     while (isBefore(dateLimit, new Date())) {
//       dateLimit = addMinutes(dateLimit, s.timeLimit);
//       i++;
//       nextMap = s.maps[i];
//       currentMap = s.maps[i - 1];
//     }
//     return {
//       number: s.serverNumber,
//       currentMap: currentMap ?? emptyMap,
//       nextMap: nextMap ?? emptyMap,
//       dateLimit,
//     };
//   });
// }

const referenceDate = new Date('2024/03/04 00:05:00 GMT+1');
function mockAPIServer(
  serverNumber: number,
  mapNumber: number,
  timeLeft: number,
): APIServer {
  return {
    serverDifficulty: '',
    maps: [
      {
        author: '',
        number: mapNumber,
      },
    ],
    serverNumber: serverNumber + 1,
    timeLeft: timeLeft * 60,
    timeLimit: 10 * 60 + 15, // in seconds in mock for easy calculation + map change offset
  };
}
const refServ: APIServer[] = [
  mockAPIServer(0, 147, 8),
  mockAPIServer(1, 189, 8),
  mockAPIServer(2, 182, 8),
  mockAPIServer(3, 196, 8),
  mockAPIServer(4, 140, 8),
  mockAPIServer(5, 168, 8),
  mockAPIServer(6, 126, 8),
  mockAPIServer(7, 133, 8),
  mockAPIServer(8, 154, 8),
  mockAPIServer(9, 161, 8),
];

const mapsPool = range(126, 201);

function mockServersRotations(): Server[] {
  return refServ.map(({ serverNumber, timeLimit, maps }): Server => {
    // calculate the time passed between ref point and now
    const diffInSec = differenceInSeconds(new Date(), referenceDate);
    // estimate number of maps elapsed since ref point
    const numberOfPassedMapsSinceRef = Math.floor(diffInSec / timeLimit);
    // calculate remaining time (in seconds) of current (live) map
    const remainingTimeOfCurrent = Math.floor(
      timeLimit - (diffInSec - numberOfPassedMapsSinceRef * timeLimit),
    );
    // find index of reference map in server
    const refMapIndex = findIndex(
      mapsPool,
      (poolNumber) => poolNumber === maps[0].number,
    );
    // calculate current map index
    const currentMapIndex =
      (refMapIndex + numberOfPassedMapsSinceRef) % mapsPool.length;
    return {
      number: serverNumber,
      currentMap: {
        author: '',
        number: mapsPool[currentMapIndex],
      },
      nextMap: {
        author: '',
        number: mapsPool[(currentMapIndex + 1) % mapsPool.length], // assume all maps running in order on server
      },
      dateLimit: addSeconds(new Date(), remainingTimeOfCurrent),
    };
  });
}

const queryKeys = ['rotations', 'all'];

export function useServersRotation() {
  return useQuery(
    queryKeys,
    // () => get(),
    () => mockServersRotations(),
    {
      ...withError('Impossible de charger les rotations'),
      // enabled: !import.meta.env.VITE_DISABLE_EXTERNAL_CALLS,
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: 'always',
      refetchInterval: (data) => {
        if (!data) {
          return false;
        }

        const nextServer = orderBy(data, 'dateLimit', 'asc')[0];
        if (!nextServer) {
          return false;
        }
        const res = differenceInMilliseconds(nextServer.dateLimit, new Date());
        return res < 0 ? 0 : res;
      },
    },
  );
}
