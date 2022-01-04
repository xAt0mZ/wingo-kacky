import { ChartData, ChartOptions } from 'chart.js';
import { chain, map } from 'lodash';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Chart } from 'react-chartjs-2';

import { VStack } from '../components/VStack';
import { usePoules } from '../hooks/usePoules';

const ranges = ["Par jour", "Par heure"];

type Data = ChartData<"bar", number[], string>;

export function Poules() {
  const [selectedRange, setSelectedRange] = useState<string>(ranges[0]);
  const { poules } = usePoules();

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
    },
  };

  const chartData: Data = { labels: [], datasets: [] };
  let data: number[] = [];

  if (selectedRange === "Par jour") {
    chartData.labels = chain(poules).map('localeDateString').uniq().value();
    data = chain(chartData.labels).flatMap((l) => map(poules, (p) => p.localeDateString === l ? p.count : 0)).value();
  } else {
    chartData.labels = map(poules, 'localeDateStringHour');
    data = map(poules, 'count');
  }

  chartData.datasets.push({
    type: 'bar' as const,
    label: 'P O U L E S',
    yAxisID: 'y',
    categoryPercentage: 0.6,
    barPercentage: 0.9,
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    data
  });

  return (
    <VStack>
      <Row>
        <Col xs={3}>
          <Form.Select
            aria-label="Filter select"
            onChange={(e) => setSelectedRange(e.target.value)}
            value={selectedRange}>
            {ranges.map((v, k) =>
              <option key={k} value={v}>{v}</option>
            )}
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Chart type="bar" options={options} data={chartData} />
      </Row>
    </VStack>
  );
}