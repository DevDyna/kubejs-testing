StartupEvents.registry("block", (event) => {
    event.create('core').textureAll('minecraft:block/cobblestone').rightClick(a=>{ a.player.swing()})
})

StartupEvents.registry("block", (event) => {
    event.create('gen').blockstateJson = {
      "variants": {
          "": { "model": "kubejs:block/gen/model" }
      }
  }
})