import { ChartData, ChartOptions } from 'chart.js';
import { chain, filter, forIn, forInRight, includes, map, reduce } from 'lodash';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Chart } from 'react-chartjs-2';

import { VStack } from '../components/VStack';
import { useGlobalState } from '../hooks/useGlobalState';
import { DEFAULT_EDITION, Edition, Streamer, StreamerColors } from '../models/consts';
import { DateField } from '../models/dateField';
import { TMMap } from '../models/map';

const editions = Object.values(Edition);

type Data = ChartData<'bar', number[], string> & ChartData<'line', number[], string>;

export function Stats() {
  const [edition, setEdition] = useState<Edition>(DEFAULT_EDITION);
  const { allMaps } = useGlobalState();

  const editionMaps = filter(allMaps, { edition });
  const streamers = reduce(editionMaps, (sum, m) => {
    const tmp = sum;
    tmp[m.streamer] = sum[m.streamer] || [];
    tmp[m.streamer].push(m);
    return tmp;
  }, {} as {[k in Streamer]: TMMap[]});

  let dates: DateField[] = [];
  let max = 0;

  forIn(streamers, (maps) => {
    max = maps.length;
    dates = chain(maps).filter({ finished: true }).map('date').without(undefined).concat(dates).sortBy('date').uniqBy('localeDateString').value() as DateField[];
  });

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          sort: (a, b) => {
            if (includes(a.text, 'Total')) return 1;
            if (includes(b.text, 'Total')) return -1;
            return 0;
          },
        },
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
  const chartData: Data = { labels, datasets: [] };

  forInRight(streamers, (maps, k) => {
    chartData.datasets.push({
      type: 'bar' as const,
      label: k,
      yAxisID: 'y',
      order: 1,
      categoryPercentage: 0.6,
      barPercentage: 0.9,
      backgroundColor: `${StreamerColors[k as Streamer]}70`,
      data: map(labels, (date) => filter(maps, { date: { localeDateString: date } }).length),
    });

    chartData.datasets.push({
      type: 'line' as const,
      label: `Total ${k}`,
      yAxisID: 'y1',
      order: 0,
      borderColor: StreamerColors[k as Streamer],
      pointBorderWidth: 8,
      borderWidth: 3,
      data: map(dates, (date) => {
        const dateLimit = new Date(date.date);
        dateLimit.setHours(23, 59, 59, 999);
        return filter(maps, (m) => m.date && m.date.date <= dateLimit).length;
      }),
    });
  });

  return (
    <VStack>
      <Row>
        <Col xs={3}>
          <Form.Select aria-label="Edition select" onChange={(e) => setEdition(e.target.value as Edition)} value={edition}>
            {editions.map((v, k) => (
              <option key={k} value={v}>
                {v}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Chart type="bar" options={options} data={chartData} />
      </Row>
    </VStack>
  );
}
