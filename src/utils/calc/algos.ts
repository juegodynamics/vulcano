import { Ratio } from './Ratio';

export const closestRatio = (value: number, maxdenom = 10000): Ratio => {
  const best = { numerator: 1, denominator: 1, error: Math.abs(value - 1) };
  for (let denominator = 1; best.error > 0 && denominator <= maxdenom; denominator++) {
    const numerator = Math.round(value * denominator);
    const error = Math.abs(value - numerator / denominator);
    if (error >= best.error) continue;
    best.numerator = numerator;
    best.denominator = denominator;
    best.error = error;
  }
  return new Ratio(best.numerator, best.denominator);
};

export const lcm = (x: number, y: number): number => {
  return Math.abs((x * y) / gcd(x, y));
};

export const gcd = (a: number, b: number): number => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
};

export type Factors = Record<number, number>;
export namespace Factors {
  export const getValue = (f: Factors) =>
    Object.entries(f).reduce((product, [factor, power]) => product * parseInt(factor) ** power, 1);
  export const getLCM = (f1: Factors, f2: Factors): Factors =>
    Object.keys(f1)
      .filter(f1key => !!f2[f1key])
      .reduce(
        (fCommon, fCommonKey) => ({
          ...fCommon,
          [fCommonKey]: Math.min(f1[fCommonKey], f2[fCommonKey]),
        }),
        {}
      );
}
