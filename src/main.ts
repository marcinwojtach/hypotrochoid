import './style.css'
import hypotrochoid, { Params } from './hypotrochoid.ts';
import gui from './gui.ts';

const app: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;

const startingParams: Params = {
  fixedCircleRadius: 90,
  rollingCircleRadius: 200,
  distanceToTracingPoint: 300,
  strokeColor: '#19b6b6',
};

app.innerHTML = `
  <div class="container">
    <div class="canvas-container">
      <canvas class="canvas"></canvas>
    </div>
  </div>
`

try {
  const hypoModule = hypotrochoid(document.querySelector('.canvas')!);
  hypoModule.run(startingParams);
  gui(startingParams, (params: Params) => hypoModule.run(params))
} catch (e) {
  app.innerHTML = `Failed to start the app ${e}`;
}
