import { VStack } from '../components/VStack';

import { ServerCounters } from './components/ServersCounters';

export function Timers() {
  return (
    <VStack className='gap-1'>
      <ServerCounters />
    </VStack>
  );
}