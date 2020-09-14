import { Err } from 'src/server/components/_common';
import { Entity } from 'src/types/factorio';
import { intersect } from 'src/utils/arr';
import * as calc from 'src/utils/calc';
import { _t } from 'src/utils/lotype';

import { ICookbookDAL, ICookbookHandler } from './types';

class CookbookHandler implements ICookbookHandler {
  cookbookDAL: ICookbookDAL;

  constructor({ cookbookDAL }: { cookbookDAL: ICookbookDAL }) {
    this.cookbookDAL = cookbookDAL;
  }

  getRecipe: ICookbookHandler.Calls.GetRecipe = async req => {
    const recipe = this.cookbookDAL.getRecipe(req.name);
    if (!recipe) {
      return Err.NoMatchFound;
    }

    const resp: _t.Unwrap<ICookbookHandler.Calls.GetRecipe> = { recipe };

    const entityBySpeed: Record<number, Entity[]> = this.cookbookDAL
      .getEntityNamesByCraftingCategory(recipe.category)
      .map(entityName => this.cookbookDAL.getEntity(entityName))
      .reduce<Record<number, Entity[]>>(
        (partialEntityBySpeed, nextEntity) => ({
          ...partialEntityBySpeed,
          [nextEntity.crafting_speed]: partialEntityBySpeed[nextEntity.crafting_speed]
            ? [...partialEntityBySpeed[nextEntity.crafting_speed], nextEntity]
            : [nextEntity],
        }),
        {}
      );

    resp.assemblies = Object.entries(entityBySpeed)
      .map(([craftingSpeed, entities]) => ({
        assemblers: entities.map(entity => entity.name),
        throughput: {
          secondsPerCraft: new calc.Ratio(
            recipe.energy,
            parseFloat(craftingSpeed)
          ).__toInterface__(),
        },
      }))
      .map(assembly => ({
        ...assembly,
        throughput: {
          ...assembly.throughput,
          ingredients: recipe.ingredients.map(ingredient => ({
            name: ingredient.name,
            amountPerSecond: new calc.Ratio(
              ingredient.amount,
              assembly.throughput.secondsPerCraft.approx
            ).__toInterface__(),
          })),
          products: recipe.products.map(product => ({
            name: product.name,
            amountPerSecond: new calc.Ratio(
              product.amount,
              assembly.throughput.secondsPerCraft.approx
            ).__toInterface__(),
          })),
        },
      }))
      .sort((a, b) => b.throughput.secondsPerCraft.approx - a.throughput.secondsPerCraft.approx);

    return resp;
  };

  searchRecipes: ICookbookHandler.Calls.SearchRecipes = async req => {
    const { ingredients, products } = req;
    if (!ingredients && !products) {
      return Err.InvalidQuery;
    }
    const candidateRecipes: string[][] = [];
    if (ingredients) {
      ingredients.forEach(ingredient =>
        candidateRecipes.push(this.cookbookDAL.getRecipeNamesByIngredientName(ingredient))
      );
    }
    if (products) {
      products.forEach(product =>
        candidateRecipes.push(this.cookbookDAL.getRecipeNamesByProductName(product))
      );
    }

    const allMatches = intersect(...candidateRecipes);
    if (allMatches.length === 0) {
      return { err: { noMatchFound: true } };
    }

    return {
      recipes: allMatches.reduce(
        (recipeMap, nextRecipe) => ({
          ...recipeMap,
          [nextRecipe]: this.cookbookDAL.getRecipe(nextRecipe),
        }),
        {}
      ),
    };
  };

  getEntity: ICookbookHandler.Calls.GetEntity = async req => {
    const entity = this.cookbookDAL.getEntity(req.name);
    return entity ? { entity } : { err: { noMatchFound: true } };
  };

  searchEntities: ICookbookHandler.Calls.SearchEntities = async req => {
    const entities = this.cookbookDAL.getEntityNamesByCraftingCategory(req.crafting_category);
    return entities && entities.length > 0
      ? {
          entities: entities.reduce(
            (entityMap, entity) => ({ ...entityMap, [entity]: this.cookbookDAL.getEntity(entity) }),
            {}
          ),
        }
      : { err: { noMatchFound: true } };
  };
}

export default CookbookHandler;
