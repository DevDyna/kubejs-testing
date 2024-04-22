StartupEvents.registry("item", (event) => {
  event
    .create("minecraft:debug_stick")
    .texture("kubejs:item/star")
    .displayName("Energy Singularity")
    .unstackable();

    event
    .create("powergen:energy")
    .texture("kubejs:item/star")
    .displayName("Solidifed Energy")
});



// //--------------------------------------//
// let tier_type = ["tipo1", "tipo2"];
// //--------------------------------------//
// StartupEvents.registry("item", (event) => {
//   tier_type.forEach((item) => {
//     event.create(item + "_item_id");
//   });
// });
// //--------------------------------------//
// ItemEvents.armorTierRegistry((event) => {
//   function customtier(name) {
//     e.add(name, (tier) => {
//       //..
//     });
//   }
//   tier_type.forEach((item) => {
//     customtier(item);
//   });
// });
// //--------------------------------------//
