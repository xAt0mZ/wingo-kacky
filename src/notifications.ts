import { toast } from 'react-toastify';

export function notifySuccess(text: string) {
  toast.success(text);
}

export function notifyWarning(text: string) {
  toast.warn(text);
}

export function notifyError(e?: Error, fallbackText = '') {
  const msg = fallbackText;

  // eslint-disable-next-line no-console
  console.error(e);

  toast.error(msg);
}
