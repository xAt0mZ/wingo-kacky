import { intlFormatDistance } from 'date-fns';
import { upperFirst } from 'lodash';

export function UpcomingMapsCard() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-gray-light p-4">
      <span className="text-lg font-bold text-purple-blue">À venir</span>
      <div className="flex flex-col gap-2">
        <Item mapNumber={200} server={3} time={new Date()} />
        <Item mapNumber={200} server={3} time={new Date()} />
        <Item mapNumber={200} server={3} time={new Date()} />
        <Item mapNumber={200} server={10} time={new Date()} />
      </div>
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
        <span className="rounded-2xl border border-gray-medium bg-white px-4 py-2 text-base font-medium text-purple-blue">{mapNumber}</span>
        <div className="inline-flex items-center gap-2">
          <div className="text-right text-base font-medium text-purple">{upperFirst(distance)}</div>
          <div className="h-4 w-0 border border-gray-medium"></div>
          <div className="text-left text-base font-medium text-purple-blue">Serveur {server}</div>
        </div>
      </div>
      <div className="border border-gray-medium last:hidden" />
    </>
  );
}

// function upcomingMapsCard() {
//   return (
//     <>
//       <div className="absolute left-[1268px] top-[613px] h-[295px] w-[378px] rounded-2xl bg-violet-100" />
//       <div className="absolute left-[1292px] top-[637px] text-[24px] font-bold text-violet-950">À venir</div>
//       <div className="absolute left-[1292px] top-[686px] inline-flex h-48 flex-col items-start justify-start gap-2">
//         <div className="inline-flex items-center justify-between gap-[72px] self-stretch">
//           <div className="flex items-start justify-start gap-2.5 rounded-2xl border border-zinc-200 bg-white px-4 py-2">
//             <div className="text-[16px] font-medium text-violet-950">209</div>
//           </div>
//           <div className="flex items-center justify-start gap-2">
//             <div className="text-right text-[16px] font-medium text-indigo-600">Dans 18 minutes</div>
//             <div className="h-[0px] w-[13px] origin-top-left rotate-90 border border-zinc-200"></div>
//             <div className="text-right text-[16px] font-medium text-violet-950">Serveur 7</div>
//           </div>
//         </div>
//         <div className="h-[0px] self-stretch border border-zinc-200"></div>
//         <div className="inline-flex items-center justify-between gap-[72px] self-stretch">
//           <div className="flex items-start justify-start gap-2.5 rounded-2xl border border-zinc-200 bg-white px-4 py-2">
//             <div className="text-[16px] font-medium text-violet-950">189</div>
//           </div>
//           <div className="flex items-center justify-start gap-2">
//             <div className="text-right text-[16px] font-medium text-indigo-600">Dans 34 minutes</div>
//             <div className="h-[0px] w-[13px] origin-top-left rotate-90 border border-zinc-200"></div>
//             <div className="text-right text-[16px] font-medium text-violet-950">Serveur 2</div>
//           </div>
//         </div>
//         <div className="h-[0px] self-stretch border border-zinc-200"></div>
//         <div className="inline-flex items-center justify-between gap-[72px] self-stretch">
//           <div className="flex items-start justify-start gap-2.5 rounded-2xl border border-zinc-200 bg-white px-4 py-2">
//             <div className="text-[16px] font-medium text-violet-950">160</div>
//           </div>
//           <div className="flex items-center justify-start gap-2">
//             <div className="text-right text-[16px] font-medium text-indigo-600">Dans 45 minutes</div>
//             <div className="h-[0px] w-[13px] origin-top-left rotate-90 border border-zinc-200"></div>
//             <div className="text-right text-[16px] font-medium text-violet-950">Serveur 5</div>
//           </div>
//         </div>
//         <div className="h-[0px] self-stretch border border-zinc-200"></div>
//         <div className="inline-flex items-center justify-between gap-[72px] self-stretch">
//           <div className="flex items-start justify-start gap-2.5 rounded-2xl border border-zinc-200 bg-white px-4 py-2">
//             <div className="text-[16px] font-medium text-violet-950">221</div>
//           </div>
//           <div className="flex items-center justify-start gap-2">
//             <div className="text-right text-[16px] font-medium text-indigo-600">Dans 1 heure 05</div>
//             <div className="h-[0px] w-[13px] origin-top-left rotate-90 border border-zinc-200"></div>
//             <div className="text-right text-[16px] font-medium text-violet-950">Serveur 1</div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
