export namespace Recipe {
  export type Name = string;

  export interface Ingredient {
    name: string; // Prototype name of the required item or fluid.
    type: 'item' | 'fluid'; // "item" or "fluid".
    amount: number; // Amount of the item or fluid.
    minimum_temperature?: number; //(optional): The minimum fluid temperature required. Has no effect if type is '"item"'.
    maximum_temperature?: number; //(optional): The maximum fluid temperature allowed. Has no effect if type is '"item"'.
    catalyst_amount?: number; //or double (optional): How much of this ingredient is a catalyst.
  }

  export interface Product {
    name: string; // Prototype name of the result.
    type: 'item' | 'fluid'; // "item" or "fluid".
    amount?: number; // (optional): Amount of the item or fluid to give. If not specified, amount_min, amount_max and probability must all be specified.
    temperature?: number; // (optional): The fluid temperature of this product. Has no effect if type is '"item"'.
    amount_min?: number; // or double (optional): Minimal amount of the item or fluid to give. Has no effect when amount is specified.
    amount_max?: number; // or double (optional): Maximum amount of the item or fluid to give. Has no effect when amount is specified.
    probability?: number; // (optional): A value in range [0, 1]. Item or fluid is only given with this probability; otherwise no product is produced.
    catalyst_amount?: number; // or double (optional): How much of this product is a catalyst.
  }

  export const __mocker__ = ({
    name,
    category,
    ingredients,
    products,
    energy,
  }: Pick<Recipe, 'name' | 'category' | 'ingredients' | 'products' | 'energy'>): Recipe => ({
    name,
    localised_name: [`recipe-name.${name}`],
    localised_description: [`recipe-name.${name}`],
    category,
    ingredients,
    products,
    energy,
    enabled: false,
    hidden: false,
    order: `b[${name}]`,
  });
}

export interface Recipe {
  name: Recipe.Name; // name - Name of the recipe.
  localised_name: string[]; // localised_name - Localised name of the recipe.
  localised_description: string[]; // localised_description -
  category: string; // category - Category of the recipe.
  ingredients: Recipe.Ingredient[]; // Ingredients for this recipe.
  products: Recipe.Product[]; // The results of this recipe.
  energy: number; // energy - Energy required to execute this recipe.
  enabled: boolean; // enabled - If this recipe prototype is enabled by default (enabled at the beginning of a game).
  hidden: boolean; // hidden - Is the recipe hidden?
  hidden_from_flow_stats?: boolean; // hidden_from_flow_stats - Is the recipe hidden from flow statistics (item/fluid production statistics)?
  hidden_from_player_crafting?: boolean; // hidden_from_player_crafting - Is the recipe hidden from player crafting?
  always_show_made_in?: boolean; // always_show_made_in - Should this recipe always show "Made in" in the tooltip?
  order: string; // order - Order string.
  // group: LuaGroup; // group - Group of this recipe.
  // subgroup: LuaGroup; // subgroup - Subgroup of this recipe.
  main_product?: Recipe.Product; // main_product - The main product of this recipe, nil if no main product is defined.
  request_paste_multiplier?: number; // request_paste_multiplier - The multiplier used when this recipe is copied from an assembling machine to a requester chest.
  overload_multiplier?: number; // overload_multiplier - Used to determine how many extra items are put into an assembling machine before it's considered "full enough".
  allow_as_intermediate?: boolean; // allow_as_intermediate - If this recipe is enabled for the purpose of intermediate hand-crafting.
  allow_intermediates?: boolean; // allow_intermediates - If this recipe is allowed to use intermediate recipes when hand-crafting.
  show_amount_in_title?: boolean; // show_amount_in_title - If the amount is shown in the recipe tooltip title when the recipe produces more than 1 product.
  always_show_products?: boolean; // always_show_products - If the products are always shown in the recipe tooltip.
  emissions_multiplier?: number; // emissions_multiplier - The emissions multiplier for this recipe.
  allow_decomposition?: boolean; // allow_decomposition - Is this recipe allowed to be broken down for the recipe tooltip "Total raw" calculations?
  unlock_results?: boolean; // unlock_results - Is this recipe unlocks the result item(s) so they're shown in filter-select GUIs.
  valid?: boolean; // valid - Is this object valid?
}
