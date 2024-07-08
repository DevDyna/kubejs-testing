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

  function multiStage(input) {
    return [
      {
        when: { stage: input },
        apply: { model: "kubejs:block/pipe/plant/" + input + "/core" },
      },
      {
        when: { stage: input, north: "true" },
        apply: { model: "kubejs:block/pipe/plant/" + input + "/pipe" },
      },
      {
        when: { stage: input, east: "true" },
        apply: { model: "kubejs:block/pipe/plant/" + input + "/pipe", y: 90 },
      },
      {
        when: { stage: input, west: "true" },
        apply: { model: "kubejs:block/pipe/plant/" + input + "/pipe", y: -90 },
      },
      {
        when: { stage: input, south: "true" },
        apply: { model: "kubejs:block/pipe/plant/" + input + "/pipe", y: 180 },
      },
      {
        when: { stage: input, up: "true" },
        apply: { model: "kubejs:block/pipe/plant/" + input + "/pipe", x: -90 },
      },
      {
        when: { stage: input, down: "true" },
        apply: { model: "kubejs:block/pipe/plant/" + input + "/pipe", x: 90 },
      },
    ];
  }

  event
    .create("kubejs:plant")
    .property(BlockProperties.NORTH)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.WEST)
    .property(BlockProperties.UP)
    .property(BlockProperties.DOWN)
    .property($IntegerProperty.create("stage", 0, 2))
    .property($BooleanProperty.create("is_master"))
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
        .set($IntegerProperty.create("stage", 0, 2), 0)
        .set($BooleanProperty.create("is_master"), false);
    })
    .placementState((state) => {
      // <dev.latvian.mods.kubejs.block.callbacks.BlockStateModifyPlacementCallbackJS> state
      try {
        Object.keys(Direction.ALL).forEach((direction) => {
          let offsetBlock = state.block.offset(direction);
          if (offsetBlock.id === "kubejs:plant") {
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
    .randomTick((tick) => {
      const { block } = tick;
      const prop = block.properties;
      if (rnd75() && prop.get("is_master").toLowerCase() === "true") {
        let undir = ["down", "south", "north", "west", "east"];
        let dire = ["up", "north", "south", "east", "west"];
        dire.forEach((dir, index) => {
          if (rnd25() && block.offset(dir) == "minecraft:air") {
            let next = {}; //DONT CONVERT AS PROP !!! I HAVE HATED IT FOR HOURS !!!
            next.is_master = rnd75();
            next.stage = prop.get("stage");
            //next.stage = prop.get("stage");
            next[undir[index]] = true;
            block.offset(dir).set("kubejs:plant", next);
            let base = prop;
            base[dir] = true;
            base.is_master = false;

            let destage = prop.get("stage").toLowerCase();
            if (rnd25()) {
              switch (destage) {
                case "0":
                  if (rnd25()) {
                    destage = "1";
                  }
                  break;
                case "1":
                  if (rnd25()) {
                    destage = "2";
                  }
                  break;
                default:
                  break;
              }
            }
            base.stage = destage;
            block.set("kubejs:plant", base);
          }
        });
      }
    })
    .item((item) => {
      item.modelJson({ parent: "kubejs:block/pipe/plant/any/item_model" });
    }).blockstateJson = {
    multipart: [
      {
        when: { is_master: true },
        apply: { model: "kubejs:block/pipe/plant/any/active" },
      },
    ]
      .concat(multiStage(0))
      .concat(multiStage(1))
      .concat(multiStage(2)),
  };
});
