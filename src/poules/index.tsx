import { ChartArea, ChartData, ChartOptions, Color } from 'chart.js';
import { chain, forEach, map, reduce } from 'lodash';
import { useMemo, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Chart } from 'react-chartjs-2';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';

import { VStack } from '../components/VStack';
import { usePoules } from '../hooks/usePoules';
import { BLUE, GREEN, RED, YELLOW } from '../models/colors';

const ranges = ["Par jour", "Par heure"];
const chartLabels = ['P O U L E S !!!', 'Poules ?', 'Poules !', 'Poules...'] as const;
const colors: { [x in (typeof chartLabels[number])]: Color } = {
  [chartLabels[0]]: '',
  [chartLabels[1]]: `${BLUE}70`,
  [chartLabels[2]]: `${RED}70`,
  [chartLabels[3]]: `${YELLOW}70`,
};

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
          const total = chartLabels[0];
          if (a.text === total) return 1;
          if (b.text === total) return -1;
          return 0;
        },
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

  const [chartRef, setChartRef] = useState<ChartJSOrUndefined<"bar", number[], string> | null>(null);

  const chartData: Data = useMemo(() => {
    const chartData: Data = { labels: [], datasets: [] };
    if (!chartRef) {
      return chartData;
    }

    const data: [number[], number[], number[], number[]] = [[], [], [], []];
    const gradient = createGradient(chartRef.ctx, chartRef.chartArea);
    colors[chartLabels[0]] = gradient;

    if (selectedRange === "Par jour") {
      chartData.labels = chain(poules).map('localeDateString').uniq().value();
      data[1] = chain(chartData.labels).flatMap((label) => reduce(poules, (acc, poule) => poule.localeDateString === label ? acc + poule.pouleCount : acc, 0)).value();
      data[2] = chain(chartData.labels).flatMap((label) => reduce(poules, (acc, poule) => poule.localeDateString === label ? acc + poule.shakeCount : acc, 0)).value();
      data[3] = chain(chartData.labels).flatMap((label) => reduce(poules, (acc, poule) => poule.localeDateString === label ? acc + poule.petCount : acc, 0)).value();
    } else {
      chartData.labels = map(poules, 'localeDateStringHour');
      data[1] = map(poules, 'pouleCount');
      data[2] = map(poules, 'shakeCount');
      data[3] = map(poules, 'petCount');
    }
    data[0] = map(data[1], (val, idx) => val + data[2][idx] + data[3][idx]);

    chartData.datasets.push({
      type: 'line' as const,
      label: chartLabels[0],
      borderColor: colors[chartLabels[0]],
      borderWidth: 3,
      data: data[0]
    });

    forEach([1, 2, 3], (v) => {
      chartData.datasets.push({
        type: 'bar' as const,
        categoryPercentage: 1,
        barPercentage: 1,
        stack: '0',
        label: chartLabels[v],
        backgroundColor: colors[chartLabels[v]],
        data: data[v]
      });
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
