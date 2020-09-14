import * as op from './operations';

describe('intersect:', () => {
  const tCases: Array<{
    params: Parameters<typeof op.intersect>;
    expectValue: ReturnType<typeof op.intersect>;
  }> = [
    {
      params: [
        ['a', 'b', 'c', 'd', 'e'],
        ['a', 'c', 'e'],
        ['b', 'c', 'd'],
      ],
      expectValue: ['c'],
    },
  ];

  tCases.forEach(tCase => {
    it(JSON.stringify(tCase), () => {
      expect(op.intersect(...tCase.params)).toEqual(tCase.expectValue);
    });
  });
});
