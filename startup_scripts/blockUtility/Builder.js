StartupEvents.registry("block", (event) => {
    event
      .create("kubejs:builder")
      .randomTick((tick) => {
        let { x, y, z } = tick.block;
        let xa = x,
          ya = y + 1,
          za = z;
        while (tick.level.getBlock(xa, ya, za) != "minecraft:air") {
          ya++;
        }
        tick.level.getBlock(xa, ya, za).set("minecraft:white_concrete_powder");
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
})