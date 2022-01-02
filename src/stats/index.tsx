import { ChartData, ChartOptions } from 'chart.js';
import { chain, filter, forIn, forInRight, map } from 'lodash';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Chart } from 'react-chartjs-2';

import { VStack } from '../components/VStack';
import { useGlobalState } from '../hooks/useGlobalState';
import { Edition } from '../models/consts';
import { DateField } from '../models/dateField';

const editions = Object.values(Edition);

type Data = ChartData<"bar", number[], string> & ChartData<"line", number[], string>;

export function Stats() {
  const [edition, setEdition] = useState<Edition>(Edition.K7);
  const { allMaps } = useGlobalState();

  const streamers = allMaps[edition];

  let dates: DateField[] = [];
  let max = 0;

  forIn(streamers, (v) => {
    max = v.maps.length;
    dates = chain(v.maps).filter({ finished: true }).map('date').without(undefined).concat(dates).sortBy('date').uniqBy('localeDateString').value() as DateField[];
  });

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        max,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = chain(dates).map('localeDateString').value();
  const chartData: Data = { labels, datasets: [ ] };

  forInRight(streamers, (v, k) => {
    chartData.datasets.push({
      type: 'bar' as const,
      label: k,
      yAxisID: 'y',
      categoryPercentage: 0.6,
      barPercentage: 0.9,
      backgroundColor: k === 'Wingo' ? 'rgba(53, 162, 235, 0.5)' : 'rgba(255, 99, 132, 0.5)',
      data: map(labels, (date) => filter(v.maps, { date: { localeDateString: date } }).length),
    });

    chartData.datasets.push({
      type: 'line' as const,
      label: `Total ${k}`,
      yAxisID: 'y1',
      borderColor: k === 'Wingo' ? 'rgb(53, 162, 235)' : 'rgb(255, 99, 132)',
      borderWidth: 3,
      data: map(dates, (date) => filter(v.maps, (m) => m.date && m.date.date <= date.date).length),
    })
  })

  return (
    <VStack>
      <Row>
        <Col xs={3}>
          <Form.Select
            aria-label="Edition select"
            onChange={(e) => setEdition(e.target.value as Edition)}
            value={edition}>
            {editions.map((v, k) =>
              <option key={k} value={v}>{v}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Chart type="bar" options={options} data={chartData}/>
      </Row>
    </VStack>
  );
}