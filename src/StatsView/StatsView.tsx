import clsx from 'clsx';
import { Fragment, PropsWithChildren } from 'react';
import { Tab } from '@headlessui/react';

import { Header } from '@/components/Header';
import { WIPPanel } from '@/components/WipPanel';

import { FinishedChart } from './FinishedChart';

export function StatsView() {
  return (
    <>
      <Tab.Group>
        <Header title="Statistiques">
          <Tab.List className="grid grid-cols-2 gap-2">
            <TTab>
              <span className="lg:hidden">Stats</span>
              <span className="hidden lg:inline">Statistiques</span>
            </TTab>
            <TTab>Poules</TTab>
          </Tab.List>
        </Header>

        <Tab.Panels className="flex grow flex-col items-center justify-center gap-10">
          <Tab.Panel as={Fragment}>
            <FinishedChart />
          </Tab.Panel>
          <Tab.Panel className="grow">
            <WIPPanel />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

function TTab({ children }: PropsWithChildren) {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <button
          className={clsx(
            'rounded-lg border border-theme-4 text-center text-base font-medium focus:outline-none',
            'px-3 py-2',
            'lg:px-6 lg:py-4',
            selected
              ? 'bg-theme-4 text-theme-5'
              : 'bg-transparent text-theme-2',
          )}
        >
          {children}
        </button>
      )}
    </Tab>
  );
}
