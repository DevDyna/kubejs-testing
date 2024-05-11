StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:pipe")
    .property(BlockProperties.NORTH)
    .property(BlockProperties.SOUTH)
    .property(BlockProperties.EAST)
    .property(BlockProperties.WEST)
    .property(BlockProperties.UP)
    .property(BlockProperties.DOWN)

    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/pipe/core",
      });
    }).blockstateJson = {
    multipart: [
      {
        "when": { "north": "none|side|up", "south": "none|side|up", "east": "none|side|up", "west": "none|side|up" },
        apply: { model: "kubejs:block/pipe/core" },
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
      "when": {"north": "true" , "up": "false"},
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
