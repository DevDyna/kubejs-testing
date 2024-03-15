BlockEvents.rightClicked("kubejs:core", (event) => {
  if (event.hand !== "MAIN_HAND") return;
  const { block, server ,player , level } = event;
  const {x,y,z} = block

  const scheme = [
    [2, -1, 0],
    [-2, -1, 0],
    [0, -1, 2],
    [0, -1, -2],
  ];
  let a, b, c;
  const items = []
  for ([a, b, c] of scheme) {
    if (block.offset(a, b, c).id !== "supplementaries:pedestal") {
      server.runCommandSilent(`particle dust 1 0 0 10 ${x+a} ${y+b + 0.5} ${z+c} 0 0 0 0 1 force`);
    }else{
      if(! block.offset(a, b, c).inventory.isEmpty()){
        items.push({
          "input": Utils.id(block.offset(a, b, c).inventory.allItems[0].id),
          "coords":{
            "x":x+a,
            "y":y+b,
            "z":z+c
          }
        })
      }
    }
  }

  const recipecollection = [
    {
    "input": [
      'minecraft:stone', 'minecraft:granite',     //I NEED TO FIX THIS BUT NOT TODAY!
      'minecraft:sand', 'minecraft:dirt'
    ], 
    "output": "minecraft:diorite" 
  },
  {
    "input": [
      'minecraft:cobblestone'
    ], 
    "output": "minecraft:gravel"
  }
]

  recipecollection.forEach(recipe_id=>{
    //switch(recipe_id.input.length){
      //case 1:
        recipe_id.input.forEach(inrecipe=>{
          items.forEach(list_in=>{
            if(list_in.input == inrecipe){


              level.getBlock(list_in.coords.x,list_in.coords.y,list_in.coords.z).inventory.clear(inrecipe)
              level.getBlock(x,y+1,z).popItemFromFace(recipe_id.output,'up')
            }
          })
        })
        //break;
        //case 2:
        //break;
        //case 3:
        //break;
        //case 4:
        /*  recipe_id.input.forEach(inrecipe=>{
            items.forEach(list_in=>{
              if(list_in.input == inrecipe){
                level.getBlock(list_in.coords.x,list_in.coords.y,list_in.coords.z).inventory.clear(inrecipe)
                level.getBlock(x,y+1,z).popItemFromFace(recipe_id.output,'up')
              }
            })
          })
       */// break;
        //default:
        //player.tell('ERROR CASE -> DEFAULT')
    //}
  })
});