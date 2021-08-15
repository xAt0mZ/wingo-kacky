export default function MapDetails(props) {
  const selectedMap = props.map;
  if (!selectedMap || !selectedMap.finished) {
    return (<div></div>);
  }

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="vstack flex-grow-0 gap-5 mt-5 fs-3" style={{ minWidth: '25%' }}>
      <span className="fs-1">
        {selectedMap.id}
      </span>
      <div>
        <span className="d-block">
          {selectedMap.date.toLocaleDateString('fr-FR', options)}
        </span>
        <span className="d-block">
          {selectedMap.date.toLocaleTimeString('fr-FR')}
        </span>
      </div>
      <span className="fs-3">
        {selectedMap.time}
      </span>
    </div >
  );
}