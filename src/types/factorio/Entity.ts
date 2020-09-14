import { Color, Vector } from './_common';

export interface Entity {
  type: string; // [R] Type of this prototype.
  name: string; // [R] Name of this prototype.
  localised_name: string; // [R]
  localised_description: string; // [R]
  max_health: number; // [R] Max health of this entity.
  infinite_resource: boolean; // [R] Is this resource infinite?
  minimum_resource_amount: number; // [R] Minimum amount of this resource.
  normal_resource_amount: number; // [R] The normal amount for this resource.
  infinite_depletion_resource_amount: number; // [R] Every time this infinite resource 'ticks' down it is reduced by this amount.
  resource_category: string; // [R] Category of this resource.
  mineable_properties: Record<string, any>; // [R] Whether this entity is minable and what can be obtained by mining it.
  // items_to_place_this: SimpleItemStack[] // [R]Items that when placed will produce this entity.
  // collision_box: BoundingBox // [R] The bounding box used for collision checking.
  // secondary_collision_box: BoundingBox // [R] The secondary bounding box used for collision checking, or nil if it doesn't have one.
  // map_generator_bounding_box: BoundingBox // [R] The bounding box used for map generator collision checking.
  // selection_box: BoundingBox // [R] The bounding box used for drawing selection.
  // drawing_box: BoundingBox // [R] The bounding box used for drawing the entity icon.
  // sticker_box: BoundingBox // [R] The bounding box used to attach sticker type entities.
  // collision_mask: CollisionMask // [R] The collision masks this entity uses
  // collision_mask_with_flags: CollisionMaskWithFlags // [R]
  order: string; // [R] Order string of this prototype.
  group: string; // [R] Group of this entity.
  subgroup: string; // [R] Subgroup of this entity.
  healing_per_tick: number; // [R] Amount this entity can heal per tick.
  emissions_per_second: number; // [R] Amount of pollution emissions per second this entity will create.
  corpses: Record<string, Entity>; //  →  Entity [R]Corpses used when this entity is destroyed.
  selectable_in_game: boolean; // [R] Is this entity selectable?
  selection_priority: number; // [R] The selection priority of this entity - a value between 0 and 255
  weight: number; // [R] The weight of this vehicle prototype or nil if not a vehicle prototype.
  // resistances: Resistances // [R]
  fast_replaceable_group: string; // [R] The group of mutually fast-replaceable entities.
  next_upgrade: Entity; // [R] The next upgrade for this entity or nil.
  // loot: Loot // [R] Loot that will be dropped when this entity is killed.
  repair_speed_modifier: number; // [R] Repair-speed modifier for this entity.
  turret_range: number; // [R] The range of this turret or nil if this isn't a turret related prototype.
  // autoplace_specification: AutoplaceSpecification // [R] Autoplace specification for this entity prototype.
  belt_speed: number; // [R] The speed of this transport belt or nil if this isn't a transport belt related prototype.
  // result_units: UnitSpawnDefinition[] //  UnitSpawnDefinition  [R]The result units and spawn points with weight and evolution factor for a biter spawner entity.
  // attack_result: Trigger // [R] The attack result of this entity if the entity has one, else nil.
  // final_attack_result: Trigger // [R] The final attack result for projectiles nil if not a projectile
  // attack_parameters: table // [R] The attack parameters for this entity or nil if the entity doesn't use attack parameters.
  // spawn_cooldown: table // [R] The spawning cooldown for this enemy spawner prototype or nil.
  mining_drill_radius: number; // [R] The mining radius of this mining drill prototype or nil if this isn't a mining drill prototype.
  mining_speed: number; // [R] The mining speed of this mining drill/character prototype or nil.
  logistic_mode: string; // [R] The logistic mode of this logistic container or nil if this isn't a logistic container prototype.
  // max_underground_distance: number8 // [R] The max underground distance for underground belts and underground pipes or nil if this isn't one of those prototypes.
  // flags: EntityEntityFlags // [R] The entity prototype flags for this entity.
  remains_when_mined: Entity[]; //    [R]The remains left behind when this entity is mined.
  additional_pastable_entities: Entity[]; //  Entity  [R]Entities this entity can be pasted onto in addition to the normal allowed ones.
  allow_copy_paste: boolean; // [R] When false copy-paste is not allowed for this entity.
  shooting_cursor_size: number; // [R] The cursor size used when shooting at this entity.
  // created_smoke: table // [R] The smoke trigger run when this entity is built or nil.
  // created_effect: Trigger // [R] The trigger run when this entity is created or nil.
  map_color: Color; // [R] The map color used when charting this entity if a friendly or enemy color isn't defined or nil.
  friendly_map_color: Color; // [R] The friendly map color used when charting this entity.
  enemy_map_color: Color; // [R] The enemy map color used when charting this entity.
  build_base_evolution_requirement: number; // [R] The evolution requirement to build this entity as a base when expanding enemy bases.
  // instruments: array of//  ProgrammableSpeakerInstrument  [R]The instruments for this programmable speaker or nil.
  max_polyphony: number; // [R] The maximum polyphony for this programmable speaker or nil.
  module_inventory_size: number; // [R] The module inventory size or nil if this entity doesn't support modules.
  ingredient_count: number; // [R] The max number of ingredients this crafting-machine prototype supports or nil if this isn't a crafting-machine prototype.
  crafting_speed: number; // [R] The crafting speed of this crafting-machine or nil.
  crafting_categories: Record<string, boolean>; //  →  boolean [R]The crafting categories this entity supports.
  resource_categories: Record<string, boolean>; //  →  boolean [R]The resource categories this mining drill supports or nil if not a mining dill.
  supply_area_distance: number; // [R] The supply area of this electric pole, beacon, or nil if this is neither.
  max_wire_distance: number; // [R] The maximum wire distance for this entity.
  max_circuit_wire_distance: number; // [R] The maximum circuit wire distance for this entity.
  energy_usage: number; // [R] The direct energy usage of this entity or nil if this entity doesn't have a direct energy usage.
  max_energy_usage: number; // [R] The theoretical maximum energy usage for this entity.
  effectivity: number; // [R] The effectivity of this car prototype, generator prototype or nil.
  consumption: number; // [R] The energy consumption of this car prototype or nil if not a car prototype.
  friction_force: number; // [R] The friction of this vehicle prototype or nil if not a vehicle prototype.
  braking_force: number; // [R] The braking force of this vehicle prototype or nil if not a vehicle prototype.
  tank_driving: boolean; // [R] If this car prototype uses tank controls to drive or nil if this is not a car prototype.
  rotation_speed: number; // [R] The rotation speed of this car prototype or nil if not a car prototype.
  turret_rotation_speed: number; // [R] The turret rotation speed of this car prototype or nil if not a car prototype.
  // guns: dictionary string//  →  LuaItemEntity [R]The guns this car prototype uses or nil if not a car prototype.
  speed: number; // [R] The default speed of this flying robot, rolling stock, unit or nil.
  speed_multiplier_when_out_of_energy: number; // [R] The speed multiplier when this flying robot is out of energy or nil.
  max_payload_size: number; // [R] The max payload size of this logistics or construction robot or nil.
  draw_cargo: boolean; // [R] Whether this logistics or construction robot renders its cargo when flying or nil.
  energy_per_move: number; // [R] The energy consumed per tile moved for this flying robot or nil.
  energy_per_tick: number; // [R] The energy consumed per tick for this flying robot or nil.
  max_energy: number; // [R] The max energy for this flying robot or nil.
  min_to_charge: number; // [R] The minimum energy for this flying robot before it tries to recharge or nil.
  max_to_charge: number; // [R] The maximum energy for this flying robot above which it won't try to recharge when stationing or nil.
  // burner_prototype: LuaBurnerEntity // [R] The burner energy source prototype this entity uses or nil.
  // electric_energy_source_prototype: LuaElectricEnergySourceEntity // [R] The electric energy source prototype this entity uses or nil.
  // heat_energy_source_prototype: LuaHeatEnergySourceEntity // [R] The heat energy source prototype this entity uses or nil.
  // fluid_energy_source_prototype: LuaFluidEnergySourceEntity // [R] The fluid energy source prototype this entity uses or nil.
  // void_energy_source_prototype: LuaVoidEnergySourceEntity // [R] The void energy source prototype this entity uses or nil.
  building_grid_bit_shift: number; // [R] The log2 of grid size of the building
  fluid_usage_per_tick: number; // [R] The fluid usage of this generator prototype or nil.
  maximum_temperature: number; // [R] The maximum fluid temperature of this generator prototype or nil.
  target_temperature: number; // [R] The target temperature of this boiler prototype or nil.
  // fluid: LuaFluidEntity // [R] The fluid this offshore pump produces or nil.
  fluid_capacity: number; // [R] The fluid capacity of this entity or 0 if this entity doesn't support fluids.
  pumping_speed: number; // [R] The pumping speed of this offshore pump, normal pump, or nil.
  stack: boolean; // [R] If this inserter is a stack-type.
  allow_custom_vectors: boolean; // [R] If this inserter allows custom pickup and drop vectors.
  allow_burner_leech: boolean; // [R] If this inserter allows burner leeching.
  inserter_extension_speed: number; // [R] The extension speed of this inserter or nil.
  inserter_rotation_speed: number; // [R] The rotation speed of this inserter or nil.
  inserter_pickup_position: Vector; // [R] The pickup position for this inserter or nil.
  inserter_drop_position: Vector; // [R] The drop position for this inserter or nil.
  inserter_chases_belt_items: boolean; // [R] True if this inserter chases items on belts for pickup or nil.
  count_as_rock_for_filtered_deconstruction: boolean; // [R] If this simple-entity is counted as a rock for the deconstruction planner "trees and rocks only" filter.
  filter_count: number; // [R] The filter count of this inserter, loader, or requester chest or nil.
  production: number; // [R] The max production this solar panel prototype produces or nil.
  time_to_live: number; // [R] The time to live for this prototype or 0 if prototype doesn't have time_to_live or time_before_removed.
  distribution_effectivity: number; // [R] The distribution effectivity for this beacon prototype or nil if not a beacon prototype.
  explosion_beam: number; // [R] Does this explosion have a beam or nil if not an explosion prototype.
  explosion_rotate: number; // [R] Does this explosion rotate or nil if not an explosion prototype.
  tree_color_count: number; // [R] If it is a tree, return the number of colors it supports.
  alert_when_damaged: boolean; // [R] Does this entity with health prototype alert when damaged?
  alert_when_attacking: boolean; // [R] Does this turret prototype alert when attacking?
  color: Color; // [R] The color of the prototype, or nil if the prototype doesn't have color.
  collision_mask_collides_with_self: boolean; // [R] Does this prototype collision mask collide with itself?
  collision_mask_collides_with_tiles_only: boolean; // [R] Does this prototype collision mask collide with tiles only?
  collision_mask_considers_tile_transitions: boolean; // [R] Does this prototype collision mask consider tile transitions?
  allowed_effects: Record<string, boolean>; //  →  boolean [R]The allowed module effects for this entity or nil.
  rocket_parts_required: number; // [R] The rocket parts required for this rocket silo prototype or nil.
  fixed_recipe: string; // [R] The fixed recipe name for this assembling machine prototype or nil.
  construction_radius: number; // [R] The construction radius for this roboport prototype or nil.
  logistic_radius: number; // [R] The logistic radius for this roboport prototype or nil.
  energy_per_hit_point: number; // [R] The energy used per hitpoint taken for this vehicle during collisions or nil.
  create_ghost_on_death: boolean; // [R] If this prototype will attempt to create a ghost of itself on death.
  timeout: number; // [R] The time it takes this land mine to arm.
  // fluidbox_prototypes: array of//  LuaFluidBoxEntity  [R]The fluidbox prototypes for this entity.
  neighbour_bonus: number; // [R]
  neighbour_collision_increase: number; // [R] Controls how much a reactor extends when connected to other reactors.
  container_distance: number; // [R]
  belt_distance: number; // [R]
  belt_length: number; // [R]
  is_building: boolean; // [R]
  automated_ammo_count: number; // [R] The amount of ammo that inserters automatically insert into this ammo-turret or artillery-turret or nil.
  max_speed: number; // [R] The max speed of this projectile prototype or flying robot prototype or nil.
  darkness_for_all_lamps_on: number; // [R] Value between 0 and 1 darkness where all lamps of this lamp prototype are on or nil.
  darkness_for_all_lamps_off: number; // [R] Value between 0 and 1 darkness where all lamps of this lamp prototype are off or nil.
  always_on: boolean; // [R] Whether the lamp is always on (except when out of power or turned off by the circuit network) or nil.
  min_darkness_to_spawn: number; // [R] The minimum darkness at which this unit spawner can spawn entities.
  max_darkness_to_spawn: number; // [R] The maximum darkness at which this unit spawner can spawn entities.
  call_for_help_radius: number; // [R]
  max_count_of_owned_units: number; // [R] Count of enemies this spawner can sustain.
  max_friends_around_to_spawn: number; // [R] How many friendly units are required within the spawning_radius of this spawner for it to stop producing more units.
  spawning_radius: number; // [R] How far from the spawner can the units be spawned.
  spawning_spacing: number; // [R] What spaces should be between the spawned units.
  radius: number; // [R] The radius of this entity prototype.
  cliff_explosive_prototype: string; // [R] The item prototype name used to destroy this cliff or nil.
  rocket_entity_prototype: Entity; // [R] The rocket entity prototype associated with this rocket silo prototype or nil.
  has_belt_immunity: boolean; // [R] Whether this unit, car, or character prototype has belt immunity, nil if not car, unit, or character prototype.
  vision_distance: number; // [R] The vision distance of this unit prototype or nil.
  pollution_to_join_attack: number; // [R] The amount of pollution that has to be absorbed by the unit's spawner before the unit will leave the spawner and attack the source of the pollution.
  min_pursue_time: number; // [R] The minimum pursue time of this unit prototype or nil.
  max_pursue_distance: number; // [R] The maximum pursue distance of this unit prototype or nil.
  radar_range: number; // [R] The radar range of this unit prototype or nil.
  move_while_shooting: boolean; // [R] Whether this unit prototype can move while shooting or nil.
  can_open_gates: boolean; // [R] Whether this unit prototype can open gates or nil.
  affected_by_tiles: boolean; // [R] Whether this unit prototype is affected by tile walking speed modifiers or nil.
  distraction_cooldown: number; // [R] The distraction cooldown of this unit prototype or nil.
  spawning_time_modifier: number; // [R] The spawning time modifier of this unit prototype or nil.
  alert_icon_shift: Vector; // [R] The alert icon shift of this entity prototype.
  lab_inputs: string[]; //  string  [R]The item prototype names that are the inputs of this lab prototype or nil.
  researching_speed: number; // [R] The base researching speed of this lab prototype or nil.
  item_slot_count: number; // [R] The item slot count of this constant combinator prototype or nil.
  base_productivity: number; // [R] The base productivity of this crafting machine, lab, or mining drill, or nil.
  allow_access_to_all_forces: boolean; // [R] If this market allows access to all forces or just friendly ones.
  supports_direction: boolean; // [R] If this entity prototype could possibly ever be rotated.
  terrain_friction_modifier: number; // [R] The terrain friction modifier for this vehicle.
  max_distance_of_sector_revealed: number; // [R] The radius of the area this radar can chart, in chunks.
  max_distance_of_nearby_sector_revealed: number; // [R] The radius of the area constantly revealed by this radar, in chunks.
  // adjacent_tile_collision_box: BoundingBox // [R] The bounding box that specifies which tiles adjacent to the offshore pump should be checked.
  // adjacent_tile_collision_mask: CollisionMask // [R] Tiles adjacent to the offshore pump must not collide with this collision mask.
  // adjacent_tile_collision_test: CollisionMask // [R] If this mask is not empty, tiles adjacent to the offshore pump must not collide with this collision mask.
  // center_collision_mask: CollisionMask // [R] The collision mask used only for collision test with tile directly at offshore pump position.
  // grid_prototype: LuaEquipmentGridEntity // [R] The equipment grid prototype for this entity or nil.
  remove_decoratives: string; // [R]
  running_speed: number; // [R]
  maximum_corner_sliding_distance: number; // [R]
  build_distance: number; // [R]
  drop_item_distance: number; // [R]
  reach_distance: number; // [R]
  reach_resource_distance: number; // [R]
  item_pickup_distance: number; // [R]
  loot_pickup_distance: number; // [R]
  enter_vehicle_distance: number; // [R]
  ticks_to_keep_gun: number; // [R]
  ticks_to_keep_aiming_direction: number; // [R]
  ticks_to_stay_in_combat: number; // [R]
  respawn_time: number; // [R]
  damage_hit_tint: Color; // [R]
  character_corpse: Entity; // [R]
  valid: boolean; // [R] Is this object valid?
}
