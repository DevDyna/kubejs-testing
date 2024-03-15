StartupEvents.registry("item", (event) => {
  event.create("minecraft:debug_stick").texture('kubejs:item/star').displayName('Energy Singularity').unstackable()

})
StartupEvents.registry("item", (event) => {
  event.create("data:debug_stick").texture('kubejs:item/star').displayName('Energy Singularity').unstackable()
})

