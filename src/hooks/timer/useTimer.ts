import { useCallback, useMemo, useState } from 'react';

import { Time } from './Time';
import { validateExpiryTimestamp, validateOnExpire } from './Validate';
import { useInterval } from './useInterval';

const DEFAULT_DELAY = 1000;
function getDelayFromExpiryTimestamp(expiryTimestamp: Date) {
  if (!validateExpiryTimestamp(expiryTimestamp)) {
    return null;
  }

  const seconds = Time.getSecondsFromExpiry(expiryTimestamp);
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY;
}

type Props = {
  expiryTimestamp: Date;
  onExpire: () => void;
  autoStart: boolean;
}

type State = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  start: () => void;
  pause: () => void;
  restart: (date: Date, autoStart?: boolean) => void;
  resume: () => void;
  isRunning: boolean;
}

export default function useTimer({ expiryTimestamp: expiry, onExpire, autoStart = true }: Props) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(Time.getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState(getDelayFromExpiryTimestamp(expiryTimestamp));

  function handleExpire() {
    if (validateOnExpire(onExpire)) {
      onExpire();
    }
    setIsRunning(false);
    setDelay(null);
  }

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback((newExpiryTimestamp: Date, newAutoStart = true) => {
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp));
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(Time.getSecondsFromExpiry(newExpiryTimestamp));
  }, []);

  const resume = useCallback(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + (seconds * 1000));
    restart(time);
  }, [restart, seconds]);

  const start = useCallback(() => {
    if (didStart) {
      setSeconds(Time.getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [didStart, expiryTimestamp, resume]);

  useInterval(() => {
    if (delay !== DEFAULT_DELAY) {
      setDelay(DEFAULT_DELAY);
    }
    const secondsValue = Time.getSecondsFromExpiry(expiryTimestamp);
    setSeconds(secondsValue);
    if (secondsValue <= 0) {
      handleExpire();
    }
  }, isRunning ? delay : null);

  return useMemo((): State => ({
    ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning
  }), [isRunning, pause, restart, resume, seconds, start]);

  // return {
  //   ...Time.getTimeFromSeconds(seconds), start, pause, resume, restart, isRunning
  // };
}