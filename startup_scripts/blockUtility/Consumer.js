let val = 3;
let lis = [];
let cont = 1;
while (lis.length != val) {
  lis.push(cont);
  cont++;
}
StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:consumer")
    .randomTick((tick) => {
      const { x, y, z } = tick.block;

      let ore = ["coal_ore", "copper_ore", "iron_ore", "gold_ore"];
      let count = 0;
      let pos = [];
      ore.forEach((or) => {
        lis.forEach((it) => {
          if (tick.level.getBlock(x, y + it, z) == "minecraft:" + or) {
            count++;
            pos.push([x, y + it, z]);
          }
        });
      });
      if (count > 0) {
        let coord = count == 1 ? pos[0] : pos[rnd(1, count) - 1];

        tick.level.spawnParticles(
          "minecraft:flash",
          true,
          coord[0],
          coord[1],
          coord[2],
          0,
          0,
          0,
          0.1,
          1
        );
        let blockfilter = tick.level.getBlock(coord[0], coord[1], coord[2]);
        ore.forEach((element, index) => {
          if (blockfilter == "minecraft:" + element) {
            blockfilter.set(
              "minecraft:" + ore[index - 1]
            );
            return;
          }
        });
      }
    })
    .blockEntity((be) => {
      be.clientTick(5, 0, (tick) => {
        const { x, y, z } = tick.block;
        lis.forEach((e) => {
          tick.level.spawnParticles(
            "minecraft:portal",
            true,
            x + 0.1 * rnd(1, 9),
            y + e + 0.1 * rnd(1, 5),
            z + 0.1 * rnd(1, 9),
            0,
            0,
            0,
            10,
            0.1
          );
        });
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
