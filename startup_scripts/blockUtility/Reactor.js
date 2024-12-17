StartupEvents.registry("block", (event) => {

  event
    .create("kubejs:reactor_controller", "cardinal")
    .property($BooleanProperty.create("active"))
    .placementState((state) => {
      state.set($BooleanProperty.create("active"), false);
    })
    // .blockEntity((entity) => {
    //   entity.serverTick(1, 0, (tick) => {});
    // })
    // .rightClick((click) => {
    // })
    .item((i) => {
      i.parentModel("minecraft:block/magenta_glazed_terracotta");
    }).blockstateJson = {
    variants: {
      "facing=east": {
        model: "minecraft:block/magenta_glazed_terracotta",
        y: 270,
      },
      "facing=north": {
        model: "minecraft:block/magenta_glazed_terracotta",
        y: 180,
      },
      "facing=south": {
        model: "minecraft:block/magenta_glazed_terracotta",
      },
      "facing=west": {
        model: "minecraft:block/magenta_glazed_terracotta",
        y: 90,
      },
    },
  };

  let IO = (type) => {
    event
      .create("kubejs:" + type)
      .blockEntity((entity) => {
        entity.inventory(9, 1);
        entity.rightClickOpensInventory();
      })
      .item((i) => {
        i.parentModel("minecraft:block/target");
      }).blockstateJson = {
      variants: {
        "": {
          model: "minecraft:block/target",
        },
      },
    };
  };

  IO("input");
  IO("output");
});
