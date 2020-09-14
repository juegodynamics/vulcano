import fs from 'fs';
import { Entity, Recipe } from 'src/types/factorio';
import { VULC } from 'src/context';
import { ICookbookDAL } from './types';

const { log } = VULC();

export class CookbookDAL_FromMaster implements ICookbookDAL {
  recipeMaster: Record<string, Recipe>;
  recipeMasterIndex: Record<
    keyof Pick<Recipe, 'ingredients' | 'products'>,
    Record<string, string[]>
  >;
  entityMaster: Record<string, Entity>;
  entityMasterIndex: Record<keyof Pick<Entity, 'crafting_categories'>, Record<string, string[]>>;

  constructor({
    recipeMaster,
    recipeMasterIndex,
    entityMaster,
    entityMasterIndex,
  }: {
    recipeMaster: Record<string, Recipe>;
    recipeMasterIndex: Record<
      keyof Pick<Recipe, 'ingredients' | 'products'>,
      Record<string, string[]>
    >;
    entityMaster: Record<string, Entity>;
    entityMasterIndex: Record<keyof Pick<Entity, 'crafting_categories'>, Record<string, string[]>>;
  }) {
    this.recipeMaster = recipeMaster;
    this.recipeMasterIndex = recipeMasterIndex;
    this.entityMaster = entityMaster;
    this.entityMasterIndex = entityMasterIndex;
  }
  public getRecipe(name: string): Recipe | undefined {
    return this.recipeMaster[name];
  }
  public getRecipeNamesByIngredientName(name: string): string[] {
    return this.recipeMasterIndex.ingredients[name] || [];
  }
  public getRecipeNamesByProductName(name: string): string[] {
    return this.recipeMasterIndex.products[name] || [];
  }
  public getEntity(name: string): Entity {
    return this.entityMaster[name];
  }
  public getEntityNamesByCraftingCategory(category: string): string[] {
    return this.entityMasterIndex.crafting_categories[category];
  }
}

export class CookbookDAL_Filesystem extends CookbookDAL_FromMaster implements ICookbookDAL {
  constructor({
    recipeFilePath,
    entityFilePath,
  }: {
    recipeFilePath: string;
    entityFilePath: string;
  }) {
    super({
      recipeMaster: (() => {
        log.info(`Loading recipe master from ${recipeFilePath}`);
        return JSON.parse(fs.readFileSync(recipeFilePath, { encoding: 'utf-8' }));
      })(),
      recipeMasterIndex: {
        ingredients: (() => {
          const ingredientIndexFilePath = recipeFilePath.replace(
            'recipes.json',
            'recipes.ingredients-index.json'
          );
          log.info(`Loading recipe ingredient index from ${ingredientIndexFilePath}`);
          return JSON.parse(fs.readFileSync(ingredientIndexFilePath, { encoding: 'utf-8' }));
        })(),
        products: (() => {
          const productIndexFilePath = recipeFilePath.replace(
            'recipes.json',
            'recipes.products-index.json'
          );
          log.info(`Loading recipe product index from ${productIndexFilePath}`);
          return JSON.parse(fs.readFileSync(productIndexFilePath, { encoding: 'utf-8' }));
        })(),
      },
      entityMaster: (() => {
        log.info(`Loading entity master from ${entityFilePath}`);
        return JSON.parse(fs.readFileSync(entityFilePath, { encoding: 'utf-8' }));
      })(),
      entityMasterIndex: {
        crafting_categories: (() => {
          const entityIndexFilePath = entityFilePath.replace(
            'entities.json',
            'entities.crafting_categories-index.json'
          );
          log.info(`Loading entity crafting categories index from ${entityIndexFilePath}`);
          return JSON.parse(fs.readFileSync(entityIndexFilePath, { encoding: 'utf-8' }));
        })(),
      },
    });
  }
  getEntity: (name: string) => Entity;
  getEntityNamesByCraftingCategory: (category: string) => string[];
}

export const makeRecipeMaster = ({ mockRecipes }: { mockRecipes: Recipe[] }) =>
  mockRecipes.reduce(
    (master, nextRecipe) => ({
      ...master,
      [nextRecipe.name]: nextRecipe,
    }),
    {}
  );

export default CookbookDAL_Filesystem;
