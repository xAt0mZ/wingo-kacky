import { Nav, Tab } from 'react-bootstrap';

import { Clips } from '../clips';

export function TabsPanel() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="clips">
      <Nav fill variant="pills" className='' >
        <Nav.Item>
          <Nav.Link eventKey="clips">Clips</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="stats">Stats</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <Tab.Pane eventKey="clips">
          <Clips />
        </Tab.Pane>
        <Tab.Pane eventKey="stats">
          WIP
        </Tab.Pane>
      </Tab.Content>
    </Tab.Container>
  )
}
