import { intlFormatDistance } from 'date-fns';
import { useEffect, useState } from 'react';

type FormatOptions = Partial<Parameters<typeof intlFormatDistance>[2]>;

export function Timer({
  time,
  options,
}: {
  time: Date;
  options?: FormatOptions;
}) {
  const [distance, setDistance] = useState(getDistance(time, options));

  useEffect(() => {
    const interval = setInterval(() => {
      setDistance(getDistance(time, options));
    }, 1 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [time, options]);
  return <>{distance.slice(5)}</>;
}

function getDistance(time: Date, options?: FormatOptions) {
  return intlFormatDistance(time, new Date(), {
    locale: 'fr-FR',
    numeric: 'always',
    style: 'short',
    ...options,
  });
}
