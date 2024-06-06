import * as dat from 'dat.gui';
import { Params } from './hypotrochoid.ts';

export default (defaults: Params, drawFn: (options: Params) => void) => {
  const gui: dat.GUI = new dat.GUI({ width: 300 });

  gui.add(defaults, 'fixedCircleRadius', 50, 250)
    .name('Fixed circle radius')
    .step(1)
    .onChange((fixedCircleRadius) => drawFn({ ...defaults, fixedCircleRadius }))

  gui.add(defaults, 'rollingCircleRadius', 50, 250)
    .name('Rolling circle radius')
    .step(1)
    .onChange((rollingCircleRadius) => drawFn({ ...defaults, rollingCircleRadius }))

  gui.add(defaults, 'distanceToTracingPoint', 50, 500)
    .name('Distance to tracing point')
    .step(1)
    .onChange((distanceToTracingPoint) => drawFn({ ...defaults, distanceToTracingPoint }))

  gui.addColor(defaults, 'strokeColor')
    .name('Stroke color')
    .onChange((strokeColor) => drawFn({ ...defaults, strokeColor }))
};
