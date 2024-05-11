StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:pipe")
    .property($BooleanProperty.create("north"))
    .property($BooleanProperty.create("south"))
    .property($BooleanProperty.create("east"))
    .property($BooleanProperty.create("west"))
    .property($BooleanProperty.create("up"))
    .property($BooleanProperty.create("down"))

    .blockEntity((be) => {
      be.serverTick(10, 0, (tick) => {
        const {x,y,z} = tick.block
        let position = [
          [1,0,0],
          [-1,0,0],
          [0,0,1],
          [0,0,-1],
          [0,1,0],
          [0,-1,0],
        ]

        let cardinal =[
          "north",
          "south",
          "east",
          "west",
          "up",
          "down"
          ]

          let invers =[
            "south",
            "north",
            "west",
            "east",
            "down",
            "up"
            ]

        position.forEach(element,index => {
          if(tick.block.offset(element[0],element[1],element[2]).id == 'kubejs:pipe'){
            tick.block.properties.get(cardinal[index]) = true
            tick.block.offset(element[0],element[1],element[2]).properties.get(invers[index]) = true
          }else{
            tick.block.properties.get(cardinal[index]) = false
          }
          
        });



      });
    })

    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/pipe/core",
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

  /*
   {
  "multipart": [
    {
      "when": { "OR": [
		{"up": "false"},
		{"down": "false"}
      ]},
	  "apply": { "model": "minecraft:block/chorus/plant/center" }
    },
	
	{
      "when": {"north": "true" },
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90, "y": 180 }
	  ]
    },
    {
      "when": { "east": "true" , "up": "false"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90, "y": 270 }
	  ]
    },
    {
      "when": { "south": "true" , "up": "false"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90 }
	  ]
    },
    {
      "when": { "west": "true" , "up": "false"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90, "y": 90 }
	  ]
    },
	
	
	
	{
      "when": {"north": "true" , "down": "false"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90, "y": 180 }
	  ]
    },
    {
      "when": { "east": "true" , "down": "false"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90, "y": 270 }
	  ]
    },
    {
      "when": { "south": "true" , "down": "false"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90 }
	  ]
    },
    {
      "when": { "west": "true" , "down": "false"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 90, "y": 90 }
	  ]
    },
	{
      "when": {"north": "true" , "down": "true", "up": "true"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/small_stem", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/small_stem_2", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/small_stem_3", "x": 90, "y": 180 },
		{ "model": "minecraft:block/chorus/plant/small_stem_4", "x": 90, "y": 180 }
	  ]
    },
    {
      "when": { "east": "true" , "down": "true", "up": "true"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/small_stem", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/small_stem_2", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/small_stem_3", "x": 90, "y": 270 },
		{ "model": "minecraft:block/chorus/plant/small_stem_4", "x": 90, "y": 270 }
	  ]
    },
    {
      "when": { "south": "true" , "down": "true", "up": "true"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/small_stem", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/small_stem_2", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/small_stem_3", "x": 90 },
		{ "model": "minecraft:block/chorus/plant/small_stem_4", "x": 90 }
	  ]
    },
    {
      "when": { "west": "true" , "down": "true", "up": "true"},
      "apply": [
		{ "model": "minecraft:block/chorus/plant/small_stem", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/small_stem_2", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/small_stem_3", "x": 90, "y": 90 },
		{ "model": "minecraft:block/chorus/plant/small_stem_4", "x": 90, "y": 90 }
	  ]
    },
	
	
    {
      "when": { "up": "true" },
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem", "x": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_2", "x": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_3", "x": 180 },
		{ "model": "minecraft:block/chorus/plant/double_stem_4", "x": 180 }
	  ]
    },
    {
      "when": { "down": "true" },
      "apply": [
		{ "model": "minecraft:block/chorus/plant/double_stem" },
		{ "model": "minecraft:block/chorus/plant/double_stem_2" },
		{ "model": "minecraft:block/chorus/plant/double_stem_3" },
		{ "model": "minecraft:block/chorus/plant/double_stem_4" }
	]
    }
  ]
}
   */
});
