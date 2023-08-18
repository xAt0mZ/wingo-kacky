import clsx from 'clsx';
import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

const transition = {
  transtion: 'transition-all duration-300',
  from: 'opacity-0',
  to: 'opacity-100',
};

export type Option<T> = {
  name: string;
  item: T;
};

export type Options<T> = Option<T>[];

export type Props<T> = {
  options: Options<T>;
  selected: Option<T>;
  onSelect: (selected: Option<T>) => void;
};

export function Select<T>({ options, selected, onSelect }: Props<T>) {
  return (
    <Listbox value={selected} by="name" onChange={onSelect}>
      <div className="relative self-stretch text-base font-medium text-theme-2">
        <Listbox.Button
          className={({ open }) =>
            clsx(
              'w-full cursor-default',
              'flex items-center justify-between px-4 py-3',
              'rounded-2xl border border-theme-8',
              'bg-theme-7 dark:bg-theme-6',
              open && 'rounded-b-none',
            )
          }
        >
          {({ open }) => (
            <>
              <span className="truncate">{selected?.name}</span>
              {!open && (
                <ChevronDownIcon
                  className="h-6 w-6 shrink-0"
                  aria-hidden="true"
                />
              )}
              {open && (
                <XMarkIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              )}
            </>
          )}
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter={transition.transtion}
          enterFrom={transition.from}
          enterTo={transition.to}
          leave={transition.transtion}
          leaveFrom={transition.to}
          leaveTo={transition.from}
        >
          <Listbox.Options
            className={clsx(
              'absolute z-10 w-full overflow-y-auto',
              'max-h-52 xl:max-h-64',
              'rounded-b-2xl border border-t-0 border-theme-8',
              'bg-theme-7 dark:bg-theme-6',
              'focus:outline-none',
            )}
          >
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  clsx(
                    'cursor-default select-none',
                    'flex items-center justify-start gap-4 px-4 py-3',
                    active && 'bg-theme-8',
                  )
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className="flex h-5 w-5 shrink-0">
                      {selected && <CheckIcon aria-hidden="true" />}
                    </span>
                    <span className="truncate">{option.name}</span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
