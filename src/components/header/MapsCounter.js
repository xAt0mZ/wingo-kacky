export default function MapsCounter(props) {
  return (
    <span className="fs-1">{props.finished} / {props.total}</span>
  );
}