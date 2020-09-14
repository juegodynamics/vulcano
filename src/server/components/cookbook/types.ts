import { Err } from 'src/server/components/_common';
import { Entity, Recipe } from 'src/types/factorio';
import * as calc from 'src/utils/calc';

export interface ICookbookHandler {
  getRecipe: ICookbookHandler.Calls.GetRecipe;
  searchRecipes: ICookbookHandler.Calls.SearchRecipes;
  getEntity: ICookbookHandler.Calls.GetEntity;
  searchEntities: ICookbookHandler.Calls.SearchEntities;
}

export namespace ICookbookHandler {
  export namespace Calls {
    export type GetRecipe = (req: {
      name: string;
    }) => Promise<
      | {
          recipe: Recipe;
          assemblies?: Types.Assembly[];
        }
      | Err.NoMatchFound
    >;

    export type SearchRecipes = (req: {
      ingredients?: string[];
      products?: string[];
    }) => Promise<
      | {
          recipes: Record<string, Recipe>;
        }
      | Err.NoMatchFound
      | Err.InvalidQuery
    >;

    export type GetEntity = (req: {
      name: string;
    }) => Promise<
      | {
          entity: Entity;
        }
      | Err.NoMatchFound
    >;

    export type SearchEntities = (req: {
      crafting_category: string;
    }) => Promise<
      | {
          entities: Record<string, Entity>;
        }
      | Err.NoMatchFound
    >;
  }
  export namespace Types {
    export interface Assembly {
      assemblers: string[];
      throughput: {
        secondsPerCraft: calc.IRatio;
        ingredients: Array<{
          name: string;
          amountPerSecond: calc.IRatio;
        }>;
        products: Array<{
          name: string;
          amountPerSecond: calc.IRatio;
        }>;
      };
    }
  }
}

export interface ICookbookDAL {
  getRecipe: (name: string) => Recipe | undefined;
  getRecipeNamesByIngredientName: (name: string) => string[];
  getRecipeNamesByProductName: (name: string) => string[];
  getEntity: (name: string) => Entity | undefined;
  getEntityNamesByCraftingCategory: (category: string) => string[];
}
