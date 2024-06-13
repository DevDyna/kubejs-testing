const $register = Java.loadClass("com.rekindled.embers.RegistryManager");

const coal = new $register.MetalCrystalSeed("coal")
coal.makeItem()

StartupEvents.registry("item", (event) => {
  event
    .create("embers:coal_nugget")
    .texture("embers:item/nugget_iron")
    .color(0, 0x393434)
    .tag("forge:nuggets/coal")
    .tag("forge:nuggets");
});