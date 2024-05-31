const oppositeDirection = {
    north: Direction.SOUTH,
    south: Direction.NORTH,
    east: Direction.WEST,
    west: Direction.EAST,
    down: Direction.UP,
    up: Direction.DOWN,
  };
   
  BlockEvents.rightClicked((event) => {
    // <dev.latvian.mods.kubejs.block.BlockRightClickedEventJS> event
    if (
      event.block.id === "kubejs:pipe" &&
      event.item.id === "minecraft:redstone_block"
    ) {
      let blockProp = event.block.properties;
   
      try {
        blockProp.type = "1";
        event.block.set(event.block.id, blockProp);
        event.item.count = event.item.count - 1;
      } catch (error) {
        console.error(error);
      }
    }
  });
   
  BlockEvents.broken((event) => {
    // <dev.latvian.mods.kubejs.block.BlockBrokenEventJS> event
    if (event.block.id === "kubejs:pipe") {
      try {
        Object.keys(Direction.ALL).forEach((direction) => {
          let offsetBlock = event.block.offset(direction);
   
          if (offsetBlock.id === "kubejs:pipe") {
            let offsetBlockProp = offsetBlock.properties;
   
            offsetBlockProp[oppositeDirection[direction]] = false;
            offsetBlock.set(event.block.offset(direction).id, offsetBlockProp);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  });