import clsx from 'clsx';
import { Switch } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

type Props = {
  label: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
};

export function Checkbox({ label, enabled, setEnabled }: Props) {
  return (
    <Switch.Group>
      <div className="flex items-center gap-1 text-theme-2">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="inline-flex h-5 w-5 rounded border border-theme-8 bg-theme-7 text-theme-2"
        >
          <CheckIcon
            className={clsx(
              'transition-opacity',
              enabled ? 'opacity-100' : 'opacity-0',
            )}
          />
        </Switch>
        <Switch.Label className="cursor-pointer">{label}</Switch.Label>
      </div>
    </Switch.Group>
  );
}
