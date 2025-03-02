ServerEvents.recipes((event) => {
  event.recipes.kubejs
    .shapeless(
      Item.of(
        "minecraft:allay_spawn_egg",
        '{display:{Lore:[\'{"text":"Any Spawn Egg","italic":false}\']}}'
      ),
      ["mob_grinding_utils:gm_chicken_feed"]
    )
    .modifyResult(
      (grid, item) =>
        grid
          .find("mob_grinding_utils:gm_chicken_feed")
          .nbt.getString("mguMobName") + "_spawn_egg"
    );
});
