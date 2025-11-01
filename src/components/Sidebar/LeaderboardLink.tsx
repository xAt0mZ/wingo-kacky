import {
  ArrowTopRightOnSquareIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export function LeaderboardLink({
  row,
  labels,
  onClick,
}: {
  row?: boolean;
  labels?: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href="https://kacky.gg"
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'flex content-center items-center text-white-neutral',
        row ? 'w-full flex-row gap-2' : 'w-20 flex-col gap-1',
      )}
      onClick={onClick}
    >
      <TrophyIcon
        className={clsx('sm:h-8 sm:w-8', row ? 'h-5 w-5' : 'h-6 w-6')}
      />
      {labels && (
        <>
          <span className="text-base font-bold">Leaderboard</span>
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
        </>
      )}
    </a>
  );
}
