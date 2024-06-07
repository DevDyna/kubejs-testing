StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:crucible")
    .property($BooleanProperty.create("has_water"))
    .defaultState((state) => {
      state.set($BooleanProperty.create("has_water"), false);
    })
    .rightClick((click) => {
      const { x, y, z } = click.block;
      if (click.item.id == "minecraft:water_bucket") {
        click.player.inventory.extractItem(
          click.player.inventory.find("minecraft:water_bucket"),
          1,
          false
        );
        click.player.give("minecraft:bucket");
        click.level
          .getBlock(x, y, z)
          .set("kubejs:crucible", { has_water: true });
      }
      if (click.item.id == "minecraft:bucket") {
        click.player.inventory.extractItem(
          click.player.inventory.find("minecraft:bucket"),
          1,
          false
        );
        click.player.give("minecraft:water_bucket");
        click.level
          .getBlock(x, y, z)
          .set("kubejs:crucible", { has_water: false });
      }
    })
    .blockEntity((be) => {
      be.serverTick(20, 0, (tick) => {
        const { x, y, z } = tick.block;
        if (
          tick.level.getBlock(x, y - 1, z).hasTag("minecraft:campfires") &&
          tick.level.getBlock(x, y, z).properties.get("has_water")
        ) {
          tick.level
            .getEntitiesWithin(
              AABB.of(x - 1, y - 1.5, z - 1, x + 1, y + 1.5, z + 1)
            )
            .forEach((entity) => {
              if (entity.type != "minecraft:item") return;

              if (entity.item == "minecraft:iron_ingot") {
                entity.setRemoved("unloaded_to_chunk");

                let rool = entity.item.count > 1 ? entity.item.count : 1;
                for (let i = 0; i < rool; i++) {
                  tick.block.popItemFromFace(
                    "minecraft:gold_ingot",
                    Direction.UP
                  );
                }
              }
            });
          tick.level.spawnParticles(
            "minecraft:smoke",
            true,
            x + 0.1 * rnd(1, 9),
            y + 0.1 * rnd(1, 5),
            z + 0.1 * rnd(1, 9),
            0,
            0.4,
            0,
            10,
            0.1
          );
        }
      });
    })
    .box(0, 3, 0, 2, 16, 16)
    .box(2, 3, 2, 14, 4, 14)
    .box(14, 3, 0, 16, 16, 16)
    .box(2, 3, 0, 14, 16, 2)
    .box(2, 3, 14, 14, 16, 16)
    .box(0, 0, 0, 4, 3, 2)
    .box(0, 0, 2, 2, 3, 4)
    .box(12, 0, 0, 16, 3, 2)
    .box(14, 0, 2, 16, 3, 4)
    .box(0, 0, 14, 4, 3, 16)
    .box(0, 0, 12, 2, 3, 14)
    .box(12, 0, 14, 16, 3, 16)
    .box(14, 0, 12, 16, 3, 14)
    .item((item) => {
      item.modelJson({
        parent: "minecraft:item/cauldron",
      });
    }).blockstateJson = {
    variants: {
      "has_water=false": { model: "minecraft:block/cauldron" },
      "has_water=true": {
        model: "minecraft:block/powder_snow_cauldron_level1",
      },
    },
  };
});
