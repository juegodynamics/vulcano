import { Recipe } from 'src/types/factorio';

import { CookbookDAL_FromMaster, makeRecipeMaster } from './dal';

describe('CookbookDAL_FromMaster:', () => {
  it('Executes correct indexing', () => {
    const dal = new CookbookDAL_FromMaster({
      recipeMaster: makeRecipeMaster({ mockRecipes: [MOCK_ORE_RECIPE] }),
      recipeMasterIndex: {
        ingredients: MOCK_ORE_RECIPE.ingredients.reduce(
          (partial, next) => ({ ...partial, [next.name]: MOCK_ORE_RECIPE.name }),
          {}
        ),
        products: MOCK_ORE_RECIPE.products.reduce(
          (partial, next) => ({ ...partial, [next.name]: MOCK_ORE_RECIPE.name }),
          {}
        ),
      },
      entityMaster: {},
      entityMasterIndex: { crafting_categories: {} },
    });

    expect(dal.getRecipeNamesByIngredientName(MOCK_ORE_RECIPE.ingredients[0].name)).toContain(
      MOCK_ORE_RECIPE.name
    );
  });
});

const MOCK_ORE_RECIPE: Recipe = {
  name: 'angelsore2-chunk-processing',
  localised_name: ['recipe-name.angelsore2-chunk-processing'],
  localised_description: ['recipe-description.angelsore2-chunk-processing'],
  category: 'ore-sorting',
  ingredients: [
    {
      amount: 7,
      name: 'angels-ore2-chunk',
      type: 'item',
    },
  ],
  energy: 1.5,
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
      name: 'bauxite-ore',
      probability: 1,
      type: 'item',
    },
    {
      amount: 1,
      name: 'zinc-ore',
      probability: 1,
      type: 'item',
    },
  ],

  enabled: false,
  hidden: false,
  order: 'b[angelsore2-chunk-processing]',
  emissions_multiplier: 1,
};
