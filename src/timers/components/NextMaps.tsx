import { chain, find, map } from 'lodash';
import { useMemo } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { getVariant } from '../../clips/components/MapButton';
import { useGlobalState } from '../../hooks/useGlobalState';
import { YELLOW } from '../../models/colors';
import { Edition, Streamer } from '../../models/consts';

type Props = {
  current: number;
  serverMaps: number[];
}

export function NextMaps({ current, serverMaps }: Props) {
  const { allMaps } = useGlobalState();

  const nextMaps = useMemo(() => {
    const editionMaps = allMaps[Edition.K7][Streamer.WINGO].maps;
    const idx = serverMaps.findIndex((v) => v === current);
    const nextMapsIds = map([...Array(6).keys()], (v) => serverMaps[(idx + v + 1) % serverMaps.length]);
    const next = chain(nextMapsIds).map((id) => find(editionMaps, (m) => m.id === id)).value();
    return next;
  }, [allMaps, current, serverMaps])

  return (
    <div className='align-items-center'>
      {nextMaps.map((m, idx) => (
        !!m &&
        <div key={idx} className="d-inline">
          {idx !== 0 && <span key={`gt-${current}-${idx}`}> &gt; </span>}
          <ToggleButton
            value=""
            key={m.id}
            variant={getVariant(m)}
            className="mx-1 fw-bolder"
            type='checkbox'
            disabled
            style={{ position: 'relative' }}
          >
            {m.id}
            {m.fav && <FaStar key={`star-${m.id}`} className='button-icon' color={YELLOW} />}
          </ToggleButton>
        </div>
      )
      )}
    </div>
  );
}
