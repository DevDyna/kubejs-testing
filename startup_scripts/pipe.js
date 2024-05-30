const $IntegerProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.IntegerProperty"
);
 
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
 
StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:pipe")
    .property(BlockProperties.NORTH)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.WEST)
    .property(BlockProperties.UP)
    .property(BlockProperties.DOWN)
    .property($IntegerProperty.create("type", 0, 1))
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
        .set($IntegerProperty.create("type", 0, 1), 0);
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
      item.modelJson({ parent: "kubejs:block/pipe/item_model" });
    }).blockstateJson = {
    multipart: [
      {
        when: { type: "0" },
        apply: { model: "kubejs:block/pipe/core" },
      },
      {
        when: { type: "1" },
        apply: { model: "kubejs:block/pipe/core1" },
      },
      {
        when: { north: "true" },
        apply: { model: "kubejs:block/pipe/pipe" },
      },
      {
        when: { east: "true" },
        apply: { model: "kubejs:block/pipe/pipe", y: 90 },
      },
      {
        when: { west: "true" },
        apply: { model: "kubejs:block/pipe/pipe", y: -90 },
      },
      {
        when: { south: "true" },
        apply: { model: "kubejs:block/pipe/pipe", y: 180 },
      },
      {
        when: { up: "true" },
        apply: { model: "kubejs:block/pipe/pipe", x: -90 },
      },
      {
        when: { down: "true" },
        apply: { model: "kubejs:block/pipe/pipe", x: 90 },
      },
    ],
  };
});