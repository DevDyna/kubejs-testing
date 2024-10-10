StartupEvents.registry("block", (event) => {
  
  const ticking = (tick) => {
    const down = tick.block.offset(Facing.down);
    if (down == "minecraft:dirt") {
      down.set("minecraft:rooted_dirt");
    }
    if (down == "minecraft:rooted_dirt") {
      let place = down.offset(dir[rnd(0, dir.length - 1)]);
      if (place == "minecraft:dirt") {
        place.set("minecraft:rooted_dirt");
      }
    }
  }
  
  event
    .create("azalea", "crop")
    .age(4, (builder) => {
      builder
        //i  x  y  z   x  y   z
        .shape(0, 5, 0, 5, 11, 6, 11)
        .shape(1, 5, 0, 5, 11, 7, 11)
        .shape(2, 5, 0, 5, 11, 8, 11)
        .shape(3, 5, 0, 5, 11, 9, 11)
        .shape(4, 5, 0, 5, 11, 10, 11);
    })
    .survive((state, level, pos) => {
      return level.getBlockState(pos.below()).block.id != "minecraft:air";
    })
    .randomTickCallback = ticking;
  //   .growTick(() => 1)
  //   .dropSeed(false)
  //   .crop("kubejs:azalea", 1)
  //   .item((seedItem) => {
  //     seedItem.texture("minecraft:item/apple");
  //   }).blockstateJson = {
  //   variants: {
  //     "age=0": { model: "kubejs:block/crop/0" },
  //     "age=1": { model: "kubejs:block/crop/1" },
  //     "age=2": { model: "kubejs:block/crop/2" },
  //     "age=3": { model: "kubejs:block/crop/3" },
  //     "age=4": { model: "kubejs:block/crop/4" },
  //   },
  // };

  



  // event.create("minecraft:dirt").randomTick((tick) => {
  //   if (tick.block.offset(Facing.up) == "kubejs:azalea") {
  //     tick.block.set("minecraft:rooted_dirt");
  //   }
  // });

  // const dir = [
  //   Facing.NORTH,
  //   Facing.SOUTH,
  //   Facing.EAST,
  //   Facing.WEST,
  //   Facing.DOWN,
  // ];

  // event.create("minecraft:rooted_dirt").randomTick((tick) => {
  //   if (tick.block.offset(Facing.up) == "kubejs:azalea") {
  //     let place = tick.block.offset(dir[rnd(0, dir.length - 1)]);
  //     if (place == "minecraft:dirt") {
  //       place.set("minecraft:rooted_dirt");
  //     }
  //   }
  // });

  // event
  //   .create("kubejs:azalea_plant")
  //   .randomTick((tick) => {
  //     const down = tick.block.offset(Facing.down);
  //     if (down == "minecraft:dirt") {
  //       down.set("minecraft:rooted_dirt");
  //     }
  //     if (down == "minecraft:rooted_dirt") {
  //       let place = down.offset(dir[rnd(0, dir.length - 1)]);
  //       if (place == "minecraft:dirt") {
  //         place.set("minecraft:rooted_dirt");
  //       }
  //     }
  //   })
  //   .tick
  //   .box(4, 5, 5, 11, 10, 11)
  //   .noItem()
  //   .blockstateJson = {
  //   variants: {
  //     "": { model: "kubejs:block/crop/0" },
  //   },
  // };
});
