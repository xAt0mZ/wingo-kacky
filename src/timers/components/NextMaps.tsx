import { addSeconds, format } from 'date-fns';
import { chain, find, map } from 'lodash';
import { useMemo } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { getVariant } from '../../clips/components/MapButton';
import { useGlobalState } from '../../hooks/useGlobalState';
import { YELLOW } from '../../models/colors';
import { Edition, Streamer } from '../../models/consts';
import { useSelectedMap } from '../hooks/useSelectedMap';

type Props = {
  current: number;
  serverMaps: number[];
  currentMapEndsAt: Date;
  timePerMap: number;
}

export function NextMaps({ current, serverMaps, currentMapEndsAt, timePerMap }: Props) {
  const { allMaps } = useGlobalState();
  const { selectedMap, setSelectedMap } = useSelectedMap();

  const nextMaps = useMemo(() => {
    const editionMaps = allMaps[Edition.K7][Streamer.WINGO].maps;
    const idx = serverMaps.findIndex((v) => v === current);
    const nextMapsIds = map([...Array(5).keys()], (v) => serverMaps[(idx + v + 1) % serverMaps.length]);
    const nextMaps = chain(nextMapsIds).map((id) => find(editionMaps, (m) => m.id === id)).value();
    const result = map(nextMaps, (m, idx) => {
      if (m) {
        return {
          map: m,
          at: format(addSeconds(currentMapEndsAt, timePerMap * (idx)), "kk 'h' mm")
        }
      }
      return undefined;
    });

    return result;
  }, [allMaps, current, currentMapEndsAt, serverMaps, timePerMap])

  return (
    <div className='align-items-center'>
      {nextMaps.map((m, idx) => (
        !!m && !!m.map &&
        <div className="hstack gap-3" key={idx}>
          <ToggleButton
            value=""
            id={`${m.map.id}`}
            key={m.map.id}
            variant={getVariant(m.map)}
            className="fw-bolder w-30 my-1"
            type='checkbox'
            checked={selectedMap?.id === m.map.id}
            onClick={() => setSelectedMap(m.map)}
            style={{ position: 'relative' }}
          >
            {m.map.id}
            {m.map.fav && <FaStar key={`star-${m.map.id}`} className='button-icon' color={YELLOW} />}
          </ToggleButton>
          <span key={`gt-${current}-${idx}`}> &gt; </span>
          <span key={`date-${current}-${idx}`}>{m.at}</span>
        </div>
      )
      )}
    </div>
  );
}
