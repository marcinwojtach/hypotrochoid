export type Params = {
  fixedCircleRadius: number;
  rollingCircleRadius: number;
  distanceToTracingPoint: number;
  strokeColor: string;
  isRotating: boolean;
}

let latestRunParams: Params | null = null;

const hypotrochoid = ({ fixedCircleRadius: R, rollingCircleRadius: r, distanceToTracingPoint: d }: Params, theta: number): [ number, number ] => {
  const x: number = (R - r) * Math.cos(theta) + d * Math.cos((R - r) / r * theta);
  const y: number = (R - r) * Math.sin(theta) - d * Math.sin((R - r) / r * theta);
  return [ x, y ];
}

export default (canvas: HTMLCanvasElement | null) => {
  if (!canvas) {
    throw new Error('Canvas is not defined');
  }

  const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const draw = (ctx: CanvasRenderingContext2D, params: Params) => {
    const width: number = ctx.canvas.width;
    const height: number = ctx.canvas.height;

    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = params.strokeColor;
    ctx.beginPath();

    let hypoTuple: [ number, number ] = hypotrochoid(params, 0);
    ctx.moveTo(hypoTuple[0], hypoTuple[1]);
    for (let i: number = 0; i < 10000; i += 5) {
      hypoTuple = hypotrochoid(params, i * Math.PI / 200)
      ctx.lineTo(hypoTuple[0], hypoTuple[1])
    }

    ctx.stroke()
    ctx.restore()
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
