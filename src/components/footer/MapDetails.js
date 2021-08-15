import { LOCALE_DATE_OPTIONS, LOCALE_LANG } from "../../models/filters";

export default function MapDetails(props) {
  const selectedMap = props.map;
  if (!selectedMap || !selectedMap.finished) {
    return (<div></div>);
  }

  return (
    <div className="vstack flex-grow-0 gap-5 mt-5 fs-3" style={{ minWidth: '25%' }}>
      <span className="fs-1">
        {selectedMap.id}
      </span>
      <div>
        <span className="d-block">
          {selectedMap.date.toLocaleDateString(LOCALE_LANG, LOCALE_DATE_OPTIONS)}
        </span>
        <span className="d-block">
          {selectedMap.date.toLocaleTimeString(LOCALE_LANG)}
        </span>
      </div>
      <span className="fs-3">
        {selectedMap.time}
      </span>
    </div >
  );
}