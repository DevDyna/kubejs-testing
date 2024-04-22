BlockEvents.leftClicked((event) => {
  if (event.player.isCrouching() && event.item.id == 'powergen:energy') {

    switch (event.block.item.mod) {
      case "rftoolspower":
        event.block.mergeEntityData({
          Info: { burning: 10 + event.block.entityData.Info.burning },
        });
        event.item.count--
        break;
      case "thermal":
        event.block.mergeEntityData({
          Energy: 60 + event.block.entityData.Energy,
        });
        event.item.count--
        break;
      default:
        Utils.server.runCommandSilent(`title ${event.player.name.string} actionbar {"text":"This machine dont support this Energy","color":"red"}`)
    }
        event.cancel()
        event.setCancellable(true)
  }
});
