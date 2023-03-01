import { ReactNode, useState } from 'react';
import { Tab, Tabs, type TabProps } from 'react-bootstrap';

import { Clips } from '../clips';
import { Poules } from '../poules';
import { Explanations } from '../explanations';
import { Stats } from '../stats';
// import { Timers } from '../timers';
// import { Leaderboard } from '../leaderboard';
// import { MapsList } from '../maps';
import { Live } from '../live';
import { Fails } from '../fails';

import { Credits } from './credits';
import { ExternalLink } from './icons/ExternalLink';

const defaultActiveKey = 'clips';

type TabDefinition = {
  eventKey: string;
  title: TabProps['title'];
  component: ReactNode;
};

function tab(eventKey: string, title: TabProps['title'], component: ReactNode): TabDefinition {
  return {
    eventKey,
    title,
    component,
  };
}

const tabs: TabDefinition[] = [
  tab('presentation', 'Le Kacky', <Explanations />),
  tab('live', 'Livestream', <Live />),
  // tab('timers', 'Timers', <Timers />),
  tab(
    'maps',
    <>
      Maps&nbsp;&nbsp;&nbsp;&nbsp;
      <ExternalLink />
    </>,
    null
  ),
  tab(
    'leaderboard',
    <>
      Leaderboard&nbsp;&nbsp;&nbsp;&nbsp;
      <ExternalLink />
    </>,
    null
  ),
  tab('clips', 'Clips', <Clips />),
  tab('fails', <img src="https://cdn.frankerfacez.com/emoticon/563443/1" alt="COPIUM" height="22px" />, <Fails />),
  tab('stats', 'Stats', <Stats />),
  tab('poules', 'P O U L E ?', <Poules />),
];

export function TabsPanel() {
  const [selectedTab, setSelectedTab] = useState<string | null>(defaultActiveKey);

  return (
    <>
      <Tabs
        id="tabs"
        variant="pills"
        defaultActiveKey={defaultActiveKey}
        className="nav-fill border-bottom pb-3"
        activeKey={selectedTab ?? defaultActiveKey}
        mountOnEnter
        unmountOnExit
        onSelect={(e) => {
          if (e === 'leaderboard') {
            window.open('https://kackyreloaded.com/event/editions/');
          } else if (e === 'maps') {
            window.open('https://kackyreloaded.com/event/editions/records.php?edition=3');
          } else {
            setSelectedTab(e);
          }
        }}
      >
        {tabs.map(({ eventKey, title, component }) => (
          <Tab key={eventKey} eventKey={eventKey} title={title} className="flex-fill">
            {component}
          </Tab>
        ))}
      </Tabs>
      <Credits selectedTab={selectedTab} />
    </>
  );
}
