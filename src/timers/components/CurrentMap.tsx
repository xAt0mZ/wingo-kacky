import { useMemo } from 'react';
import { Spinner, ToggleButton } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { getVariant } from '../../clips/components/MapButton';
import { VStack } from '../../components/VStack';
import { useGlobalState } from '../../hooks/useGlobalState';
import { YELLOW } from '../../models/colors';
import { Edition, Streamer } from '../../models/consts';
import { useSelectedMap } from '../hooks/useSelectedMap';

type Props = {
  id: number;
  isLoading: boolean;
  current?: number;
  minutes: number;
  seconds: number;
}

export function CurrentMap({ id, isLoading, current, minutes, seconds }: Props) {
  const { allMaps } = useGlobalState();
  const { selectedMap, setSelectedMap } = useSelectedMap();

  const currentMap = useMemo(() => {
    const editionMaps = allMaps[Edition.K7][Streamer.WINGO].maps;
    return editionMaps.find((m) => m.id === current);
  }, [allMaps, current])

  return (
    <VStack className="justify-content-center align-items-center gap-2">
      <>Serveur {id}</>
      {isLoading &&
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }
      {!isLoading && currentMap &&
        <>
          <ToggleButton
            value=""
            id={`server-${id}-${currentMap.id}`}
            key={currentMap.id}
            variant={getVariant(currentMap)}
            className="mx-1 fw-bolder"
            type='checkbox'
            checked={currentMap.id === selectedMap?.id}
            onClick={() => setSelectedMap(currentMap)}
            style={{ position: 'relative' }}
          >
            {currentMap.id}
            {currentMap.fav && <FaStar className='button-icon' color={YELLOW} />}
          </ToggleButton>
          <Timer minutes={minutes} seconds={seconds} />
        </>}
    </VStack>
  );
}

function Timer({ minutes, seconds }: { minutes: number, seconds: number }) {
  return (
    <div className="hstack justify-content-center">
      <Digit value={minutes} /> : <Digit value={seconds} />
    </div>
  )
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