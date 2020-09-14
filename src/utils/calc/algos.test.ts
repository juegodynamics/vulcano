import { Factors, lcm } from './algos';

describe('lcm:', () => {
  const lcmCases: Array<{
    x: Factors;
    y: Factors;
    out: number;
  }> = [
    {
      x: { 2: 1, 3: 2, 5: 1 },
      y: { 2: 1, 3: 2, 19: 1 },
      out: Factors.getValue({ 2: 1, 3: 2 }),
    },
  ];

  lcmCases.forEach(lcmCase => () => {
    const xValue = Factors.getValue(lcmCase.x);
    const yValue = Factors.getValue(lcmCase.y);

    it(`lcm(${xValue},${yValue}=${lcmCase.out}`, () => {
      expect(lcm(xValue, yValue)).toEqual(lcmCase.out);
    });
  });
});
