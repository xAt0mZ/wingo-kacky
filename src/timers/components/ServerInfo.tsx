import { Col, Row } from 'react-bootstrap';
import { addMinutes, subSeconds } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

import { getTimer, ServerData } from '../../services/timer.service';
import useTimer from '../../hooks/timer/useTimer';

import { NextMaps } from './NextMaps';
import { CurrentMap } from './CurrentMap';

type Props = {
  id: number;
};

export function ServerInfo({ id }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [shouldRetry, setShouldRetry] = useState(false);
  const [data, setData] = useState<ServerData | undefined>(undefined);
  const { isRunning, minutes, seconds, restart } = useTimer({ expiryTimestamp: new Date(), autoStart: false });

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTimer(id);
      setData(data);
    } catch (error) {
      setShouldRetry(true);
    }
  }, [id])

  useEffect(() => {
    if (shouldRetry) {
      setShouldRetry(false);
      setTimeout(() => fetch(), 10000);
    }
  }, [fetch, shouldRetry]);

  useEffect(() => {
    if (!isRunning) {
      fetch();
    }
  }, [fetch, isRunning]);

  useEffect(() => {
    if (!data) return;

    const mapStartedAt = subSeconds(data.at, data.elapsed);
    const mapEndsAt = addMinutes(mapStartedAt, data.timePerMap);

    if (mapEndsAt.getTime() > new Date().getTime()) {
      restart(mapEndsAt);
    } else {
      setShouldRetry(true);
    }
  }, [data, restart]);

  useEffect(() => {
    setLoading(!isRunning);
  }, [isRunning]);

  return (
    <Row className="flex-fill mh-30 fs-4">
      <Col xs={3} className="pt-5">
        <CurrentMap id={id} current={data?.current} isLoading={isLoading} minutes={minutes} seconds={seconds} />
      </Col>
      <Col xs={4} className="align-self-center">
        <div className="w-100 h-100">
          {data && <img src={`https://www.dingens.me/kack_thumbnails/${data.current}.jpg`} width="100%" alt="thumb" />}
        </div>
      </Col>
      <Col className='align-self-center'>
        {data && <NextMaps current={data.current} serverMaps={data.maps} />}
      </Col>
    </Row>
  );
}
