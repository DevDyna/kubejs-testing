StartupEvents.registry("block", (event) => {
  event
    .create("pillar")
    .property(BlockProperties.DOUBLE_BLOCK_HALF)
    .placementState((a) => {
      const { x, y, z } = a.block;
      if(a.level.getBlock(x,y+1,z) == 'minecraft:air')
      a.level.getBlock(x,y+1,z).set('kubejs:pillar', { half: "lower" })
    })
    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/dynamo/off",
      });
    }).blockstateJson = {
    variants: {
      "half=lower": { "model": "kubejs:block/multi/top" },
      "half=upper": { "model": "kubejs:block/multi/bottom" },
    },
  };
});
