import { TableParser } from './table';

const ENTITY_EXAMPLE =
  '{additional_pastable_entities = {}, alert_icon_shift = {0, 0}, alert_when_damaged = false, allow_copy_paste = true, build_base_evolution_requirement = 0, build_distance = 10, building_grid_bit_shift = 1, character_corpse = {__self = "userdata"}, collision_box = {left_top = {x = -0.19921875, y = -0.19921875}, right_bottom = {x = 0.19921875, y = 0.19921875}}, collision_mask = {["player-layer"] = true, ["train-layer"] = true}, collision_mask_collides_with_self = true, collision_mask_collides_with_tiles_only = false, collision_mask_considers_tile_transitions = true, collision_mask_with_flags = {["consider-tile-transitions"] = true, ["player-layer"] = true, ["train-layer"] = true}, crafting_categories = {["angels-manual-crafting"] = true, crafting = true, electronics = true, handcrafting = true, unstacking = true}, create_ghost_on_death = false, damage_hit_tint = {a = 0, b = 0, g = 0, r = 1}, drawing_box = {left_top = {x = 0, y = 0}, right_bottom = {x = 0, y = 0}}, drop_item_distance = 10, emissions_per_second = 0, enemy_map_color = {a = 255, b = 25, g = 25, r = 255}, enter_vehicle_distance = 3, fast_replaceable_group = "character", flags = {["breaths-air"] = true, ["not-flammable"] = true, ["not-on-map"] = true, ["not-repairable"] = true, ["placeable-off-grid"] = true}, fluid_capacity = 0, fluidbox_prototypes = {}, friendly_map_color = {a = 255, b = 145, g = 96, r = 0}, group = {__self = "userdata"}, has_belt_immunity = false, healing_per_tick = 0.15000000596046448, is_building = false, item_pickup_distance = 1, items_to_place_this = {{count = 1, name = "character"}}, localised_description = {"entity-description.character"}, localised_name = {"entity-name.character"}, loot_pickup_distance = 2, map_generator_bounding_box = {left_top = {x = -0.19921875, y = -0.19921875}, right_bottom = {x = 0.19921875, y = 0.19921875}}, max_circuit_wire_distance = 0, max_energy_usage = 0, max_health = 250, max_wire_distance = 0, maximum_corner_sliding_distance = 0.7, mineable_properties = {minable = false, mining_time = 0}, mining_speed = 0.5, name = "character", order = "a", radius = 0.28173785812901503, reach_distance = 10, reach_resource_distance = 2.7000000000000002, remains_when_mined = {}, remove_decoratives = "automatic", repair_speed_modifier = 1, respawn_time = 10, running_speed = 0.15, selectable_in_game = true, selection_box = {left_top = {x = -0.3984375, y = -1.3984375}, right_bottom = {x = 0.3984375, y = 0.19921875}}, selection_priority = 50, shooting_cursor_size = 2.0769531250000002, sticker_box = {left_top = {x = -0.19921875, y = -1}, right_bottom = {x = 0.19921875, y = 0}}, subgroup = {__self = "userdata"}, supports_direction = true, ticks_to_keep_aiming_direction = 100, ticks_to_keep_gun = 600, ticks_to_stay_in_combat = 600, time_to_live = 0, type = "character", valid = true}';
const RECIPE_EXAMPLE =
  '{category = "blackhole-energy", emissions_multiplier = 1, enabled = true, hidden = true, ingredients = {{amount = 1, name = "deadlock-stack-superconductor-servomechanims", type = "item"}}, localised_description = {"recipe-description.blackhole-fuel-deadlock-stack-superconductor-servomechanims"}, localised_name = {"item-name.blackhole-fuel"}, main_product = {amount = 1, name = "blackhole-fuel", probability = 1, type = "item"}, name = "blackhole-fuel-deadlock-stack-superconductor-servomechanims", order = "b[coal]", products = {{amount = 1, name = "blackhole-fuel", probability = 1, type = "item"}}, subgroup = {__self = "userdata"}}';

describe('correct parsing of tables:', () => {
  it('recipe example', () => {
    expect(
      JSON.stringify(new TableParser().parseRawTable(RECIPE_EXAMPLE), null, 2)
    ).toMatchSnapshot();
  });

  it('entity example', () => {
    expect(
      JSON.stringify(new TableParser().parseRawTable(ENTITY_EXAMPLE), null, 2)
    ).toMatchSnapshot();
  });
});
