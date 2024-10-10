//WIP
BlockEvents.placed("kubejs:builder",event=>{
event.server.runCommand('/summon block_display ~ ~ ~ {Tags:["shape"],transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],translation:[0f,0f,0f],scale:[9f,1f,9f]},block_state:{Name:"minecraft:glass"}}')
})