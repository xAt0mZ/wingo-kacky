import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  FlagIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';

import { Paths } from 'router';

import logo from './logo.png';
import { IconType } from 'components/IconType';

type ButtonsProps = {
  labels?: boolean;
  row?: boolean;
  onClick?: () => void;
};
export function Buttons({ labels, row, onClick }: ButtonsProps) {
  return (
    <>
      <Item
        to={Paths.HOME}
        label={labels ? 'Accueil' : ''}
        icon={HomeIcon}
        row={row}
        onClick={onClick}
      />
      <Item
        to={Paths.MAPS}
        label={labels ? 'Cartes' : ''}
        icon={FlagIcon}
        row={row}
        onClick={onClick}
      />
      <Item
        to={Paths.STATS}
        label={labels ? 'Statistiques' : ''}
        icon={PresentationChartBarIcon}
        row={row}
        onClick={onClick}
      />
    </>
  );
}

type ItemProps = {
  to: string;
  label?: string;
  icon: IconType;
  row?: boolean;
  onClick?: () => void;
};

function Item({ to, label, icon: Icon, row, onClick }: ItemProps) {
  return (
    <Link
      to={to}
      className={clsx(
        'flex content-center items-center text-white-neutral',
        row ? 'w-full flex-row gap-2' : 'w-20 flex-col gap-1'
      )}
      onClick={onClick}
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

export function LogoButton({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to={Paths.HOME}
      className="fixed left-1/2 -translate-x-1/2 sm:static sm:self-center"
      onClick={onClick}
    >
      <img src={logo} />
    </Link>
  );
}
