import wingoLogo from './wingo.png';

export function Header() {
  return (
    <div className="flex flex-row items-center justify-between">
      <span className="text-4xl font-bold text-purple-blue">Dashboard</span>
      <div className="flex flex-row items-center gap-2">
        <img width={32} height={32} src={wingoLogo} className="shrink-0 rounded-2xl bg-gray-light" />
        <span className="text-base font-medium text-purple-blue">Wingo</span>
      </div>
    </div>
  );
}

function header() {
  return (
    <>
      <div className="absolute left-[169px] top-[49px] text-4xl font-bold text-violet-950">Dashboard</div>
      <div className="absolute left-[1135px] top-[49px] inline-flex items-center justify-start gap-6">
        <div className="flex items-center justify-start gap-2">
          <div className="text-[16px] font-bold text-violet-950">Leaderboard</div>
          <div className="relative h-4 w-4" />
        </div>
        <div className="absolute left-[393px] top-[51px] inline-flex w-[280px] items-center justify-between gap-2 rounded-lg border border-violet-100 bg-zinc-100 px-6 py-3.5">
          <div className="flex items-center justify-start gap-2">
            <img className="h-[27px] w-[27px]" src="https://via.placeholder.com/27x27" />
            <div className="text-[16px] font-medium text-violet-950">Kacky - Trackmania</div>
          </div>
          <div className="relative h-4 w-4" />
        </div>
        <div className="absolute left-[170px] top-[107px] inline-flex items-center justify-start gap-[7px] rounded-lg">
          <div className="relative h-8 w-8">
            <div className="absolute left-0 top-0 h-8 w-8 rounded-full bg-violet-100" />
            <img className="absolute left-0 top-0 h-8 w-8 rounded-full" src="https://via.placeholder.com/32x32" />
          </div>
          <div className="text-[16px] font-medium text-violet-950">Wingo</div>
        </div>
        <div className="flex items-center justify-start gap-2 rounded-lg bg-violet-100 px-6 py-3.5">
          <div className="relative h-4 w-4" />
          <div className="text-[16px] font-medium text-violet-950">7/75 terminées</div>
        </div>
        <div className="flex items-center justify-start gap-2 rounded-lg bg-indigo-600 px-6 py-3.5">
          <div className="relative h-4 w-4">
            <div className="absolute left-[5.33px] top-[5.33px] h-[5.33px] w-[5.33px] rounded-full bg-emerald-400" />
          </div>
          <div className="text-[16px] font-medium text-white">Voir le stream</div>
        </div>
      </div>
    </>
  );
}
