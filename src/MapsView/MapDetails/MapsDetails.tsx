import { TMMap } from 'api/types';

type Props = {
  map: TMMap;
};

export function MapDetails({ map }: Props) {
  return (
    <>
      <div className="flex w-full items-center justify-between rounded-t-3xl bg-white px-20 py-4">
        {map._id}
      </div>
      <div className="flex h-full w-full items-center justify-between bg-theme-1 text-white">
        {map._id}
      </div>
    </>
  );
}
