import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Providers } from './providers/Providers';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <Providers />
  </StrictMode>,
);
