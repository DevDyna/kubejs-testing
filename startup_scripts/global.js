//priority 999

Platform.mods.kubejs.name = "Celestial Core";
const $BooleanProperty = Java.loadClass('net.minecraft.world.level.block.state.properties.BooleanProperty')

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}