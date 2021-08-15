export default function MapDetails(props) {
  const selectedMap = props.map;
  if (!selectedMap || !selectedMap.finished) {
    return (<div></div>);
  }
  return (
    <div className="vstack flex-grow-0 gap-5 mt-5" style={{ minWidth: '25%' }}>
      <span className="fs-1">
        {selectedMap.id}
      </span>
      <span className="fs-3">
        {selectedMap.date}
      </span>
      <span className="fs-3">
        {selectedMap.time}
      </span>
    </div >
  );
}