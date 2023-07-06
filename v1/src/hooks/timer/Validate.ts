export function validateExpiryTimestamp(expiryTimestamp: Date) {
  const isValid = (new Date(expiryTimestamp)).getTime() > 0;
  if (!isValid) {
    // eslint-disable-next-line no-console
    console.warn('react-timer-hook: { useTimer } Invalid expiryTimestamp settings', expiryTimestamp);
  }
  return isValid;
}

export function validateOnExpire(onExpire: () => void) {
  const isValid = onExpire && typeof onExpire === 'function';
  if (onExpire && !isValid) {
    // eslint-disable-next-line no-console
    console.warn('react-timer-hook: { useTimer } Invalid onExpire settings function', onExpire);
  }
  return isValid;
}