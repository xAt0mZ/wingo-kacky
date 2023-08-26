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
  const { lightMode } = useTheme();

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
            <YAxis yAxisId="finished" stroke="var(--theme-2)" />
            <Bar
              yAxisId="finished"
              dataKey="finished"
              fill={lightMode ? 'var(--theme-4)' : 'var(--theme-blue)'}
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
              stroke="var(--theme-2)"
            />
            <Line
              type="monotone"
              yAxisId="cumulated"
              dataKey="cumulated"
              fill="var(--theme-2)"
              stroke="var(--theme-2)"
              strokeWidth={2}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) {
                  return null;
                }

                const finished = payload[0].value;
                const cumulated = payload[1].value;

                return (
                  <div className="grid grid-cols-3 gap-2 rounded-2xl border border-theme-2 bg-theme-6 p-4 text-center text-theme-2">
                    <span className="col-span-3 mb-2 text-center text-lg">
                      {label}
                    </span>
                    <span className="col-span-2">Terminées </span>
                    <span>{finished}</span>
                    <span className="col-span-2">Total </span>
                    <span>{cumulated}</span>
                  </div>
                );
              }}
            />
            <XAxis
              dataKey="name"
              height={40}
              stroke="var(--theme-2)"
              tick={({ x, y, payload }) => (
                <Text
                  fontSize={'16px'}
                  width={'16px'}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  verticalAnchor="start"
                  fill="var(--theme-2)"
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
