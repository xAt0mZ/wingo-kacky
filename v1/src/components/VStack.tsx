import clsx from 'clsx';
import { CSSProperties, PropsWithChildren } from 'react';
import { Container } from 'react-bootstrap';

interface Props {
  style?: CSSProperties;
  className?: string;
  pure?: boolean;
};

export function VStack({
  children,
  style,
  pure = false,
  className = "gap-2 p-0 pb-2 text-center flex-fill h-100",
}: PropsWithChildren<Props>) {

  if (pure) {
    return (
      <div className={clsx(className, "vstack")} style={style}>
        {children}
      </div>
    );
  }

  return (
    <Container className={clsx(className, "vstack")} style={style}>
      {children}
    </Container>
  )
}