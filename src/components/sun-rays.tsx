const RAY_DEFS = [
  [0, 1.4, 180, "rayGrad"],
  [14, 0.8, 175, "rayGradAlt"],
  [22, 1.2, 178, "rayGrad"],
  [35, 0.6, 170, "rayGradAlt"],
  [48, 1.6, 180, "rayGrad"],
  [60, 0.9, 172, "rayGradAlt"],
  [72, 1.3, 178, "rayGrad"],
  [85, 0.7, 168, "rayGradAlt"],
  [98, 1.5, 180, "rayGrad"],
  [110, 0.8, 172, "rayGradAlt"],
  [124, 1.1, 176, "rayGrad"],
  [138, 0.6, 168, "rayGradAlt"],
  [152, 1.4, 180, "rayGrad"],
  [168, 0.9, 174, "rayGradAlt"],
  [185, 1.2, 178, "rayGrad"],
  [202, 0.7, 170, "rayGradAlt"],
  [218, 1.5, 180, "rayGrad"],
  [232, 0.8, 172, "rayGradAlt"],
  [248, 1.1, 176, "rayGrad"],
  [264, 0.6, 168, "rayGradAlt"],
  [280, 1.3, 178, "rayGrad"],
  [296, 0.9, 174, "rayGradAlt"],
  [312, 1.5, 180, "rayGrad"],
  [328, 0.7, 170, "rayGradAlt"],
  [344, 1.2, 178, "rayGrad"],
] as const;

function rayPoints(half: number, len: number) {
  const h = (half * Math.PI) / 180;
  const t = (Math.tan(h) * len).toFixed(2);
  return `0,0 ${len},${-Number(t)} ${len},${t}`;
}

export function SunRays() {
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed top-[-50vmax] right-[-50vmax] w-[100vmax] h-[100vmax] pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.88_0.10_60/0.18)_0%,oklch(0.85_0.14_285/0.09)_28%,transparent_50%)] blur-[30px]"
      />

      <div
        aria-hidden="true"
        className="fixed top-0 right-0 w-0 h-0 pointer-events-none z-0 overflow-visible [-webkit-mask-image:radial-gradient(circle_at_100%_0%,#000_0%,rgba(0,0,0,0.85)_18vmax,rgba(0,0,0,0.4)_32vmax,transparent_48vmax)] mask-[radial-gradient(circle_at_100%_0%,#000_0%,rgba(0,0,0,0.85)_18vmax,rgba(0,0,0,0.4)_32vmax,transparent_48vmax)]"
      >
        <div
          className="sunray-origin absolute w-[200vmax] h-[200vmax] left-[-100vmax] top-[-100vmax] origin-center animate-[sunrays-rotate_240s_linear_infinite,sunrays-breathe_16s_ease-in-out_infinite] will-change-transform"
        >
          <svg
            viewBox="-100 -100 200 200"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full block"
          >
            <defs>
              <linearGradient id="rayGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0" />
                <stop offset="20%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0.10" />
                <stop offset="55%" stopColor="oklch(0.65 0.16 50)" stopOpacity="0.14" />
                <stop offset="100%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rayGradAlt" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0" />
                <stop offset="40%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0.06" />
                <stop offset="80%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0.10" />
                <stop offset="100%" stopColor="oklch(0.55 0.22 285)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g>
              {RAY_DEFS.map(([angle, half, len, grad]) => (
                <polygon
                  key={`${angle}-${grad}`}
                  points={rayPoints(half, len)}
                  fill={`url(#${grad})`}
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}
