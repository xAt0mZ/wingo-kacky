import clsx from 'clsx';
import { useMemo } from 'react';
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

import pouleImg from './images/poule.gif';
import petImg from './images/pet.gif';
import shakeImg from './images/shake.gif';
import { usePoulesFilter } from './usePoulesFilters';
import { displayByDay, displayByHour } from './options';

type DataPoint = Poule & {
  cumulated: number;
};

export function PoulesChart() {
  return <Content />;
}

function Content() {
  const { filters } = usePoulesFilter();
  const { data: poules, isLoading } = usePoules();
  const { lightMode } = useTheme();

  const data: DataPoint[] = useMemo(() => {
    let cumulated = 0;
    return Object.entries(
      groupBy(poules, (p) =>
        new Date(p.date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'short',
          hour: filters.displayBy === displayByDay ? undefined : '2-digit',
        }),
      ),
    )
      .map(([date, values]) => {
        const poule = values.reduce((acc, v) => acc + v.poule, 0);
        const pet = values.reduce((acc, v) => acc + v.pet, 0);
        const shake = values.reduce((acc, v) => acc + v.shake, 0);
        cumulated += poule + pet + shake;
        return { date, poule, pet, shake, cumulated };
      })
      .filter(({ poule, pet, shake }) =>
        filters.displayBy === displayByHour ? poule + pet + shake > 100 : true,
      );
  }, [filters.displayBy, poules]);

  if (!poules || isLoading) {
    return null;
  }

  return (
    <div className="relative w-full grow overflow-hidden">
      <div className="absolute inset-0">
        <ResponsiveContainer>
          <ComposedChart data={data}>
            {(filters.pet || filters.poule || filters.shake) && (
              <YAxis
                yAxisId="count"
                stroke="var(--theme-2)"
                tick={({ payload, ...props }) => (
                  <Text {...props} fill="var(--theme-2)">
                    {humanize(payload.value, 0)}
                  </Text>
                )}
              />
            )}
            {filters.poule && (
              <Bar
                dataKey="poule"
                stackId="count"
                yAxisId="count"
                fill={lightMode ? 'var(--theme-4)' : 'var(--theme-blue)'}
                stroke={lightMode ? 'var(--theme-4)' : 'var(--theme-blue)'}
                shape={(props) => (
                  <Shape {...props} rounded={!filters.shake && !filters.pet} />
                )}
              />
            )}
            {filters.pet && (
              <Bar
                dataKey="pet"
                stackId="count"
                yAxisId="count"
                fill="var(--theme-red)"
                stroke="var(--theme-red)"
                shape={(props) => <Shape {...props} rounded={!filters.shake} />}
              />
            )}
            {filters.shake && (
              <Bar
                dataKey="shake"
                stackId="count"
                yAxisId="count"
                fill="var(--theme-gold)"
                stroke="var(--theme-gold)"
                shape={(props) => <Shape {...props} rounded />}
              />
            )}
            {filters.total && (
              <>
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
                  dot={false}
                />
              </>
            )}
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) {
                  return null;
                }

                const poule =
                  (payload.find((p) => p.dataKey === 'poule')
                    ?.value as number) || 0;
                const pet =
                  (payload.find((p) => p.dataKey === 'pet')?.value as number) ||
                  0;
                const shake =
                  (payload.find((p) => p.dataKey === 'shake')
                    ?.value as number) || 0;
                const cumulated =
                  (payload.find((p) => p.dataKey === 'cumulated')
                    ?.value as number) || 0;

                return (
                  <div className="grid grid-cols-2 gap-2 rounded-2xl border border-theme-2 bg-theme-6 p-4 text-right text-theme-2">
                    <span className="col-span-2 mb-2 text-center text-lg">
                      {label}
                    </span>
                    {filters.shake && (
                      <TooltipItem
                        image={shakeImg}
                        value={shake}
                        className="bg-gold"
                      />
                    )}

                    {filters.pet && (
                      <TooltipItem
                        image={petImg}
                        value={pet}
                        className="bg-red"
                      />
                    )}

                    {filters.poule && (
                      <TooltipItem
                        image={pouleImg}
                        value={poule}
                        className={lightMode ? 'bg-theme-4' : 'bg-blue'}
                      />
                    )}

                    {(filters.poule || filters.pet || filters.shake) && (
                      <>
                        <span className="text-center">
                          {filters.displayBy === displayByDay
                            ? 'Journée'
                            : 'Heure'}
                        </span>
                        <span>{humanize(poule + pet + shake)}</span>
                      </>
                    )}

                    {filters.total && (
                      <>
                        <span className="text-center">Total </span>
                        <span>{humanize(cumulated)}</span>
                      </>
                    )}
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

type TooltipItemProps = {
  value: number;
  image: string;
  className?: string;
};
function TooltipItem({ value, image, className }: TooltipItemProps) {
  return (
    <>
      <span className="flex items-center justify-between">
        <img src={image} className="w-6" />
        <div className={clsx('h-2 w-6 rounded-lg', className)} />
      </span>
      <span>{humanize(value)}</span>
    </>
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
  expectedRadius: number,
) {
  const radius = Math.min(width / 2, expectedRadius);
  return `M${x},${Number(y) + height}
  v${-(height - radius)}
  a${radius} ${radius} 0 0 1 ${radius} ${-radius}
  h${width - radius * 2}
  a${radius} ${radius} 0 0 1 ${radius} ${radius}
  v${height - radius}
  z
  `;
}

function straightPath(
  x: number | string,
  y: number | string,
  width: number,
  height: number,
) {
  return `M${x},${Number(y) + height}
  v${-height}
  h${width}
  v${height}
  z
  `;
}

type ShapeProps = {
  x: number | string;
  y: number | string;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  rounded: boolean;
};
function Shape({ x, y, width, height, fill, stroke, rounded }: ShapeProps) {
  if (!x || !y || !width || !height || height === 0) {
    return <></>;
  }
  return (
    <>
      <path
        d={
          rounded
            ? roundedPath(x, y, width, height, 4)
            : straightPath(x, y, width, height)
        }
        fill={fill}
        stroke={stroke}
        className="lg:hidden"
      />
      <path
        d={
          rounded
            ? roundedPath(x, y, width, height, 6)
            : straightPath(x, y, width, height)
        }
        fill={fill}
        stroke={stroke}
        className="hidden lg:inline 2xl:hidden"
      />
      <path
        d={
          rounded
            ? roundedPath(x, y, width, height, 8)
            : straightPath(x, y, width, height)
        }
        fill={fill}
        stroke={stroke}
        className="hidden 2xl:inline "
      />
    </>
  );
}
