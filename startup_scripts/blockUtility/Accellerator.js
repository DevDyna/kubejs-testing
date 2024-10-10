StartupEvents.registry("block", (event) => {
  event
    .create("kubejs:accellerator")
    .model("kubejs:block/accellerator/template")
    .item((item) => {
      item.modelJson({
        parent: "block/block",
      });
    });
});
