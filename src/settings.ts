import { Params } from './hypotrochoid.ts';

export default (settings: HTMLDivElement) => {
  const inputs: HTMLInputElement[] = [
    settings.querySelector('[name="fixedCircleRadius"]')!,
    settings.querySelector('[name="rollingCircleRadius"]')!,
    settings.querySelector('[name="distanceToTracingPoint"]')!,
    settings.querySelector('[name="strokeColor"]')!,
  ]

  const getInput = (name: string): HTMLInputElement | null => {
    return inputs.find((input: HTMLInputElement) => input.name === name) ?? null;
  }

  const call = (params: Params) => {
    Object.keys(params).forEach((key: string) => {
      const input: HTMLInputElement | null = getInput(key);
      if (input) {
        input.value = (params as any)[key];
      }
    })
  }

  const onChange = (changeCb: (params: Params) => void) => {
    const onChange = () => {
      const [ fixedCircleRadiusValue,
        rollingCircleRadiusValue,
        distanceToTracingPointValue,
        strokeColorValue ] = inputs.map((input: HTMLInputElement) => input.value);

      changeCb({
        fixedCircleRadius: +fixedCircleRadiusValue,
        rollingCircleRadius: +rollingCircleRadiusValue,
        strokeColor: strokeColorValue,
        distanceToTracingPoint: +distanceToTracingPointValue
      });
    }

    settings.addEventListener('change', onChange)
  };

  return { call, onChange }
}