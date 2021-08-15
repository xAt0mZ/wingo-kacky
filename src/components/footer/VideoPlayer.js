export default function VideoPlayer(props) {
  return (
    <div className="w-100 h-100">
      {props.URL &&
        <iframe
          title="Map clip"
          src={props.URL}
          width="100%" height="100%" allowFullScreen
        ></iframe>}
    </div>
  );
}
