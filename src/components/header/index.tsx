import { Form } from 'react-bootstrap';

import { MapsCounter } from './components/MapsCounter';

const themes = ['Clair', 'Clair daltonien', 'Sombre', 'Sombre daltonien'];

type Props = {
  theme: string;
  setTheme: (v: string) => void;
};

export function Header({ theme, setTheme }: Props) {
  return (
    <header className="pt-3 hstack gap-5">
      <div className="d-flex align-items-center mb-3 mb-md-0">
        <img
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/78ac5f9f-024b-4bf3-9098-e2278ebdc26a-profile_image-70x70.png"
          alt="Wingo logo"
          width="70"
          height="70"
          className="me-2"
          style={{ borderRadius: '50%' }}
        />
        <span className="fs-1">Wingobear - Kacky</span>
      </div>
      <MapsCounter />
      <Form.Select className="w-auto" aria-label="Theme select" onChange={(e) => setTheme(e.target.value)} value={theme}>
        {themes.map((th) => (
          <option key={th} value={th}>
            {th}
          </option>
        ))}
      </Form.Select>
    </header>
  );
}
