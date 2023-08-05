import { ComponentPropsWithoutRef } from 'react';
import {
  MoonIcon,
  SunIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

import { useTheme } from 'hooks/useTheme';
export function ThemeToggle({ labels }: { labels?: boolean }) {
  const { theme, setTheme, colorblind, setColorblind } = useTheme();
  const ThemeIcon = theme === 'light' ? MoonIcon : SunIcon;
  const ColorblindIcon = colorblind ? EyeIcon : EyeSlashIcon;
  return (
    <div className="flex flex-col gap-2">
      <Item
        onClick={() => setColorblind(!colorblind)}
        label={colorblind ? 'Mode par défaut' : 'Mode daltonien'}
        Icon={ColorblindIcon}
        labels={labels}
      />
      <Item
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        label={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
        Icon={ThemeIcon}
        labels={labels}
      />
    </div>
  );
}

type ItemProps = {
  label: string;
  Icon: typeof MoonIcon;
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
