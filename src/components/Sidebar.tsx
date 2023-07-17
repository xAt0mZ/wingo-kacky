import clsx from 'clsx';
import { HomeIcon, FlagIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';

export function Sidebar() {
  return (
    <>
      <div className="fixed z-10 h-16 w-full shrink-0 justify-evenly bg-purple-dark sm:h-[calc(100%-3rem)] sm:w-[105px] sm:rounded-2xl">
        <div className="text-center text-white">
          <span className="sm:hidden">xs</span>
          <span className="hidden sm:block md:hidden">sm</span>
          <span className="hidden md:block lg:hidden ">md</span>
          <span className="hidden lg:block xl:hidden ">lg</span>
          <span className="hidden xl:block 2xl:hidden ">XL</span>
          <span className="hidden 2xl:block ">2XL</span>
        </div>
      </div>
      <div className={clsx('fixed bottom-0 z-10 h-20 w-full rounded-t-lg bg-purple-dark', 'flex flex-row items-center justify-evenly', 'sm:hidden')}>
        <Item label="Accueil" icon={HomeIcon} />
        <Item label="Cartes" icon={FlagIcon} />
        <Item label="Statistiques" icon={PresentationChartBarIcon} />
      </div>
      {/* ghost div to compensate the fixed sidebar in the relative flow */}
      <div className="h-16 w-full shrink-0 sm:h-full sm:w-[100px]" />
    </>
  );
}

type ItemProps = {
  label: string;
  icon: typeof HomeIcon;
};

function Item({ label, icon: Icon }: ItemProps) {
  return (
    <div className="flex w-20 flex-col content-center items-center gap-1 text-white">
      <Icon className="h-6 w-6" />
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

/* <img className="absolute left-[26px] top-[46px] h-[51px] w-[52px]" src="https://via.placeholder.com/52x51" /> */
/* <div className="absolute left-[32px] top-[25px] h-[961px] w-[105px]">
        <div className="absolute left-0 top-0 h-[961px] w-[105px] rounded-2xl bg-indigo-950" />
        <img className="absolute left-[26px] top-[46px] h-[51px] w-[52px]" src="https://via.placeholder.com/52x51" />
        <div className="absolute left-[36px] top-[352px] inline-flex flex-col items-start justify-start gap-20">
          <div className="relative h-8 w-8" />
          <div className="relative h-8 w-8" />
          <div className="relative h-8 w-8" />
        </div>
        <div className="absolute left-[37px] top-[882px] h-8 w-8" />
      </div> */
