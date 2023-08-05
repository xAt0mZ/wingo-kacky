import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  FlagIcon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';

import logo from './logo.png';

export function Buttons({ labels, row }: { labels?: boolean; row?: boolean }) {
  return (
    <>
      <Item to="/" label={labels ? 'Accueil' : ''} icon={HomeIcon} row={row} />
      <Item
        to="/maps"
        label={labels ? 'Cartes' : ''}
        icon={FlagIcon}
        row={row}
      />
      <Item
        to="/stats"
        label={labels ? 'Statistiques' : ''}
        icon={PresentationChartBarIcon}
        row={row}
      />
    </>
  );
}

type ItemProps = {
  to: string;
  label?: string;
  icon: typeof HomeIcon;
  row?: boolean;
};

function Item({ to, label, icon: Icon, row }: ItemProps) {
  return (
    <Link
      to={to}
      className={clsx(
        'flex content-center items-center text-white-neutral',
        row ? 'w-full flex-row gap-2' : 'w-20 flex-col gap-1'
      )}
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

export function LogoButton() {
  return (
    <Link to="/" className="self-center">
      <img src={logo} />
    </Link>
  );
}
