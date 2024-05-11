BlockEvents.broken("kubejs:pillar", (event) => {
  const { x, y, z } = event.block;

  if (
    event.block.properties.half == "upper" &&
    event.level.getBlock(x, y + 1, z) == "kubejs:pillar" &&
    event.level.getBlock(x, y + 1, z).properties.half == "lower"
  )
    {
      event.level.getBlock(x, y + 1, z).set("air");
    }

  if (
    event.block.properties.half == "lower" &&
    event.level.getBlock(x, y - 1, z) == "kubejs:pillar" &&
    event.level.getBlock(x, y - 1, z).properties.half == "upper"
  )
    {event.level.getBlock(x, y - 1, z).set("air");
        if(!event.player.isCreative()){event.block.popItem("kubejs:pillar")}
    }
});

BlockEvents.placed("kubejs:pillar",event=>{
  const { x, y, z } = event.block;
  if(event.block.properties.half == "upper" && event.level.getBlock(x,y+1,z) != "minecraft:air"){
    event.cancel()
    setCancellationResult(true)
  }
})