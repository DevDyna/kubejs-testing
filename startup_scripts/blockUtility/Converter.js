StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:converter")
    .property($BooleanProperty.create("active"))
    .blockEntity((be) => {
      be.serverTick(1, 0, (state) => {
        const { x, y, z } = state.block;
        let minerals = ["stone", "coal_ore", "copper_ore", "iron_ore"];
        state.block.set(state.block.id, {
          active: state.persistentData.getBoolean("active"),
        });

        if (state.persistentData.getBoolean("active") && rnd(0, 10) == 10) {
          state.level.spawnParticles(
            "minecraft:portal",
            true,
            x + 0.1 * rnd(1, 9),
            y + 0.5 + 0.1 * rnd(1, 9),
            z + 0.1 * rnd(1, 9),
            0,
            0,
            0,
            10,
            0.1
          );
          if (state.persistentData.getBoolean("active") && rnd(0, 2) == 2) {
            minerals.forEach((e) => {
              if (state.level.getBlock(x, y + 1, z) == "minecraft:" + e) {
                state.persistentData.putInt(
                  "amount",
                  state.persistentData.getInt("amount") - 100
                );
                state.level.spawnParticles(
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
                state.level.getBlock(x, y + 1, z).set("minecraft:gold_ore");
              }
            });
          }
        }

        if (state.persistentData.getInt("amount") > 0) {
          state.persistentData.putBoolean("active", true);
        } else {
          state.persistentData.putBoolean("active", false);
        }
      });

      be.attachCapability(
        CapabilityBuilder.ENERGY.customBlockEntity()
          .canExtract(() => false)
          .canReceive(() => true)

          .receiveEnergy((energy, amount) => {
            if (amount > 1000) {
              energy.persistentData.putBoolean("active", true);
              return 1000;
            } else {
              if (energy.persistentData.getInt("amount") < 1000)
                energy.persistentData.putInt(
                  "amount",
                  amount + energy.persistentData.getInt("amount")
                );
              else {
                energy.persistentData.putInt("amount", 1000);
              }

              energy.persistentData.putBoolean(
                "active",
                amount > 0 ? true : false
              );
              return amount + energy.persistentData.getInt("amount");
            }
          })

          .getEnergyStored((energy) => {
            return energy.persistentData.getInt("amount");
          })
          .getMaxEnergyStored((energy) => {
            return 1000;
          })
      );
    })

    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/dynamo/off",
      });
    }).blockstateJson = {
    variants: {
      "active=true": { model: "kubejs:block/dynamo/on" },
      "active=false": { model: "kubejs:block/dynamo/off" },
    },
  };
});
