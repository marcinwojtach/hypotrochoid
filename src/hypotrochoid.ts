export type Params = {
  fixedCircleRadius: number;
  rollingCircleRadius: number;
  distanceToTracingPoint: number;
  strokeColor: string;
  isRotating: boolean;
}

let latestRunParams: Params | null = null;

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

const hypotrochoid = (ctx: CanvasRenderingContext2D, { fixedCircleRadius: R, rollingCircleRadius: r, distanceToTracingPoint: d, strokeColor }: Params): void => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const centerX: number = ctx.canvas.width / 2;
  const centerY: number = ctx.canvas.height / 2;
  const step: number = 0.01;
  let theta: number = 0;

  ctx.beginPath();
  ctx.moveTo(centerX + (R - r) * Math.cos(0) + d * Math.cos(0), centerY + (R - r) * Math.sin(0) - d * Math.sin(0));

  while (theta < 2 * Math.PI * r / greatestCommonDivisor(R, r)) {
    const x: number = (R - r) * Math.cos(theta) + d * Math.cos((R - r) / r * theta);
    const y: number = (R - r) * Math.sin(theta) - d * Math.sin((R - r) / r * theta);
    ctx.lineTo(centerX + x, centerY + y);
    theta += step;
  }

  ctx.strokeStyle = strokeColor ?? '#fff';
  ctx.closePath();
  ctx.stroke();
}

export default (canvas: HTMLCanvasElement | null) => {
  if (!canvas) {
    throw new Error('Canvas is not defined');
  }

  const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const draw = (context: CanvasRenderingContext2D, params: Params) => {
    hypotrochoid(context, params);
  };

  const onResize = () => {
    window.addEventListener('resize', function () {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, false);
    latestRunParams && draw(context, latestRunParams);
  };

  onResize()

  const run = (params: Params) => {
    latestRunParams = params;
    const animate = () => run(params);
    draw(context, params);

    window.requestAnimationFrame(animate);
  }

  return { run }
};
