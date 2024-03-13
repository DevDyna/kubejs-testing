StartupEvents.registry("block", (event) => {
    event.create('core').textureAll('minecraft:block/cobblestone').rightClick(a=>{ a.player.swing()})
})