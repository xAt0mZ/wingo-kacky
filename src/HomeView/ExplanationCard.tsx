import { PlayIcon } from '@heroicons/react/24/outline';

export function ExplanationCard() {
  return (
    <div className="relative flex flex-col content-center items-start gap-2.5 rounded-2xl bg-purple-dark">
      <div className="mx-6 mt-8 inline-flex flex-col items-start justify-start gap-4">
        <div className="text-lg font-bold text-gray-gold">Qu’est ce que le kacky ?</div>
        <div className="text-sm font-semibold text-white-neutral">
          Le kacky consiste à finir le plus de cartes possible, exploitant des bugs et autres tricks très spéciaux du jeu. Le Kacky Reloaded 3 se joue sur 75 maps
        </div>
      </div>
      <div className="h-40 w-full rounded-b-2xl bg-[url('https://via.placeholder.com/377x400')] bg-cover bg-center bg-no-repeat [clip-path:ellipse(60%_100%_at_bottom_center)]">
        <button className="h-12 w-12 rounded-full">
          <PlayIcon className="text-purple-blue" />
        </button>
      </div>
    </div>
  );
}

// bg-cover bg-center bg-no-repeat [clip-path:circle(100%_at_100%_50%)] [clip-path:ellipse(507px_440px_at_center_200%)]

function explanationCard() {
  return (
    <div className="absolute left-[993px] top-[178px] h-[400px] w-[655px]">
      <div className="absolute left-0 top-0 inline-flex h-[400px] w-[655px] items-center justify-start gap-2.5 rounded-2xl bg-indigo-950 px-12 py-[52px]">
        <div className="inline-flex flex-col items-start justify-start gap-4">
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="w-[200px] text-[24px] font-bold text-stone-50">Qu’est ce que le kacky ?</div>
          </div>
          <div className="w-[200px] text-[14px] font-semibold text-stone-50">
            Le kacky consiste à finir le plus de cartes possible, exploitant des bugs et autres tricks très spéciaux du jeu. Le Kacky Reloaded 3 se joue sur 75 maps
          </div>
        </div>
      </div>
      <img className="absolute left-[278px] top-0 h-[400px] w-[377px]" src="https://via.placeholder.com/377x400" />
      <div className="absolute left-[275px] top-[40px] h-[73px] w-[73px]">
        <div className="absolute left-0 top-0 h-[73px] w-[73px] rounded-full bg-white" />
      </div>
    </div>
  );
}
