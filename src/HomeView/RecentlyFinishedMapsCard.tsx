export function RecentlyFinishedMapsCard() {
  return null;
}

function recentlyFinishedMapsCard() {
  return (
    <>
      <div className="absolute left-[169px] top-[613px] h-[295px] w-[1010px] rounded-2xl bg-zinc-100" />
      <div className="absolute left-[231px] top-[736px] text-[24px] font-bold text-violet-950">
        Dernières cartes
        <br />
        terminées
      </div>
      <div className="absolute left-[473px] top-[670px] inline-flex items-end justify-start gap-6">
        <div className="inline-flex flex-col items-center justify-start gap-8 rounded-2xl border border-zinc-200 bg-white px-4 pb-6 pt-10">
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="inline-flex items-start justify-center gap-1">
              <div className="text-center text-[32px] font-bold text-violet-950">122</div>
            </div>
            <div className="w-[141px] text-center text-[14px] font-semibold text-violet-950">5ème</div>
          </div>
          <div className="inline-flex h-4 w-[60px] items-end justify-start gap-1">
            <div className="relative h-4 w-4" />
            <div className="text-[12px] font-medium text-slate-400">il y a 2h</div>
          </div>
        </div>
        <div className="inline-flex flex-col items-center justify-start gap-8 rounded-2xl border border-zinc-200 bg-white px-4 pb-6 pt-10">
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="inline-flex items-start justify-center gap-1">
              <div className="text-center text-[32px] font-bold text-violet-950">180</div>
            </div>
            <div className="w-[141px] text-center text-[14px] font-semibold text-violet-950">12ème</div>
          </div>
          <div className="inline-flex h-4 w-[60px] items-end justify-start gap-1">
            <div className="relative h-4 w-4" />
            <div className="text-[12px] font-medium text-slate-400">il y a 2h</div>
          </div>
        </div>
        <div className="inline-flex flex-col items-center justify-start gap-8 rounded-2xl border border-zinc-200 bg-white px-4 pb-6 pt-10">
          <div className="flex flex-col items-center justify-start gap-2">
            <div className="inline-flex items-start justify-center gap-1">
              <div className="text-center text-[32px] font-bold text-violet-950">201</div>
            </div>
            <div className="w-[141px] text-center text-[14px] font-semibold text-violet-950">8ème</div>
          </div>
          <div className="inline-flex h-4 w-[60px] items-end justify-start gap-1">
            <div className="relative h-4 w-4" />
            <div className="text-[12px] font-medium text-slate-400">il y a 2h</div>
          </div>
        </div>
        <div className="relative h-[186px] w-[173px]">
          <div className="absolute left-0 top-0 h-[186px] w-[173px]">
            <div className="absolute left-0 top-0 h-[186px] w-[173px] rounded-2xl bg-indigo-600" />
            <div className="absolute left-[54px] top-[48px] text-center text-[20px] font-semibold text-white">Voir toutes</div>
          </div>
          <div className="absolute left-[68px] top-[111px] h-[38px] w-[38px] rounded-full bg-white" />
          <div className="absolute left-[75px] top-[118px] h-6 w-6" />
        </div>
      </div>
    </>
  );
}
