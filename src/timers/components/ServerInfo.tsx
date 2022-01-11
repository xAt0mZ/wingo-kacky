import { Row } from 'react-bootstrap';
// import { useTimer } from 'react-timer-hook';
import { differenceInSeconds } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { getTimer, ServerInfo } from '../../services/timer.service';
import useTimer from '../../hooks/timer/useTimer';

type Props = {
  id: number;
};

export function ServerTimer({ id }: Props) {
  const [ended, setEnded] = useState(false);
  const { minutes, seconds, restart } = useTimer({ expiryTimestamp: new Date(), onExpire: () => setEnded(true), autoStart: true });
  const { isFetched, error, data: info, refetch } = useQuery<ServerInfo>(`timer-${id}`, () => getTimer(id), { refetchOnWindowFocus: false, notifyOnChangeProps: 'tracked' });
  console.log('---', isFetched)
  const computeDate = useCallback(() => {
    console.log(info)
    if (!info) return new Date();
    // console.log(info)
    const time = new Date();
    const elapsed = differenceInSeconds(time, info.at) + info.elapsed;
    // console.log(elapsed);
    time.setSeconds(time.getSeconds() + info.timePerMap * 60 - elapsed);
    return time;
  }, [info])

  useEffect(() => {
    console.log(new Date(), ended);

    if (ended) {
      (async () => {
        await refetch();
        setEnded(false);
        restart(computeDate())
      })()
    }
  }, [ended, refetch, restart, computeDate])

  if (!isFetched || !info) {
    return (
      <div>LOADING...</div>
    )
  }
  if (error) {
    return (
      <div>ERROR</div>
    )
  }

  return (
    <Row className="">
      <div className='hstack'>
        <Digit value={minutes} /> : <Digit value={seconds} />
      </div>
      {/* <img src="https://www.dingens.me/kack_thumbnails/245.jpg" width="320" className="map-thumbnail" alt="thumb" /> */}
    </Row>
  );
}

function Digit({ value }: { value: number }) {
  const leftDigit = value >= 10 ? value.toString()[0] : '0';
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();
  return (
    <>
      <span>{leftDigit}</span><span>{rightDigit}</span>

    </>
  );
}