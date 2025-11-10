import { Star } from 'lucide-react';
import { useState } from 'react';

import { useSelectedMap } from '../useSelectedMap';
import { useVotes } from './useVotes';
import { useVote } from './useVote';
import { useVoteMutation } from './useVoteMutation';
import { useOAuthContext } from '@/providers/useOAuthContext';
import { LoginButton } from '@/components/LoginButton';
import clsx from 'clsx';

export function Votes() {
  const { selectedMap } = useSelectedMap();
  const { data: allVotes } = useVotes(selectedMap?.number);
  const { data: selfVote } = useVote(selectedMap?.number);
  const [hoverRating, setHoverRating] = useState(0);
  const { token } = useOAuthContext();

  const average = allVotes?.average ?? 0;
  const myVote = selfVote ?? 0;

  return (
    <div className="flex flex-col items-stretch gap-4">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Note de la communauté</span>
      </div>
      <div className="bg-theme-7 flex flex-col items-stretch rounded-2xl p-4 shadow-md">
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <StarButton key={value} value={value} max={average} disabled />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold">Ma note</span>
      </div>
      <div className="bg-theme-7 flex flex-col items-stretch rounded-2xl p-4 shadow-md">
        {token ? (
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <StarButton
                key={`my-${value}`}
                value={value}
                max={myVote}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
              />
            ))}
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  );
}

type DisabledStarProps = {
  disabled: true;
  hoverRating?: never;
  setHoverRating?: never;
};

type EnabledStarProps = {
  disabled?: false;
  hoverRating: number;
  setHoverRating: (r: number) => void;
};

export function StarButton({
  value,
  max,
  disabled,
  hoverRating,
  setHoverRating,
}: {
  value: number;
  max: number;
} & (DisabledStarProps | EnabledStarProps)) {
  const { selectedMap } = useSelectedMap();
  const addVoteMutation = useVoteMutation(selectedMap?.number);

  return (
    <button
      onClick={() => addVoteMutation.mutate(value)}
      onMouseEnter={() => (!disabled ? setHoverRating(value) : undefined)}
      onMouseLeave={() => (!disabled ? setHoverRating(0) : undefined)}
      className="transition-transform hover:scale-110 focus:outline-none active:scale-95"
      disabled={disabled}
    >
      <Star
        size={48}
        className={clsx(
          'transition-colors',
          value <= (hoverRating || max)
            ? 'fill-yellow-400 stroke-yellow-500'
            : 'fill-gray-200 stroke-gray-300',
        )}
      />
    </button>
  );
}
