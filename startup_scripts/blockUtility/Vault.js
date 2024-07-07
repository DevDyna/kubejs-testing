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
    .property($BooleanProperty.create("processing"))
    .property($BooleanProperty.create("unlocked"))
    .defaultState((state) => {
      state
        .set($BooleanProperty.create("processing"), false)
        .set($BooleanProperty.create("unlocked"), true);
    })
    .rightClick((click) => {
      const { item, block, level, server } = click;
      if (item == "minecraft:emerald" && block.properties.get("unlocked")) {
        block.set(block.id, {
          processing: true,
          unlocked: true,
        });
      }
      if (block.properties.get("processing")) {
        block.set(block.id, {
          processing: true,
          unlocked: false,
        });
        let random = rnd(2, 10);
        for (let i = 0; i < random; i++) {
          console.log(i);
          server.scheduleInTicks((i + 1) * 10, () => {
            let { x, y, z } = block;
            let compost = level.createEntity("item");
            compost.x = x + 0.5;
            compost.y = y + 1.5;
            compost.z = z + 0.5;
            compost.item = loot_items[rnd(0, 5)];
            compost.item.count = rnd(1, 16);
            console.log(compost);
            compost.spawn();
          });
        }
        block.set(block.id, {
          processing: false,
          unlocked: false,
        });
      }
    })
    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/dynamo/off",
      });
    }).blockstateJson = {
    variants: {
      //"active=true": { "model": "kubejs:block/"+id_block+"/on" },
      //"active=false": { "model": "kubejs:block/"+id_block+"/off" }
      "processing=true": { model: "kubejs:block/dynamo/on" },
      "processing=false": { model: "kubejs:block/dynamo/off" },
    },
  };
});
