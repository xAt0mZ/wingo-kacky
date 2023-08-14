import { WIPPanel } from 'components/WipPanel';
import { intlFormatDistance } from 'date-fns';
import { upperFirst } from 'lodash';

export function UpcomingMapsCard() {
  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl bg-theme-6 p-4">
      <span className="text-lg font-bold text-theme-2">À venir</span>
      {import.meta.env.VITE_WIP && <WIPPanel />}
      {!import.meta.env.VITE_WIP && (
        <div className="my-auto flex flex-col justify-center gap-2">
          <Item mapNumber={200} server={3} time={new Date()} />
          <Item mapNumber={200} server={3} time={new Date()} />
          <Item mapNumber={200} server={3} time={new Date()} />
          <Item mapNumber={200} server={10} time={new Date()} />
        </div>
      )}
    </div>
  );
}

type ItemProps = {
  mapNumber: number;
  time: Date;
  server: number;
};

function Item({ mapNumber, time, server }: ItemProps) {
  const distance = intlFormatDistance(time, new Date(), { locale: 'fr-FR' });

  return (
    <>
      <div className="inline-flex items-center justify-between">
        <span className="rounded-2xl border border-theme-8 bg-theme-7 px-4 py-2 text-base font-medium text-theme-2">
          {mapNumber}
        </span>
        <div className="inline-flex items-center gap-2">
          <div className="text-right text-base font-medium text-theme-4">
            {upperFirst(distance)}
          </div>
          <div className="h-4 w-0 border border-theme-8"></div>
          <div className="text-left text-base font-medium text-theme-2">
            Serveur {server}
          </div>
        </div>
      </div>
      <div className="border border-theme-8 last:hidden" />
    </>
  );
}
