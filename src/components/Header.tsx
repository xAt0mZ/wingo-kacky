import { PropsWithChildren } from 'react';

import wingoLogo from './wingo.png';

type Props = {
  title: string;
};

export function Header({ title, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-row items-center justify-between">
      <span className="text-4xl font-bold text-theme-2">{title}</span>
      {children}
      <div className="flex flex-row items-center gap-2">
        <img
          width={32}
          height={32}
          src={wingoLogo}
          className="shrink-0 rounded-2xl bg-theme-6"
        />
        <span className="text-base font-medium text-theme-2">Wingo</span>
      </div>
    </div>
  );
}
