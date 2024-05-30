StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:consumer")
    .randomTick((tick) => {
      const { x, y, z } = tick.block;
      let lis = [1, 2, 3];
      let ore = ["coal", "copper", "iron", "gold"];
      let count = 0;
      let pos = [];
      ore.forEach((or) => {
        lis.forEach((it) => {
          if (tick.level.getBlock(x, y + it, z) == "minecraft:" + or + "_ore") {
            count++;
            pos.push([x, y + it, z]);
          }
        });
      });
      if (count > 0) {
        let coord = count == 1 ? pos[0] : pos[rnd(1, count) - 1];

        tick.server.runCommandSilent(
          "/particle minecraft:flash " +
            coord[0] +
            " " +
            coord[1] +
            " " +
            coord[2] +
            " 0 0 0 0.1 1 force"
        );
        let blockfilter = tick.level.getBlock(coord[0], coord[1], coord[2]);
        ore.unshift("stone");
        ore.forEach((element, index) => {
          if (blockfilter == "minecraft:" + element) {
            blockfilter.set(
              "minecraft:" + element == "stone" ? "air" : ore[index - 1]
            );
            return;
          }
        });
      }
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
