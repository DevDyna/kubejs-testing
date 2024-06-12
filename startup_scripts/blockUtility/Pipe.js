StartupEvents.registry("block", (event) => {

  const oppositeDirection = {
    north: Direction.SOUTH,
    south: Direction.NORTH,
    east: Direction.WEST,
    west: Direction.EAST,
    down: Direction.UP,
    up: Direction.DOWN,
  };
  
  const directionProperties = {
    north: BlockProperties.NORTH,
    south: BlockProperties.SOUTH,
    east: BlockProperties.EAST,
    west: BlockProperties.WEST,
    down: BlockProperties.DOWN,
    up: BlockProperties.UP,
  };

  event
    .create("kubejs:pipe")
    .property(BlockProperties.NORTH)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.WEST)
    .property(BlockProperties.UP)
    .property(BlockProperties.DOWN)
    .defaultCutout()
    .defaultState((state) => {
      // <dev.latvian.mods.kubejs.block.callbacks.BlockStateModifyCallbackJS> state
      state
        .set(BlockProperties.NORTH, false)
        .set(BlockProperties.SOUTH, false)
        .set(BlockProperties.EAST, false)
        .set(BlockProperties.WEST, false)
        .set(BlockProperties.UP, false)
        .set(BlockProperties.DOWN, false)
    })
    .placementState((state) => {
      // <dev.latvian.mods.kubejs.block.callbacks.BlockStateModifyPlacementCallbackJS> state
      try {
        Object.keys(Direction.ALL).forEach((direction) => {
          let offsetBlock = state.block.offset(direction);
          if (offsetBlock.id === "kubejs:pipe") {
            let offsetBlockProp = offsetBlock.properties;
            offsetBlockProp[oppositeDirection[direction]] = true;
            offsetBlock.set(offsetBlock.id, offsetBlockProp);
            state.set(directionProperties[direction], true);
          }
        });
      } catch (error) {
        console.error(error);
      }
    })
    .item((item) => {
      item.modelJson({ parent: "kubejs:block/pipe/basic/item_model" });
    }).blockstateJson = {
    multipart: [
      {
        apply: { model: "kubejs:block/pipe/basic/core" },
      },
      {
        when: { north: "true" },
        apply: { model: "kubejs:block/pipe/basic/pipe" },
      },
      {
        when: { east: "true" },
        apply: { model: "kubejs:block/pipe/basic/pipe", y: 90 },
      },
      {
        when: { west: "true" },
        apply: { model: "kubejs:block/pipe/basic/pipe", y: -90 },
      },
      {
        when: { south: "true" },
        apply: { model: "kubejs:block/pipe/basic/pipe", y: 180 },
      },
      {
        when: { up: "true" },
        apply: { model: "kubejs:block/pipe/basic/pipe", x: -90 },
      },
      {
        when: { down: "true" },
        apply: { model: "kubejs:block/pipe/basic/pipe", x: 90 },
      },
    ],
  };
});
