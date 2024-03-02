
Platform.mods.kubejs.name = "Celestial Core";

StartupEvents.registry("item", (event) => {
  event.create("minecraft:debug_stick").texture('kubejs:item/star').displayName('Energy Singularity').unstackable()

})

const $BooleanProperty = Java.loadClass('net.minecraft.world.level.block.state.properties.BooleanProperty')

/**
 * 
 * @param {item} item item id
 * @param {block} id_block block id of generator
 * @param {number} rfgen FE generated / tick
 */

function generator(item,id_block,rfgen){
StartupEvents.registry("block", (event) => {
  event.create(id_block).property($BooleanProperty.create("active")).blockEntity((be) => {
      be.inventory(9, 1, item);
      be.rightClickOpensInventory();

        be.serverTick(1,0,state=>{
          state.persistentData.putBoolean('active',(!state.inventory.isEmpty()))

          state.block.set(state.block.id, {active: state.persistentData.getBoolean('active')})

            if(state.persistentData.getBoolean('active'))
            state.persistentData.putInt('rate',state.inventory.count(item))
        })

      be.attachCapability(
        CapabilityBuilder.ENERGY.customBlockEntity()
          .canExtract(() => true)
          .canReceive(() => false)

          .extractEnergy(energy => {
            if (energy.persistentData.getBoolean('active')) {
              return rfgen * energy.persistentData.getInt('rate');
            } else {
              return 0;
            }
          })

          .getEnergyStored(energy => {
            if (energy.persistentData.getBoolean('active')) {
              return rfgen * energy.persistentData.getInt('rate');
            } else {
              return 0;
            }
          })
          .getMaxEnergyStored(energy => {
            if (energy.persistentData.getBoolean('active')) {
              return rfgen * energy.persistentData.getInt('rate');
            } else {
              return 0;
            }
          })
      );
    }).blockstateJson = {
      "variants": {
          "active=true": { "model": "kubejs:block/"+id_block+"/on" },
          "active=false": { "model": "kubejs:block/"+id_block+"/off" }
      }
  }
});
}

generator("minecraft:debug_stick",'dynamo',20)
generator("minecraft:debug_stick",'omega_dynamo',2000)