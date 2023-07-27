import { intlFormatDistance } from 'date-fns';
import { ChevronRightIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

export function RecentlyFinishedMapsCard() {
  return (
    <div className="flex h-full flex-col items-stretch gap-4 rounded-2xl bg-gray-gold p-4">
      <div className="text-lg font-bold text-purple-blue">Dernières cartes terminées</div>
      <div className="flex grow flex-row flex-wrap gap-2">
        <FinishedMapItem mapNumber={10} time={new Date('2023/07/14')} rank="3e" />
        <FinishedMapItem mapNumber={20} time={new Date()} rank="3e" />
        <FinishedMapItem mapNumber={30} time={new Date()} rank="3e" />
        <FinishedMapItem mapNumber={40} time={new Date()} rank="3e" />
      </div>
      <button className="flex flex-row items-center justify-center gap-2 self-stretch rounded-lg bg-purple px-6 py-3.5">
        <ChevronRightIcon className="h-4 w-4 text-white" />
        <span className="text-base font-medium text-white">Voir toutes</span>
      </button>
    </div>
  );
}

type FinishedMapItemProps = {
  mapNumber: number;
  rank: string;
  time: Date;
};
function FinishedMapItem({ mapNumber, rank, time }: FinishedMapItemProps) {
  const distance = intlFormatDistance(new Date(time), new Date(), { locale: 'fr-FR' });
  return (
    <div className="flex shrink-0 grow-0 basis-[calc(50%-(1*.5rem/2))] flex-col items-center justify-center gap-8 rounded-2xl border border-gray-medium bg-white pb-6 pt-10 md:basis-[calc(25%-(3*.50rem/4))]">
      <div className="flex flex-col items-center gap-2">
        <div className="text-center text-2xl font-bold text-purple-blue">{mapNumber}</div>
        <div className="text-center text-sm font-semibold text-purple-blue">{rank}</div>
      </div>
      <div className="inline-flex items-end gap-1 text-gray-dark">
        <CalendarDaysIcon className="h-4 w-4" />
        <div className="text-xs font-medium ">{distance}</div>
      </div>
    </div>
  );
}

// function recentlyFinishedMapsCard() {
//   return (
//     <>
//       <div className="absolute left-[169px] top-[613px] h-[295px] w-[1010px] rounded-2xl bg-zinc-100" />
//       <div className="absolute left-[231px] top-[736px] text-[24px] font-bold text-violet-950">
//         Dernières cartes
//         <br />
//         terminées
//       </div>
//       <div className="absolute left-[473px] top-[670px] inline-flex items-end justify-start gap-6">
//         <div className="inline-flex flex-col items-center justify-start gap-8 rounded-2xl border border-zinc-200 bg-white px-4 pb-6 pt-10">
//           <div className="flex flex-col items-center justify-start gap-2">
//             <div className="inline-flex items-start justify-center gap-1">
//               <div className="text-center text-[32px] font-bold text-violet-950">122</div>
//             </div>
//             <div className="w-[141px] text-center text-[14px] font-semibold text-violet-950">5ème</div>
//           </div>
//           <div className="inline-flex h-4 w-[60px] items-end justify-start gap-1">
//             <div className="relative h-4 w-4" />
//             <div className="text-[12px] font-medium text-slate-400">il y a 2h</div>
//           </div>
//         </div>
//         <div className="inline-flex flex-col items-center justify-start gap-8 rounded-2xl border border-zinc-200 bg-white px-4 pb-6 pt-10">
//           <div className="flex flex-col items-center justify-start gap-2">
//             <div className="inline-flex items-start justify-center gap-1">
//               <div className="text-center text-[32px] font-bold text-violet-950">180</div>
//             </div>
//             <div className="w-[141px] text-center text-[14px] font-semibold text-violet-950">12ème</div>
//           </div>
//           <div className="inline-flex h-4 w-[60px] items-end justify-start gap-1">
//             <div className="relative h-4 w-4" />
//             <div className="text-[12px] font-medium text-slate-400">il y a 2h</div>
//           </div>
//         </div>
//         <div className="inline-flex flex-col items-center justify-start gap-8 rounded-2xl border border-zinc-200 bg-white px-4 pb-6 pt-10">
//           <div className="flex flex-col items-center justify-start gap-2">
//             <div className="inline-flex items-start justify-center gap-1">
//               <div className="text-center text-[32px] font-bold text-violet-950">201</div>
//             </div>
//             <div className="w-[141px] text-center text-[14px] font-semibold text-violet-950">8ème</div>
//           </div>
//           <div className="inline-flex h-4 w-[60px] items-end justify-start gap-1">
//             <div className="relative h-4 w-4" />
//             <div className="text-[12px] font-medium text-slate-400">il y a 2h</div>
//           </div>
//         </div>
//         <div className="relative h-[186px] w-[173px]">
//           <div className="absolute left-0 top-0 h-[186px] w-[173px]">
//             <div className="absolute left-0 top-0 h-[186px] w-[173px] rounded-2xl bg-indigo-600" />
//             <div className="absolute left-[54px] top-[48px] text-center text-[20px] font-semibold text-white">Voir toutes</div>
//           </div>
//           <div className="absolute left-[68px] top-[111px] h-[38px] w-[38px] rounded-full bg-white" />
//           <div className="absolute left-[75px] top-[118px] h-6 w-6" />
//         </div>
//       </div>
//     </>
//   );
// }
