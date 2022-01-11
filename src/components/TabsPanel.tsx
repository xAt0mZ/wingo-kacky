import { Tab, Tabs } from 'react-bootstrap';

import { Clips } from '../clips';
import { Poules } from '../poules';
import { Explanations } from '../explanations';
import { Stats } from '../stats';
import { Timers } from '../timers';

export function TabsPanel() {
  return (
    <Tabs id="tabs" variant="pills" defaultActiveKey="clips" className="nav-fill border-bottom pb-3" mountOnEnter unmountOnExit>
      <Tab eventKey="presentation" title="Le Kacky" className="flex-fill" >
        <Explanations />
      </Tab>
      <Tab eventKey="timers" title="Timers" className="flex-fill" >
        <Timers />
      </Tab>
      <Tab eventKey="clips" title="Clips" className="flex-fill" >
        <Clips />
      </Tab>
      <Tab eventKey="stats" title="Stats" className="flex-fill">
        <Stats />
      </Tab>
      <Tab eventKey="poules" title="P O U L E ?" className="flex-fill">
        <Poules />
      </Tab>
    </Tabs>
  )
}
