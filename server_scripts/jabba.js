import { lookupService } from "dns";

ServerEvents.tags("block", (event) => {
  let materials = [
    "_",
    "_copper_",
    "_iron_",
    "_gold_",
    "_diamond_",
    "_netherite_",
  ];
  let start = "sophisticatedstorage:limited";
  let tiers = ["barrel_1", "barrel_2", "barrel_3", "barrel_4"];
  let ss = [];

  materials.forEach((material) => {
    tiers.forEach((tier) => {
      ss.push(start + material + tier);
    });
  });
  event.add("sophisticatedstorage_barrels", ss);

  let md = "functionalstorage:";
  let rank = [1, 2, 4];
  let type = [
    "framed_",
    "cherry_",
    "mangrove_",
    "warped_",
    "crimson_",
    "dark_oak_",
    "acacia_",
    "jungle_",
    "birch_",
    "oak_",
    "spruce_",
    "fluid_",
  ];
  let fs = [];

  type.forEach((tp) => {
    rank.forEach((rk) => {
      fs.push(md + tp + rk);
    });
  });

  event.add("functionalstorage:drawers", [
    fs,
    "functionalstorage:simple_compacting_drawer",
    "functionalstorage:compacting_drawer",
  ]);
});

BlockEvents.rightClicked((event) => {
  const { hand, player, block, item, server } = event;
  const { properties, entityData, id } = block;

  if (hand == "OFF_HAND") return;

  if (hand == "MAIN_HAND" && player.isCrouching()&& item.isEmpty()) {
    if (block.hasTag("functionalstorage:drawers")) {
      let fs_lk = properties.get("locked") == "false" ? true : false;
      block.set(id, {
        subfacing: properties.get("subfacing"),
        locked: fs_lk,
      });
    }
    // else
    // if (block.hasTag("storagedrawers:drawers")) {
    //   player.tell(entityData.Lock);
    //   if (entityData.Lock == 3) {
    //     block.mergeEntityData({ Lock: 0 });
    //   } else {
    //     block.mergeEntityData({ Lock: 3 });
    //   }
    // }
    else if (block.hasTag("sophisticatedstorage_barrels")) {
      if (entityData.locked == 1) {
        block.mergeEntityData({ locked: 0 });
      } else {
        block.mergeEntityData({ locked: 1 });
      }
    event.cancel()
    } else {
      server.runCommandSilent(
        "/title " +
          player.name.string +
          ' actionbar {"color":"red","text":"Unable to lock this inventory"}'
      );
      event.cancel();
    }
  }
});
