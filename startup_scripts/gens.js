function generator(item,id_block,rate){
StartupEvents.registry("block", (event) => {
  event.create(id_block).property($BooleanProperty.create("active")).blockEntity((be) => {
      //be.inventory(9, 1, item);
      //be.rightClickOpensInventory();

        be.serverTick(1,0,state=>{

          state.block.set(state.block.id, {active: state.persistentData.getBoolean('active')})

          if(state.persistentData.getBoolean('active')){
            
            if(Math.floor(Math.random() * 5) == 4){
              let {x,y,z} = state
              let compost = state.level.createEntity('item')
              compost.x = x+0.5
              compost.y = y+1
              compost.z = z+0.5
              compost.item = Item.of(item)
              compost.spawn()
            }
        }

        })

        be.attachCapability(
          CapabilityBuilder.ENERGY.customBlockEntity()
            .canExtract(() => false)
            .canReceive(() => true)
  
            .receiveEnergy((energy,amount) => {
              energy.persistentData.putInt('amount',amount)
              energy.persistentData.putBoolean('active',(amount>0) ? true : false)
              return amount
            })

            
            .getEnergyStored(energy => {return energy.persistentData.getInt('amount')})
            .getMaxEnergyStored(energy => {return 1000})
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

generator('minecraft:iron_ingot','iron',20)
generator("minecraft:gold_ingot",'gold',100)
