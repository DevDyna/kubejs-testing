/**
 * 
 * @param {item} item item id
 * @param {block} id_block block id of generator
 * @param {number} rfgen FE generated / tick
 */
let i = 0
function dynamo(item,id_block,rfgen,consume){
StartupEvents.registry("block", (event) => {
  event.create(id_block).property($BooleanProperty.create("active")).blockEntity((be) => {
      be.inventory(9, 1, item);
      be.rightClickOpensInventory();

        be.serverTick(1,0,state=>{

          state.persistentData.putBoolean('active',(!state.inventory.isEmpty()))
          state.persistentData.putInt('delay',state.persistentData.getInt('delay')+1)

          state.block.set(state.block.id, {active: state.persistentData.getBoolean('active')})

            if(state.persistentData.getBoolean('active'))
            state.persistentData.putInt('rate',state.inventory.count(item))

            if(state.persistentData.getInt('delay') >= 20){
              state.persistentData.putInt('delay',0)
              if(state.persistentData.getBoolean('active') && consume){
                state.inventory.extractItem(state.inventory.find(item),1,false)
              }
            }


        })

      //   be.attachCapability(CapabilityBuilder.FLUID.customBlockEntity()
      //   .getFluid(0,'minecraft:water')
      //   .getCapacity(10)
      //   .onFill(()=>0)
      //   .onDrain(()=>0)
      // )

        // be.attachCapability(
        //   CapabilityBuilder.ITEM.blockEntity()
        //   .insertItem()
        //   .extractItem()
        // )


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
    }).item(item=>{
      item.modelJson({
        "parent": "kubejs:block/dynamo/off"
      })

    }).blockstateJson = {
      "variants": {
          //"active=true": { "model": "kubejs:block/"+id_block+"/on" },
          //"active=false": { "model": "kubejs:block/"+id_block+"/off" }
          "active=true": { "model": "kubejs:block/dynamo/on" },
          "active=false": { "model": "kubejs:block/dynamo/off" }
      }
  }
});
}

dynamo('minecraft:redstone','dynamo',20,false)
dynamo('minecraft:redstone','omega_dynamo',2000,true)

