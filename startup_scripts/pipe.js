StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:pipe")
    .property($BooleanProperty.create("north"))
    .property($BooleanProperty.create("south"))
    .property($BooleanProperty.create("east"))
    .property($BooleanProperty.create("west"))
    .property($BooleanProperty.create("up"))
    .property($BooleanProperty.create("down"))
    .defaultCutout()
    .blockEntity((be) => {
      be.serverTick(1, 0, (tick) => {
        const { x, y, z } = tick.block;
        let position = [
          [x + 0, y + 0, z - 1],
          [x + 0, y + 0, z + 1],
          [x - 1, y + 0, z + 0],
          [x + 1, y + 0, z + 0],
          [x + 0, y + 1, z + 0],
          [x + 0, y - 1, z + 0],
        ];

        let cardinal = ["north", "south", "east", "west", "up", "down"];

        let prop = {
          north: false,
          south: false,
          east: false,
          west: false,
          up: false,
          down: false,
        };
        let value;
        //tick.player.tell(prop)

        position.forEach((element, index) => {
          //tick.player.tell(tick.level.getBlock(element[0],element[1],element[2]))
          value =
            tick.level.getBlock(element[0], element[1], element[2]) ==
            "kubejs:pipe";

          switch (cardinal[index]) {
            case "north":
              if (value) prop.north = true;
              break;
            case "south":
              if (value) prop.south = true;
              break;
            case "east":
              if (value) prop.east = true;
              break;
            case "west":
              if (value) prop.west = true;
              break;
            case "up":
              if (value) prop.up = true;
              break;
            case "down":
              if (value) prop.down = true;
              break;
          }
        });

        tick.block.set(tick.block.id, prop);
      });
    })

    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/pipe/item_model",
      });
    }).blockstateJson = {
    multipart: [
      {
        when: {
          north: "false|true",
          south: "false|true",
          east: "false|true",
          west: "false|true",
          up: "false|true",
          down: "false|true",
        },
        apply: { model: "kubejs:block/pipe/core" },
      },
      {
        when: { north: "true" },
        apply: { model: "kubejs:block/pipe/pipe" },
      },
      {
        when: { east: "true" },
        apply: { model: "kubejs:block/pipe/pipe", y: -90 },
      },
      {
        when: { west: "true" },
        apply: { model: "kubejs:block/pipe/pipe", y: 90 },
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
