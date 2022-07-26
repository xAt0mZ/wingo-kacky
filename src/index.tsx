import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController, PointElement, LineElement, LineController } from 'chart.js';

import './index.css'
import { App } from './App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  BarController,
  LineController,
  Tooltip,
  Legend
);

ChartJS.defaults.color = "#F8F9FA";
ChartJS.defaults.font = {
  ...ChartJS.defaults.font,
  family: 'Proxima Nova',
  weight: 'lighter',
  style: 'normal'
};

render(
  <StrictMode>
    <App />
  </StrictMode>
  ,
  document.getElementById('root')
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();