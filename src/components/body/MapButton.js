import ToggleButton from 'react-bootstrap/ToggleButton';

export default function MapButton(props) {
  const map = props.map;
  return (
    <ToggleButton
      id={`radio-${map.id}`}
      type="radio"
      variant={map.finished ? 'outline-success' : 'outline-danger'}
      name="radio"
      value={map.id}
      checked={props.checked}
      onChange={() => props.onMapSelection(map.id)}
      className="m-1 fw-bolder"
    >
      {map.id}
    </ToggleButton>
  );
}
