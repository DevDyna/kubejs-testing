StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:builder", "cardinal")
    .property($BooleanProperty.create("active"))
    .blockEntity((entity) => {
      entity.rightClickOpensInventory();
      entity.inventory(9, 9);
    })
    .item((item) => {
      item.modelJson({
        parent: "kubejs:block/dynamo/off",
      });
    }).blockstateJson = {
    variants: {
      "": { model: "kubejs:block/dynamo/off" },
    },
  };
});
