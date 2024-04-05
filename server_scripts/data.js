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
  const items_list = []
  const xyz_list = []
  for ([a, b, c] of scheme) {
    if (block.offset(a, b, c).id !== "supplementaries:pedestal") {
      server.runCommandSilent(`particle dust 1 0 0 10 ${x+a} ${y+b + 0.5} ${z+c} 0 0 0 0 1 force`);
    }else{
      if(! block.offset(a, b, c).inventory.isEmpty()){
        items_list.push(Utils.id(block.offset(a, b, c).inventory.allItems[0].id))
          xyz_list.push([x+a,y+b,z+c])
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
let lost = []
  recipecollection.forEach(recipe_id=>{
    player.tell(Text.red('recipe : ').bold(true).append(Text.of(recipe_id.input).aqua().bold(false)))
    player.tell(Text.red('input : ').bold(true).append(Text.of(items_list).green().bold(false)))
    //if(recipe_id.input.length <= items_list.length){
      //recipe_id.input.forEach(e=>{
    player.tell('')
        player.tell(
          items_list
          .every((value, index) => value === recipe_id.input[index])
          )
      
      })
          // if(items_list.indexOf(e) != -1){
          //   //player.tell(temp_list.indexOf(e))
          //  lost.push(items_list.splice(items_list.indexOf(e), 1))
          // }
        //})
        //if(items_list.length == 0){
          //player.tell(temp.length)
          //player.tell('-> '+lost)
          //items_list.forEach((a,index)=>{
          //  player.tell('-> '+xyz_list[index][0]+' '+xyz_list[index][1]+' '+xyz_list[index][2])
          //  level.getBlock(xyz_list[index][0],xyz_list[index][1],xyz_list[index][2]).inventory.clear(items_list[index])
          //  items_list.splice(index, 1);
          //})
          //player.tell(items_list)
        //}

    //}else{
    //  server.runCommandSilent('/title @p actionbar "Missing Ingredient"')
    //}


        // recipe_id.input.forEach(inrecipe=>{
        //   items.forEach(list_in=>{
        //     ar = items.filter(item => item !== inrecipe);
        //     //if(list_in.input == inrecipe){


        //      // level.getBlock(list_in.coords.x,list_in.coords.y,list_in.coords.z).inventory.clear(inrecipe)
        //      // level.getBlock(x,y+1,z).popItemFromFace(recipe_id.output,'up')
        //     //}
        //   })
        // })

  
});