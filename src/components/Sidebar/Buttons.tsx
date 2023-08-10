import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  FlagIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';

import { Paths } from 'router';

import logo from './logo.png';

type ButtonsProps = {
  labels?: boolean;
  row?: boolean;
  hide?: () => void;
};
export function Buttons({ labels, row, hide }: ButtonsProps) {
  return (
    <>
      <Item
        to={Paths.HOME}
        label={labels ? 'Accueil' : ''}
        icon={HomeIcon}
        row={row}
        hide={hide}
      />
      <Item
        to={Paths.MAPS}
        label={labels ? 'Cartes' : ''}
        icon={FlagIcon}
        row={row}
        hide={hide}
      />
      <Item
        to={Paths.STATS}
        label={labels ? 'Statistiques' : ''}
        icon={PresentationChartBarIcon}
        row={row}
        hide={hide}
      />
    </>
  );
}

type ItemProps = {
  to: string;
  label?: string;
  icon: typeof HomeIcon;
  row?: boolean;
  hide?: () => void;
};

function Item({ to, label, icon: Icon, row, hide }: ItemProps) {
  return (
    <Link
      to={to}
      className={clsx(
        'flex content-center items-center text-white-neutral',
        row ? 'w-full flex-row gap-2' : 'w-20 flex-col gap-1'
      )}
      onClick={hide}
    >
      <Icon className={clsx('sm:h-8 sm:w-8', row ? 'h-5 w-5' : 'h-6 w-6')} />
      {label && (
        <span
          className={clsx(row ? 'text-base font-bold' : 'text-xs font-medium')}
        >
          {label}
        </span>
      )}
    </Link>
  );
}

export function LogoButton({ hide }: { hide?: () => void }) {
  return (
    <Link to={Paths.HOME} className="self-center" onClick={hide}>
      <img src={logo} />
    </Link>
  );
}
