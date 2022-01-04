import { Tab, Tabs } from 'react-bootstrap';

import { Clips } from '../clips';
import { Poules } from '../poules';
import { Stats } from '../stats';

export function TabsPanel() {
  return (
    <Tabs id="tabs" variant="pills" defaultActiveKey="clips" className="nav-fill">
      <Tab eventKey="clips" title="Clips" className="flex-fill">
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
