StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:linker")
    .rightClick((tick) => {
      const { x, y, z } = tick.block;
      const max = 5
      let list = [];
      for (let i = x - max; i < x + max; i++) {
        for (let j = y - max; j < y + max; j++) {
          for (let l = z - max; l < z + max; l++) {
            if (tick.level.getBlock(i, j, l) == "kubejs:consumer") {
              list.push([i, j, l]);
            }
          }
        }
      }

      list.forEach((element) => {
          tick.server.runCommandSilent(
            "/particle minecraft:angry_villager " +
              element[0] +
              " " +
              (element[1]+1.25) +
              " " +
              element[2] +
              " 0 0 0 0.1 2 force"
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
