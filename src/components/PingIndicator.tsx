import clsx from 'clsx';

type Props = {
  size: string;
  color: string;
};

export function PingIndicator({ size, color }: Props) {
  return (
    <span className={clsx('relative flex', size)}>
      <span
        className={clsx(
          'absolute inline-flex h-full w-full animate-ping rounded-full',
          color,
        )}
      />
      <span className={clsx('inline-flex h-2 w-2 rounded-full', color, size)} />
    </span>
  );
}
