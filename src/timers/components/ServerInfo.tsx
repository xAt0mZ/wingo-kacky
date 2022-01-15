import { Col, Row } from 'react-bootstrap';
import { addMinutes, addSeconds, subSeconds } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

import { getTimer, ServerData } from '../../services/timer.service';
import useTimer from '../../hooks/timer/useTimer';
import { SelectedMapProvider } from '../hooks/useSelectedMap';

import { NextMaps } from './NextMaps';
import { CurrentMap } from './CurrentMap';
import { MapClip } from './MapClip';

type Props = {
  id: number;
};

const podiumTime = 12;
const loadingTime = 12;

export function ServerInfo({ id }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [shouldRetry, setShouldRetry] = useState(false);
  const [timePerMap, setTimePerMap] = useState<number>(0);
  const [currentMapEndsAt, setCurrentMapEndsAt] = useState(new Date());
  const [data, setData] = useState<ServerData | undefined>(undefined);
  const { isRunning, minutes, seconds, restart } = useTimer({ expiryTimestamp: new Date(), autoStart: false });

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTimer(id);
      setData(data);
      if (data) {
        setTimePerMap(data.timePerMap * 60 + podiumTime + loadingTime);
      }
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

    let mapStartedAt = subSeconds(data.at, data.elapsed);
    mapStartedAt = addSeconds(mapStartedAt, loadingTime);
    let mapEndsAt = addMinutes(mapStartedAt, data.timePerMap);
    mapEndsAt = addSeconds(mapEndsAt, podiumTime);
    setCurrentMapEndsAt(mapEndsAt);

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
    <SelectedMapProvider>
      <Row className="flex-fill mh-30 fs-4">
        <Col xs={2} className="pt-5">
          <CurrentMap id={id} current={data?.current} isLoading={isLoading} minutes={minutes} seconds={seconds} />
        </Col>
        <Col xs={4} className="align-self-center">
          <div className="w-100 h-100">
            {data && <img src={`https://www.dingens.me/kack_thumbnails/${data.current}.jpg`} width="100%" alt="thumb" />}
          </div>
        </Col>
        <Col xs={2} className="align-self-center border-bottom pb-1">
          {data && <NextMaps
            current={data.current}
            serverMaps={data.maps}
            currentMapEndsAt={currentMapEndsAt}
            timePerMap={timePerMap}
          />}
        </Col>
        <Col xs={4}>
          <MapClip />
        </Col>
      </Row>
    </SelectedMapProvider>
  );
}
