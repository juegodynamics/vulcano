/c
recipes = {}
for k, v in pairs(game.recipe_prototypes) do
  table.insert(recipes, serpent.line({
    name=v.name,
    localised_description={
      id=v.localised_description,
      text=game.translate({v.localised_description}, game.players[1].locale)
    },
    localised_name=v.localised_name,
    energy=v.energy,
    order=v.order,
    ingredients=v.ingredients,
    main_product=v.main_product,
    products=v.products,
    category=v.category,
    group=v.group,
    subgroup=v.subgroup,
    emissions_multiplier=v.emissions_multiplier,
    enabled=v.enabled,
    hidden=v.hidden,
  }))
end
game.player.print(table.concat(recipes, "\n"))
game.write_file("recipes.lua.stream", table.concat(recipes, "\n"))