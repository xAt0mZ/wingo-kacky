import { VStack } from '../components/VStack';

import { ServerInfo } from './components/ServerInfo';

export function Timers() {
  return (
    <VStack className='gap-1'>
      <ServerInfo id={1} />
      <ServerInfo id={2} />
      <ServerInfo id={3} />
    </VStack>
  );
}