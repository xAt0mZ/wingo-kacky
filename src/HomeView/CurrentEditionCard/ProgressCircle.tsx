type Props = {
  progress: number;
};

const radius = 175;
const diameter = Math.round(Math.PI * radius * 2);

function getOffset(val: number) {
  return Math.round(((100 - Math.min(val, 100)) / 100) * diameter);
}

export function ProgressCircle({ progress }: Props) {
  const strokeDashoffset = getOffset(progress);
  const transition = `stroke-dashoffset 1s ease-out`;
  const strokeLinecap = 'round';

  return (
    <div className="pb-2 pt-4">
      <svg width="100" height="100" viewBox="-25 -25 400 400">
        <circle className="text-gray-medium" stroke="currentColor" cx="175" cy="175" r="175" strokeWidth="20" fill="none" />
        <circle
          className="text-green"
          stroke="currentColor"
          transform="rotate(-90 175 175)"
          cx="175"
          cy="175"
          r="175"
          strokeDasharray="1100"
          strokeWidth="40"
          strokeDashoffset="1100"
          strokeLinecap={strokeLinecap}
          fill="none"
          style={{ strokeDashoffset, transition }}
        />
        <foreignObject x={radius / 2} y={radius / 2} width={radius} height={radius}>
          <div className="flex h-full flex-col items-center justify-center text-7xl font-semibold text-purple-blue">
            <span className="">{progress}</span>
            <span className="">jours</span>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
