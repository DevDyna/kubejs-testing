BlockEvents.rightClicked('kubejs:core',event=>{
const {x,y,z} = event.block

    if(event.hand == 'MAIN_HAND'){
    if(event.level.getBlock(x+2,y-1,z).id != 'supplementaries:pedestal'){


             event.server.runCommandSilent('particle minecraft:dust 1 0 0 10 '+(x+2)+' '+(y-0.5)+' '+(z)+' 0 0 0 0.1 1 force')
             event.server.runCommandSilent('particle minecraft:dust 1 1 0 10 '+(x-2)+' '+(y-0.5)+' '+(z)+' 0 0 0 0.1 1 force')
             event.server.runCommandSilent('particle minecraft:dust 1 0 1 10 '+(x)+' '+(y-0.5)+' '+(z-2)+' 0 0 0 0.1 1 force')
             event.server.runCommandSilent('particle minecraft:dust 0 1 0 10 '+(x)+' '+(y-0.5)+' '+(z+2)+' 0 0 0 0.1 1 force')



    }

    }


    /*event.server.scheduleInTicks(0,a=>{
        if(event.block.inventory.allItems.isEmpty()){
            
        }
    })*/
})