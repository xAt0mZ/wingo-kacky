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
import { groupBy } from 'lodash';

import { useTheme } from '@/hooks/useTheme';
import { Poule, usePoules } from '@/hooks/usePoules';

import pouleImg from './poule.gif';
import petImg from './pet.gif';
import shakeImg from './shake.gif';

type DataPoint = Poule & {
  cumulated: number;
};

export function PoulesChart() {
  return <Content />;
}

function Content() {
  const { data: poules, isLoading } = usePoules();
  const { lightMode } = useTheme();
  if (!poules || isLoading) {
    return null;
  }

  let cumulated = 0;
  const data: DataPoint[] = Object.entries(
    groupBy(poules, (p) =>
      new Date(p.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
      }),
    ),
  ).map(([date, values]) => {
    const poule = values.reduce((acc, v) => acc + v.poule, 0);
    const pet = values.reduce((acc, v) => acc + v.pet, 0);
    const shake = values.reduce((acc, v) => acc + v.shake, 0);
    cumulated += poule + pet + shake;
    return { date, poule, pet, shake, cumulated };
  });

  return (
    <div className="relative w-full grow overflow-hidden">
      <div className="absolute inset-0">
        <ResponsiveContainer>
          <ComposedChart data={data}>
            <YAxis
              yAxisId="count"
              stroke="var(--theme-2)"
              tick={({ payload, ...props }) => (
                <Text {...props} fill="var(--theme-2)">
                  {humanize(payload.value, 0)}
                </Text>
              )}
            />
            <Bar
              dataKey="poule"
              stackId="count"
              yAxisId="count"
              fill={lightMode ? 'var(--theme-4)' : 'var(--theme-blue)'}
              stroke={lightMode ? 'var(--theme-4)' : 'var(--theme-blue)'}
            />
            <Bar
              dataKey="pet"
              stackId="count"
              yAxisId="count"
              fill="var(--theme-red)"
              stroke="var(--theme-red)"
            />
            <Bar
              dataKey="shake"
              stackId="count"
              yAxisId="count"
              fill="var(--theme-gold)"
              stroke="var(--theme-gold)"
              shape={({ x, y, width, height, fill, stroke }) => {
                if (!x || !y || !width || !height || height === 0) {
                  return <></>;
                }
                return (
                  <>
                    <path
                      d={roundedPath(x, y, width, height, 4)}
                      fill={fill}
                      stroke={stroke}
                      className="lg:hidden"
                    />
                    <path
                      d={roundedPath(x, y, width, height, 6)}
                      fill={fill}
                      stroke={stroke}
                      className="hidden lg:inline 2xl:hidden"
                    />
                    <path
                      d={roundedPath(x, y, width, height, 8)}
                      fill={fill}
                      stroke={stroke}
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
              tick={({ payload, ...props }) => (
                <Text {...props} fill="var(--theme-2)">
                  {humanize(payload.value, 0)}
                </Text>
              )}
            />
            <Line
              type="monotone"
              yAxisId="cumulated"
              dataKey="cumulated"
              stroke="var(--theme-2)"
              fill="var(--theme-2)"
              strokeWidth={2}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) {
                  return null;
                }

                const poule = payload[0].value as number;
                const pet = payload[1].value as number;
                const shake = payload[2].value as number;
                const cumulated = payload[3].value as number;

                return (
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-theme-2 bg-theme-6 p-4 text-right text-theme-2">
                    <span className="col-span-2 mb-2 text-center text-lg">
                      {label}
                    </span>
                    <span className="flex items-center justify-between">
                      <img src={shakeImg} className="w-6" />
                      <div className="h-2 w-6 rounded-lg bg-gold" />
                    </span>
                    <span>{humanize(shake)}</span>

                    <span className="flex items-center justify-between">
                      <img src={petImg} className="w-6" />
                      <div className="h-2 w-6 rounded-lg bg-red" />
                    </span>
                    <span>{humanize(pet)}</span>

                    <span className="flex items-center justify-between">
                      <img src={pouleImg} className="w-6" />
                      <div
                        className="h-2 w-6 rounded-lg"
                        style={{
                          backgroundColor: lightMode
                            ? 'var(--theme-4)'
                            : 'var(--theme-blue)',
                        }}
                      />
                    </span>
                    <span>{humanize(poule)}</span>

                    <span className="text-center">Journée </span>
                    <span>{humanize(poule + pet + shake)}</span>

                    <span className="text-center">Total </span>
                    <span>{humanize(cumulated)}</span>
                  </div>
                );
              }}
            />
            <XAxis
              dataKey="date"
              height={40}
              stroke="var(--theme-2)"
              tick={({ payload, ...props }) => (
                <Text
                  {...props}
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

function humanize(num: number, toFixed: number = 2) {
  if (num === 0) {
    return '0';
  }
  const s = ['', 'k', 'M', 'G', 'T', 'P'];
  const e = Math.floor(Math.log(num) / Math.log(1000));
  const n = num / Math.pow(1000, e);
  return `${num < 1000 ? n : n.toFixed(toFixed)} ${s[e]}`;
}

function roundedPath(
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
