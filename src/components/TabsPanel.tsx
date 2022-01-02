import { Tab, Tabs } from 'react-bootstrap';

import { Clips } from '../clips';
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
    </Tabs>
  )
}
