import { TMMap } from '../../models/map';

interface Props {
  map?: TMMap
}

export function MapDetails({ map }: Props) {
  if (!map || !map.finished) {
    return null;
  }

  return (
    <div className="vstack flex-grow-0 gap-5 mt-5 fs-3" style={{ minWidth: '25%' }}>
      <span className="fs-1">
        {map.id}
      </span>
      <div>
        <span className="d-block">
          {map.date?.localeDateString}
        </span>
        <span className="d-block">
          {map.date?.localeTimeString}
        </span>
      </div>
      <span className="fs-3">
        {map.time}
      </span>
    </div >
  );
}