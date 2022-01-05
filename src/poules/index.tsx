import { ChartArea, ChartData, ChartOptions } from 'chart.js';
import { chain, map, reduce } from 'lodash';
import { useMemo, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

import { VStack } from '../components/VStack';
import { usePoules } from '../hooks/usePoules';
import { BLUE, GREEN, RED, YELLOW } from '../models/colors';

const ranges = ["Par jour", "Par heure"];

type Data = ChartData<"bar", number[], string> & ChartData<"line", number[], string>;

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, GREEN);
  gradient.addColorStop(0.5, YELLOW);
  gradient.addColorStop(1, RED);

  return gradient;
}

const options: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        sort: (a, b) => {
          if (a.text === 'Poules ?' || b.text === 'P O U L E S !!!') return -1;
          if (b.text === 'Poules ?' || a.text === 'P O U L E S !!!') return 1;
          return 0;
        }
      }
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

export function Poules() {
  const [selectedRange, setSelectedRange] = useState<string>(ranges[0]);
  const { poules } = usePoules();

  const [chartRef, setChartRef] = useState<ChartJSOrUndefined<"bar", number[], string> | null>(null)

  const chartData: Data = useMemo(() => {
    const chartData: Data = { labels: [], datasets: [] };
    if (!chartRef) {
      return chartData;
    }

    const data: [number[], number[], number[]] = [[], [], []];

    if (selectedRange === "Par jour") {
      chartData.labels = chain(poules).map('localeDateString').uniq().value();
      data[0] = chain(chartData.labels).flatMap((label) => reduce(poules, (acc, poule) => poule.localeDateString === label ? acc + poule.pouleCount : acc, 0)).value();
      data[1] = chain(chartData.labels).flatMap((label) => reduce(poules, (acc, poule) => poule.localeDateString === label ? acc + poule.shakeCount : acc, 0)).value();
    } else {
      chartData.labels = map(poules, 'localeDateStringHour');
      data[0] = map(poules, 'pouleCount');
      data[1] = map(poules, 'shakeCount');
    }
    data[2] = map(data[0], (val, idx) => val + data[1][idx]);

    chartData.datasets.push({
      type: 'line' as const,
      label: 'P O U L E S !!!',
      borderColor: createGradient(chartRef.ctx, chartRef.chartArea),
      borderWidth: 3,
      data: data[2]
    });

    chartData.datasets.push({
      type: 'bar' as const,
      label: 'Poules ?',
      categoryPercentage: 1,
      barPercentage: 1,
      backgroundColor: `${BLUE}70`,
      data: data[0]
    });

    chartData.datasets.push({
      type: 'bar' as const,
      label: 'Poules !',
      categoryPercentage: 1,
      barPercentage: 1,
      backgroundColor: `${RED}70`,
      data: data[1]
    });

    return chartData;

  }, [chartRef, poules, selectedRange]);

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
        <Chart ref={(ref) => setChartRef(ref)} type="bar" options={options} data={chartData} />
      </Row>
    </VStack>
  );
}
