export function Footer() {
  return null;
}

function footer() {
  return (
    <div className="absolute left-[171px] top-[948px] inline-flex items-center justify-start gap-6">
      <div className="text-[32px] font-bold text-violet-950">Retrouvez-moi sur</div>
      <div className="flex items-start justify-start gap-4">
        <div className="flex items-start justify-start gap-2.5 rounded-2xl bg-zinc-100 px-4 py-2">
          <div className="flex items-center justify-start gap-2.5">
            <div className="relative h-4 w-4" />
            <div className="text-[16px] font-medium text-violet-950">Twitch</div>
          </div>
        </div>
        <div className="flex items-start justify-start gap-2.5 rounded-2xl bg-zinc-100 px-4 py-2">
          <div className="flex items-center justify-start gap-2.5">
            <div className="relative h-4 w-4" />
            <div className="text-[16px] font-medium text-violet-950">Discord</div>
          </div>
        </div>
        <div className="flex items-start justify-start gap-2.5 rounded-2xl bg-zinc-100 px-4 py-2">
          <div className="flex items-center justify-start gap-2.5">
            <div className="relative h-4 w-4" />
            <div className="text-[16px] font-medium text-violet-950">Twitter</div>
          </div>
        </div>
        <div className="flex items-start justify-start gap-2.5 rounded-2xl bg-zinc-100 px-4 py-2">
          <div className="flex items-center justify-start gap-2.5">
            <div className="relative h-4 w-4" />
            <div className="text-[16px] font-medium text-violet-950">Instagram</div>
          </div>
        </div>
        <div className="flex items-start justify-start gap-2.5 rounded-2xl bg-zinc-100 px-4 py-2">
          <div className="flex items-center justify-start gap-2.5">
            <div className="relative h-4 w-4">
              <img className="absolute left-[1.33px] top-[3.33px] h-[9.39px] w-[13.33px]" src="https://via.placeholder.com/13x9" />
            </div>
            <div className="text-[16px] font-medium text-violet-950">YouTube</div>
          </div>
        </div>
      </div>
    </div>
  );
}
