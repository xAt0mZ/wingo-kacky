import { clamp, eachDayOfInterval, isSameDay } from 'date-fns';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Text,
} from 'recharts';

import { useCurrentSeason } from '@/hooks/useCurrentSeason';
import { useTheme } from '@/hooks/useTheme';

const lineColor = '#0d1046';
const barColor = '#544fd9';
const darkLineColor = '#fbfbfb';
const darkBarColor = '#bfaa82';

type DataPoint = {
  name: string;
  finished: number;
  cumulated: number;
};

export function FinishedChart() {
  return <Content />;
}

function Content() {
  const { data: season, isLoading } = useCurrentSeason();
  const { theme } = useTheme();
  if (!season || isLoading) {
    return null;
  }
  const {
    season: { startAt, endAt, maps },
  } = season;

  const dates = eachDayOfInterval({
    start: new Date(startAt),
    end: clamp(new Date(endAt), {
      start: new Date(endAt),
      end: new Date(),
    }),
  });

  let cumulated = 0;
  const data: DataPoint[] = dates.map((d) => {
    const finished =
      maps?.filter((m) => m.finishedAt && isSameDay(d, new Date(m.finishedAt)))
        .length || 0;
    cumulated += finished;
    return {
      name: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
      cumulated,
      finished,
    };
  });

  return (
    <div className="relative w-full grow overflow-hidden">
      <div className="absolute inset-0">
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <YAxis
              yAxisId="finished"
              width={24}
              stroke={theme === 'light' ? lineColor : darkLineColor}
            />
            <Bar
              yAxisId="finished"
              dataKey="finished"
              fill={theme === 'light' ? barColor : darkBarColor}
              shape={({ x, y, width, height, fill }) => {
                if (!x || !y || !width || !height || height === 0) {
                  return <></>;
                }
                return (
                  <>
                    <path
                      d={getPath(x, y, width, height, 4)}
                      fill={fill}
                      className="lg:hidden"
                    />
                    <path
                      d={getPath(x, y, width, height, 6)}
                      fill={fill}
                      className="hidden lg:inline 2xl:hidden"
                    />
                    <path
                      d={getPath(x, y, width, height, 8)}
                      fill={fill}
                      className="hidden 2xl:inline "
                    />
                  </>
                );
              }}
            />
            <YAxis
              yAxisId="cumulated"
              orientation="right"
              width={24}
              stroke={theme === 'light' ? lineColor : darkLineColor}
            />
            <Line
              type="monotone"
              yAxisId="cumulated"
              dataKey="cumulated"
              stroke={theme === 'light' ? lineColor : darkLineColor}
              fill={theme === 'light' ? lineColor : darkLineColor}
              strokeWidth={2}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const finished = payload[0].value;
                  const cumulated = payload[1].value;
                  return (
                    <div className="flex flex-col gap-2 rounded-2xl border border-theme-2 bg-theme-6 p-4 font-medium text-theme-2">
                      <span className="text-center text-lg font-semibold">
                        {label}
                      </span>
                      <div>
                        <span>Terminées : </span>
                        <span className="font-semibold">{finished}</span>
                      </div>
                      <div>
                        <span>Cumulé : </span>
                        <span className="font-semibold">{cumulated}</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <XAxis
              dataKey="name"
              height={40}
              stroke={theme === 'light' ? lineColor : darkLineColor}
              tick={({ x, y, payload }) => (
                <Text
                  fontSize={'16px'}
                  width={'16px'}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  verticalAnchor="start"
                  fill={theme === 'light' ? lineColor : darkLineColor}
                >
                  {payload.value}
                </Text>
              )}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function getPath(
  x: number | string,
  y: number | string,
  width: number,
  height: number,
  radius: number,
) {
  return `M${x},${Number(y) + height}
  v${-(height - radius)}
  a${radius} ${radius} 0 0 1 ${radius} ${-radius}
  h${width - radius * 2}
  a${radius} ${radius} 0 0 1 ${radius} ${radius}
  v${height - radius}
  z
  `;
}
