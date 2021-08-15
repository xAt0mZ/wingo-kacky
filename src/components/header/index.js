import MapsCounter from './MapsCounter';

export default function Header(props) {
  return (
    <header className="py-3 mb-2 border-bottom hstack gap-1">
      <div className="d-flex align-items-center mb-3 mb-md-0">
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/78ac5f9f-024b-4bf3-9098-e2278ebdc26a-profile_image-70x70.png"
          alt="Wingo logo"
          width="70"
          height="70"
          className="me-2"
          style={{ borderRadius: "50%" }} />
        <span className="fs-1">Wingobear - Kacky 2021</span>
      </div>
      <MapsCounter className="ms-auto" finished={props.finished} total={props.total} />
    </header>
  );
}