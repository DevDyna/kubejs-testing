ServerEvents.recipes((event) => {
  //New Augment code
  event.shapeless(
    Item.of("data:debug_stick", "{AugmentData:{Type: Upgrade, BaseMod:5f}}"),
    ["minecraft:stone"]
  );
});

const augment = [
  "thermal:upgrade_augment_1",
  "thermal:upgrade_augment_2",
  "thermal:upgrade_augment_3",
  "data:debug_stick",
];
//'{AugmentData:{BaseMod:5.0f,Type:"Upgrade"}}'

BlockEvents.rightClicked("#thermal:machines", (event) => {
  const { block, player, level, server } = event;
  block.entityData.ItemInv.forEach((element) => {
    player.handSlots.forEach((hand) => {
      augment.forEach((upgrade_item,index) => {
        if (element.id == upgrade_item && hand == augment[index+1]) {
            //event.cancel(false)
            player.tell('out ->'+augment[index+1])
            player.tell('in ->'+upgrade_item)
          hand = augment[index+1];
          element.id = upgrade_item;
        }
      });
    });
  });
});
