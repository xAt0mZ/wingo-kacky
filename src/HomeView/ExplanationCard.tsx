import { PlayIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';

export function ExplanationCard() {
  return (
    <div
      className={clsx(
        'grid h-full grid-cols-1 grid-rows-2 gap-2.5 rounded-2xl bg-theme-1',
        'md:min-h-[300px] md:grid-cols-2 md:grid-rows-1',
        'lg:grid-cols-1 lg:grid-rows-2',
        'xl:grid-cols-2 xl:grid-rows-1'
      )}
    >
      <div className="mx-6 my-4 flex flex-col justify-center gap-4">
        <div className="text-lg font-bold text-white-neutral">Qu’est ce que le kacky ?</div>
        <div className="text-sm font-semibold text-white-neutral">
          Le kacky consiste à finir le plus de cartes possible, exploitant des bugs et autres tricks très spéciaux du jeu. Le Kacky Reloaded 3 se joue sur 75 maps
        </div>
      </div>
      <div
        className={clsx(
          'relative',
          'before:absolute before:inset-0 before:bg-[url("https://via.placeholder.com/1920x1080")] before:bg-cover before:bg-center before:bg-no-repeat',
          'before:rounded-b-2xl before:[clip-path:ellipse(60%_100%_at_bottom_center)]',
          'before:md:rounded-r-2xl before:md:[clip-path:ellipse(100%_80%_at_right_center)]',
          'before:lg:rounded-b-2xl before:lg:[clip-path:ellipse(60%_100%_at_bottom_center)]',
          'before:xl:rounded-r-2xl before:xl:[clip-path:ellipse(100%_80%_at_right_center)]'
        )}
      >
        <button
          className={clsx(
            'relative left-[80%] top-[5%] h-12 w-12 rounded-full bg-theme-7 text-theme-2',
            'md:left-[5%] md:top-[10%]',
            'lg:left-[80%] lg:top-[5%]',
            'xl:left-[5%] xl:top-[10%]'
          )}
        >
          <PlayIcon className="m-auto h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
