import { Col, Row } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';

export const dataPie = {
  labels: ['Red'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',

      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
};



export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [7,6,5,4,3,2,1],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1, 2, 3, 4, 5, 6, 7],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};


export function Stats() {
  return (
    <Row>
      <Col xs={6}>
        <Bar options={options} data={data} />
      </Col>
      <Col xs={6}>
        <Doughnut data={dataPie} />
      </Col>
    </Row>

  );
}