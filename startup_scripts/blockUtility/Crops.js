StartupEvents.registry('block', event => {
	

	event.create("enchanted_golden_carrot", "crop")
  .age(7, builder => {
    builder
		   //i  x  y  z   x  y   z
      .shape(0, 0, 0, 0, 16, 2, 16)
      .shape(1, 0, 0, 0, 16, 2, 16)
      .shape(2, 0, 0, 0, 16, 4, 16)
      .shape(3, 0, 0, 0, 16, 4, 16)
      .shape(4, 0, 0, 0, 16, 8, 16)
      .shape(5, 0, 0, 0, 16, 8, 16)
      .shape(6, 0, 0, 0, 16, 8, 16)
      .shape(7, 0, 0, 0, 16, 16, 16)

  })
  .survive((state, level, pos) => {
    const FARMLAND = Java.loadClass('net.minecraft.world.level.block.FarmBlock')
    let blockState = level.getBlockState(pos.below())
    let mcBlock = blockState.block
    if (mcBlock instanceof FARMLAND) {
      return true
    }
    else return false
  })
  .growTick((tickevent) => 5)
  .dropSeed(false)
  .crop("kubejs:enchanted_golden_carrot", 1)
  .texture(0, "minecraft:block/cobblestone")
  .texture(1, "minecraft:block/stone")
  .texture(2, "minecraft:block/tuff")
  .texture(3, "minecraft:block/cobbled_deepslate")
  .texture(4, "minecraft:block/deepslate")
  .texture(5, "minecraft:block/blackstone")
  .texture(6, "minecraft:block/obsidian")
  .texture(7, "minecraft:block/bedrock")
  .tagBlock('minecraft:mineable/pickaxe')
  .item((seedItem) => {
    seedItem.texture("minecraft:item/apple")
  })
	
})