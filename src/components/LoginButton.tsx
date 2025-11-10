import { useOAuthContext } from '@/providers/useOAuthContext';
import clsx from 'clsx';

export function LoginButton({ className }: { className?: string }) {
  const { getOAuthURL, logout, user } = useOAuthContext();
  const url = getOAuthURL();

  if (user) {
    return (
      <button
        className={clsx(
          'group flex flex-row items-center gap-2 rounded-lg px-6 py-3.5',
          'text-base font-medium',
          'bg-theme-4 text-white-neutral hover:bg-theme-2 border',
          'dark:border-theme-4 dark:bg-theme-7',
          'dark:hover:bg-theme-4 dark:hover:text-theme-7',
          className,
        )}
        onClick={() => logout()}
      >
        <TwitchLogo />
        Déconnexion
      </button>
    );
  }

  return (
    <a
      href={url}
      className={clsx(
        'group flex flex-row items-center gap-2 rounded-lg px-6 py-3.5',
        'text-base font-medium',
        'bg-theme-4 text-white-neutral hover:bg-theme-2 border',
        'dark:border-theme-4 dark:bg-theme-7',
        'dark:hover:bg-theme-4 dark:hover:text-theme-7',
        className,
      )}
    >
      <TwitchLogo />
      Connexion
    </a>
  );
}

function TwitchLogo() {
  return (
    <svg overflow="visible" width="24" height="24">
      <polygon
        points="7.8 4.8 4.8 7.8 4.8 18.6 8.4 18.6 8.4 21.6 11.4 18.6 13.8 18.6 19.2 13.2 19.2 4.8"
        className="fill-twitch-purple"
        x={0}
        y={0}
      />
      <polygon
        points="15.6 15 18 12.6 18 6 8.4 6 8.4 15 10.8 15 10.8 17.4 13.2 15"
        className="fill-white"
      />
      <path
        d="M12,8.4 L13.2,8.4 L13.2,12 L12,12 L12,8.4 Z M16.2,8.4 L16.2,12 L15,12 L15,8.4 L16.2,8.4 Z"
        className="fill-black"
      />
    </svg>
  );
}
