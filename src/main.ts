import './style.css'
import hypotrochoid, { Params } from './hypotrochoid.ts';
import settings from './settings.ts';

const app: HTMLDivElement = document.querySelector<HTMLDivElement>('#app')!;

const startingParams: Params = {
  fixedCircleRadius: 90,
  rollingCircleRadius: 200,
  distanceToTracingPoint: 300,
  strokeColor: '#19b6b6',
  isRotating: true,
};

app.innerHTML = `
  <div class="container">
    <div class="settings">
      <div class="setting-control">
        <label for="">Fixed circle radius</label>
        <input type="number" min="0" max="500" name="fixedCircleRadius">
      </div>
      
      <div class="setting-control">
        <label for="">Rolling circle radius</label>
        <input type="number" min="0" max="500" name="rollingCircleRadius">
      </div>
      
      <div class="setting-control">
        <label for="">Distance to tracing point</label>
        <input type="number" min="0" max="500" name="distanceToTracingPoint">
      </div>
      
      <div class="setting-control">
        <label for="">Stroke color</label>
        <input type="color" name="strokeColor">
      </div>
    </div>
    <div class="canvas-container">
      <canvas class="canvas"></canvas>
    </div>
  </div>
`

try {
  const hypoModule = hypotrochoid(document.querySelector('.canvas')!);
  const settingsModule = settings(document.querySelector('.settings')!);
  settingsModule.call(startingParams);
  hypoModule.run(startingParams);
  settingsModule.onChange((params: Params) => {
    hypoModule.run(params);
  });
} catch (e) {
  app.innerHTML = `Failed to start the app ${e}`;
}
