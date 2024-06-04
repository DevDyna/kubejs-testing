/**
 *
 * @param {string} BlockName block id name
 * @param {number[][]} OffsetScheme list of offset xyz value based on block master
 * @param {item[][]} BlockIdScheme list of blockid on offset xyz value based on block master
 * @param {item[]} itemLoot loot table of items
 * @param {number} itemSuccess (number of success) / itemSuccess
 * @param {number} rfTick rf used when active
 * @param {number} rfMaxCap max rf capacity
 */
function miner(
  BlockName,
  OffsetScheme,
  BlockIdScheme,
  itemLoot,
  itemSuccess,
  rfTick,
  rfMaxCap
) {
  StartupEvents.registry("block", (event) => {
    event
      .create(BlockName)
      .property($BooleanProperty.create("active"))
      .property($BooleanProperty.create("assembled"))
      .blockEntity((be) => {
        be.serverTick(1, 0, (state) => {
          const { x, y, z } = state.block;

          let a, b, c;

          state.block.set(state.block.id, {
            active: state.persistentData.getBoolean("active"),
            assembled: state.persistentData.getBoolean("assembled"),
          });

          let result = BlockIdScheme.length;

          if (state.persistentData.getBoolean("active")) {
            state.persistentData.putInt(
              "amount",
              state.persistentData.getInt("amount") - rfTick
            );

            //--------------------------------------------------//

            for ([a, b, c] of OffsetScheme) {
              if (
                state.block.offset(a, b, c).id ===
                BlockIdScheme[
                  OffsetScheme.findIndex(
                    (arr) => JSON.stringify(arr) === JSON.stringify([a, b, c])
                  )
                ]
              ) {
                result--;
              } else {
                result++;
                if (rnd(0, 20) == 20)
                  state.level.spawnParticles(
                    "minecraft:angry_villager",
                    true,
                    x + a + 0.5,
                    y + b + 0.5,
                    z + c + 0.5,
                    0,
                    0,
                    0,
                    1,
                    0.1
                  );
              }
            }

            //--------------------------------------------------//
          }

          state.persistentData.putBoolean("assembled", result == 0);
          state.persistentData.putBoolean(
            "active",
            state.persistentData.getInt("amount") > 0
          );

          let upface = state.level.getBlock(x, y + 1, z);
          if (state.persistentData.getBoolean("assembled")) {
            if (rnd(0, itemSuccess) == itemSuccess) {
              if (upface.inventory != null) {
                upface.inventory.insertItem(
                  itemLoot[rnd(0, itemLoot.length)],
                  false
                );
              } else {
                state.level.spawnParticles(
                  "minecraft:smoke",
                  true,
                  x + 0.5,
                  y + 1.5,
                  z + 0.5,
                  0,
                  0,
                  0,
                  5,
                  0.1
                );

                state.block.popItemFromFace(
                  itemLoot[rnd(0, itemLoot.length)],
                  Direction.UP
                );
              }
            }
          }
        });

        be.attachCapability(
          CapabilityBuilder.ENERGY.customBlockEntity()
            .canExtract(() => false)
            .canReceive(() => true)

            .receiveEnergy((energy, amount) => {
              if (amount > rfMaxCap) {
                energy.persistentData.putBoolean("active", true);
                return rfMaxCap;
              } else {
                if (energy.persistentData.getInt("amount") < rfMaxCap)
                  energy.persistentData.putInt(
                    "amount",
                    amount + energy.persistentData.getInt("amount")
                  );
                else {
                  energy.persistentData.putInt("amount", rfMaxCap);
                }

                energy.persistentData.putBoolean(
                  "active",
                  amount > 0 ? true : false
                );
                return amount + energy.persistentData.getInt("amount");
              }
            })

            .getEnergyStored((energy) => {
              return energy.persistentData.getInt("amount") > rfMaxCap
                ? 1000
                : energy.persistentData.getInt("amount");
            })
            .getMaxEnergyStored((energy) => {
              return rfMaxCap;
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
}
miner(
  "miner",
  [
    [2, -1, 0],
    [-2, -1, 0],
    [0, -1, 2],
    [0, -1, -2],
  ],
  ["minecraft:stone", "minecraft:stone", "minecraft:stone", "minecraft:stone"],
  ["minecraft:raw_iron", "minecraft:raw_gold", "minecraft:raw_copper"],
  10,
  1,
  1000
);
