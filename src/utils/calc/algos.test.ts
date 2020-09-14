import { lcm, Factors } from './algos';

describe('lcm:', () => {
  const lcmCase: Array<{
    x: Factors;
    y: Factors;
    out: number;
  }> = [
    {
      x: { 2: 1, 3: 2, 5: 1 },
      y: { 2: 1, 3: 2, 19: 1 },
      out: Factors.getValue({ 2: 1, 3: 2 }),
    },
    {
      x: { 2: 1, 3: 2, 5: 1 },
      y: { 2: 1, 3: 2, 19: 1 },
      out: Factors.getValue({ 2: 1, 3: 2 }),
    },
  ];
});
