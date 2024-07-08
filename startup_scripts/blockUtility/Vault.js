let loot_items = [
  "minecraft:gold_ingot",
  "minecraft:emerald",
  "minecraft:iron_ingot",
  "minecraft:coal",
  "minecraft:diamond",
  "minecraft:lapis",
];

StartupEvents.registry("block", (event) => {
  event
    .create("vault")
    .property($BooleanProperty.create("contain_items"))
    .defaultState((state) => {
      state
        .set($BooleanProperty.create("contain_items"), true)
    })
    .rightClick((click) => {
      const { item, block, level, server } = click;
      const { properties, x, y, z } = block;
      if (
        item == "minecraft:emerald" &&
        properties.get("contain_items") == "true"
      ) {
        let random = rnd(2, 10);

        for (let i = 0; i < random; i++) {
          server.scheduleInTicks((i + 1) * 10, () => {
            block.popItemFromFace(loot_items[rnd(0, 5)], "up");
            level.spawnParticles(
              "minecraft:sonic_boom",
              true,
              x + 0.5,
              y + 1.5,
              z + 0.5,
              0,
              0,
              0,
              1,
              0.1
            );
          });
        }
      } else {
        return;
      }
    })
    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/dynamo/off",
      });
    }).blockstateJson = {
      variants: {
        "contain_items=true": { model: "kubejs:block/dynamo/on" },
        "contain_items=false": { model: "kubejs:block/dynamo/off" },
      },
    };
});
