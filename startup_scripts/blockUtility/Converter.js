StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:consumer")
    .randomTick((tick) => {
      const { x, y, z } = tick.block;
      let ore = ["stone", "coal_ore", "copper_ore", "iron_ore"];
      let result = ["coal_ore", "copper_ore", "iron_ore", "gold_ore"];
      ore.forEach((e, index) => {
        if (tick.level.getBlock(x, y + 1, z) == "minecraft:" + e) {
          tick.level.getBlock(x, y + 1, z).set("minecraft:" + result[index]);
          tick.level.spawnParticles(
            "minecraft:flash",
            true,
            x,
            y + 0.5,
            z,
            0,
            0,
            0,
            1,
            0.1
          );
        }
      });
    })
    .blockEntity((be) => {
      be.clientTick(5, 0, (tick) => {
        const { x, y, z } = tick.block;
        tick.level.spawnParticles(
          "minecraft:portal",
          true,
          x + 0.1 * rnd(1, 9),
          y + 1.25 + 0.1 * rnd(1, 9),
          z + 0.1 * rnd(1, 9),
          0,
          0,
          0,
          10,
          0.1
        );
      });
    })

    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/dynamo/off",
      });
    }).blockstateJson = {
    variants: {
      "": { model: "kubejs:block/dynamo/off" },
    },
  };
});
