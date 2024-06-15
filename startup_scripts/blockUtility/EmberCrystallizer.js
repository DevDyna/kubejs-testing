/**
 *
 * @param {string} id
 * @param {string} BlockModel /on | /off
 * @param {string} PortModel
 */
function crystallizer(id, BlockModel, PortModel) {
  StartupEvents.registry("block", (event) => {
    event
      .create(id)
      .property($BooleanProperty.create("active"))
      .property(BlockProperties.NORTH)
      .property(BlockProperties.SOUTH)
      .property(BlockProperties.EAST)
      .property(BlockProperties.WEST)
      .defaultCutout()
      .box(0, 0, 0, 16, 2, 16)
      .box(11, 11, 11, 16, 16, 16)
      .box(11, 11, 0, 16, 16, 5)
      .box(5, 11, 1, 11, 14, 4)
      .box(5, 11, 12, 11, 14, 15)
      .box(1, 11, 5, 4, 14, 11)
      .box(12, 11, 5, 15, 14, 11)
      .box(0, 11, 0, 5, 16, 5)
      .box(0, 11, 11, 5, 16, 16)
      .box(3, 2, 3, 13, 12, 13)
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
          direc.forEach((dir) => {
            try {
              if (
                "Speed" in block.offset(dir).entityData &&
                block.offset(dir).properties.get("axis") == axies[dir]
              ) {
                if (Math.abs(block.offset(dir).entityData.Speed) > 0) {
                  amount += Math.abs(block.offset(dir).entityData.Speed);
                  flag = true;
                }
                prop[dir] = true;
              }
            } catch (e) {
              prop[dir] = false;
            }
          });
          prop.active = flag;
          block.set(id, prop);
          if (
            block.properties.get("active").toLowerCase() === "true" &&
            rnd(0, Math.floor(256 / amount)) ==
              Math.floor(256 / amount)
          ) {
            if (block.offset("up").hasTag("embers:crystal_seeds") && rnd25()) {
              let result = block.offset("up").id.replace("_crystal_seed", "");

              if (result == "embers:iron") {
                result = "minecraft:iron_nugget";
              } else if (result == "embers:gold") {
                result = "minecraft:gold_nugget";
              } else {
                result = result + "_nugget";
              }

              block.popItemFromFace(result, "up");
            }

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
                " 0 0 0 1 " +
                rnd(
                  1 + 1 * Math.floor(amount / 256),
                  2 + 4 * Math.floor(amount / 256)
                )
            );
          }
        });
      })
      .item((item) => {
        item.modelJson({
          parent: BlockModel + "/off",
        });
      }).blockstateJson = {
      multipart: [
        {
          when: { active: "false" },
          apply: { model: BlockModel + "/off" },
        },
        {
          when: { active: "true" },
          apply: { model: BlockModel + "/on" },
        },
        {
          when: { north: "true" },
          apply: { model: PortModel },
        },
        {
          when: { east: "true" },
          apply: { model: PortModel, y: 90 },
        },
        {
          when: { west: "true" },
          apply: { model: PortModel, y: -90 },
        },
        {
          when: { south: "true" },
          apply: { model: PortModel, y: 180 },
        },
      ],
    };
  });
}

crystallizer(
  "kubejs:crystallizer",
  "kubejs:block/embers",
  "kubejs:block/embers/parts/port"
);
