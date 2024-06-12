  BlockEvents.broken((event) => {
    // <dev.latvian.mods.kubejs.block.BlockBrokenEventJS> event
    if (event.block.id === "kubejs:plant") {
      try {
        Object.keys(Direction.ALL).forEach((direction) => {
          let offsetBlock = event.block.offset(direction);
   
          if (offsetBlock.id === "kubejs:plant") {
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