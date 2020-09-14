import { Recipe } from '../../types/factorio';

const basicRecipeData = {
  recipe: {
    name: 'angelsore1-chunk-processing',
    category: 'ore-sorting',
    energy: 1.5,
    ingredients: [
      {
        amount: 7,
        name: 'angels-ore1-chunk',
        type: 'item',
      },
    ],
    products: [
      {
        amount: 1,
        name: 'slag',
        probability: 1,
        type: 'item',
      },
      {
        amount: 2,
        name: 'iron-ore',
        probability: 1,
        type: 'item',
      },
      {
        amount: 1,
        name: 'copper-ore',
        probability: 1,
        type: 'item',
      },
      {
        amount: 1,
        name: 'quartz',
        probability: 1,
        type: 'item',
      },
      {
        amount: 1,
        name: 'nickel-ore',
        probability: 1,
        type: 'item',
      },
      {
        amount: 1,
        name: 'y-res1',
        probability: 1,
        type: 'item',
      },
    ],
    subgroup: {
      __self: 'userdata',
    },
  },
  assemblies: [
    {
      assemblers: ['ore-sorting-facility-4'],
      throughput: {
        secondsPerCraft: {
          numerator: 1.5,
          denominator: 2,
          approx: 0.75,
        },
        ingredients: [
          {
            name: 'angels-ore1-chunk',
            amountPerSecond: {
              numerator: 7,
              denominator: 0.75,
              approx: 9.333,
            },
          },
        ],
        products: [
          {
            name: 'slag',
            amountPerSecond: {
              numerator: 1,
              denominator: 0.75,
              approx: 1.333,
            },
          },
          {
            name: 'iron-ore',
            amountPerSecond: {
              numerator: 2,
              denominator: 0.75,
              approx: 2.667,
            },
          },
          {
            name: 'copper-ore',
            amountPerSecond: {
              numerator: 1,
              denominator: 0.75,
              approx: 1.333,
            },
          },
          {
            name: 'quartz',
            amountPerSecond: {
              numerator: 1,
              denominator: 0.75,
              approx: 1.333,
            },
          },
          {
            name: 'nickel-ore',
            amountPerSecond: {
              numerator: 1,
              denominator: 0.75,
              approx: 1.333,
            },
          },
          {
            name: 'y-res1',
            amountPerSecond: {
              numerator: 1,
              denominator: 0.75,
              approx: 1.333,
            },
          },
        ],
      },
    },
  ],
};
