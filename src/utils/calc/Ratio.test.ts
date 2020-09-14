import { IRatio, Ratio } from './Ratio';

describe('Ratio methods:', () => {
  it('basic construction', () => {
    expect(new Ratio(1, 2).__toInterface__()).toEqual({
      numerator: 1,
      denominator: 2,
      approx: 0.5,
    });
  });

  const additionCases: Array<{
    terms: Array<ConstructorParameters<typeof Ratio>>;
    sum: IRatio;
  }> = [
    {
      terms: [
        [1, 2],
        [1, 2],
      ],
      sum: { numerator: 1, denominator: 1, approx: 1 },
    },
    {
      terms: [
        [1, 2],
        [3, 4],
      ],
      sum: { numerator: 5, denominator: 4, approx: 1.25 },
    },
    {
      terms: [
        [3, 7],
        [2, 9],
      ],
      sum: { numerator: 41, denominator: 63, approx: 0.6508 },
    },
    {
      terms: [
        [2, 3],
        [5, 7],
        [11, 13],
        [17, 19],
        [23, 29],
      ],
      sum: { numerator: 588898, denominator: 150423, approx: 3.9149 },
    },
  ];

  additionCases.forEach(aCase => {
    it(JSON.stringify(aCase), () => {
      const sum = Ratio.__null__();
      aCase.terms.forEach(term => sum.add(new Ratio(...term)));
      expect(sum.__toInterface__()).toEqual(aCase.sum);
    });
  });
});
