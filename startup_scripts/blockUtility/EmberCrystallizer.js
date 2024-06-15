StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:crystallizer")
    .property($BooleanProperty.create("active"))
    .property(BlockProperties.NORTH)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.WEST)
    .defaultCutout()
    .defaultState((state) => {
      state
        .set($BooleanProperty.create("active"), false)
        .set(BlockProperties.NORTH, false)
        .set(BlockProperties.SOUTH, false)
        .set(BlockProperties.EAST, false)
        .set(BlockProperties.WEST, false);
    })
    .placementState((state) => {
      state
        .set($BooleanProperty.create("active"), false)
        .set(BlockProperties.NORTH, false)
        .set(BlockProperties.SOUTH, false)
        .set(BlockProperties.EAST, false)
        .set(BlockProperties.WEST, false);
        state.block.entityData["embers:ember_capacity"] = 100000
        state.block.entityData["embers:ember"] = 0
    })
    .defaultCutout()
    .blockEntity((be) => {
      be.serverTick(1, 0, (tick) => {
        const { block, level } = tick;
        const { x, y, z } = block;
        let prop = block.properties;
        let direc = ["north", "south", "east", "west"];
        let flag = false;
        let amount = 0;
        let axies = {
          north: "z",
          south: "z",
          east: "x",
          west: "x",
        };
        block.entityData["embers:ember_capacity"] = 100000
        direc.forEach((dir) => {
          try {
            if (
              "Speed" in block.offset(dir).entityData &&
              Math.abs(block.offset(dir).entityData.Speed) > 0 &&
              block.offset(dir).properties.get("axis") == axies[dir]
            ) {
              amount += Math.abs(block.offset(dir).entityData.Speed);
              flag = true;
              prop[dir] = true;
            }
          } catch (e) {
            prop[dir] = false;
          }
        });
        prop.active = flag;
        block.set("kubejs:crystallizer", prop);

        if (block.properties.get("active").toLowerCase() === "true" && rnd50()) {
          block.entityData["embers:ember"] = amount
          level.runCommandSilent(
            "/particle embers:smoke " +
              rnd(50, 100) +
              " " +
              rnd(50, 100) +
              " " +
              rnd(50, 100) +
              " " +
              rnd(1, 3) +
              " " +
              x +
              " " +
              (y + 0.75) +
              " " +
              z +
              " 0 0 0 1 "+rnd(1, 4)
          );
        }
      });
    })
    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/embers/off",
      });
    }).blockstateJson = {
    multipart: [
      {
        when: { active: "false" },
        apply: { model: "kubejs:block/embers/off" },
      },
      {
        when: { active: "true" },
        apply: { model: "kubejs:block/embers/on" },
      },
      {
        when: { north: "true" },
        apply: { model: "kubejs:block/embers/parts/port" },
      },
      {
        when: { east: "true" },
        apply: { model: "kubejs:block/embers/parts/port", y: 90 },
      },
      {
        when: { west: "true" },
        apply: { model: "kubejs:block/embers/parts/port", y: -90 },
      },
      {
        when: { south: "true" },
        apply: { model: "kubejs:block/embers/parts/port", y: 180 },
      },
    ],
  };
});
