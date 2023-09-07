import { ComponentPropsWithoutRef } from 'react';
import {
  MoonIcon,
  SunIcon,
  EyeIcon,
  EyeSlashIcon,
  BellIcon,
  BellSlashIcon,
} from '@heroicons/react/24/outline';

import { useSettings } from '@/hooks/useSettings';

import { IconType } from '@@/IconType';

export function ThemeToggle({ labels }: { labels?: boolean }) {
  const { theme, setTheme, colorblind, setColorblind, muted, setMuted } =
    useSettings();
  const ThemeIcon = theme === 'light' ? SunIcon : MoonIcon;
  const ColorblindIcon = colorblind ? EyeSlashIcon : EyeIcon;
  const MutedIcon = muted ? BellSlashIcon : BellIcon;
  return (
    <>
      <Item
        onClick={() => setMuted(!muted)}
        label={muted ? 'Silencieux' : 'Son activé'}
        Icon={MutedIcon}
        labels={labels}
      />
      <Item
        onClick={() => setColorblind(!colorblind)}
        label={colorblind ? 'Mode daltonien' : 'Mode par défaut'}
        Icon={ColorblindIcon}
        labels={labels}
      />
      <Item
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        label={theme === 'light' ? 'Mode clair' : 'Mode sombre'}
        Icon={ThemeIcon}
        labels={labels}
      />
    </>
  );
}

type ItemProps = {
  label: string;
  Icon: IconType;
  labels?: boolean;
} & ComponentPropsWithoutRef<'button'>;

function Item({ onClick, label, Icon, labels }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-row content-center items-center gap-2 text-white-neutral"
    >
      <Icon className="h-5 w-5 sm:h-8 sm:w-8" />
      {labels && <span className="text-base font-bold">{label}</span>}
    </button>
  );
}
