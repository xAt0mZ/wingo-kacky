import clsx from 'clsx';
import { HiOutlineFlag, HiOutlineHome, HiOutlinePresentationChartBar } from 'react-icons/hi';
import { IconType } from 'react-icons';

export function Sidebar() {
  return (
    <>
      <div className="fixed z-10 h-16 w-full shrink-0 justify-evenly bg-purple-dark md:h-[calc(100%-3rem)] md:w-[100px] md:rounded-2xl"></div>
      <div className={clsx('fixed bottom-0 z-10 h-20 w-full rounded-t-lg bg-purple-dark', 'flex flex-row items-center justify-evenly', 'md:hidden')}>
        <Item label="Accueil" icon={HiOutlineHome} />
        <Item label="Cartes" icon={HiOutlineFlag} />
        <Item label="Statistiques" icon={HiOutlinePresentationChartBar} />
      </div>
      {/* ghost div to compensate the fixed sidebar in the relative flow */}
      <div className="h-16 w-full shrink-0 md:h-full md:w-[100px]" />
    </>
  );
}

type ItemProps = {
  label: string;
  icon: IconType;
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
