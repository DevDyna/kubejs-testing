BlockEvents.rightClicked("kubejs:reactor_controller", (click) => {
  let size = 5;
  const rid = ["north", "south", "west", "east"];
  const dir = ["south", "north", "east", "west"];

  /*
    [-Math.floor(size / 2), 0, -(size - Math.floor(size / 2))],
    [-Math.floor(size / 2), 0, 0],
    [0, 0, -Math.floor(size / 2)],
    [-(size - Math.floor(size / 2)), 0, -Math.floor(size / 2)],
*/

  const side = {
    south: [-Math.floor(size / 2), 0, -(size - Math.floor(size / 2) + (Math.floor(size / 4)+1))],
    north: [-Math.floor(size / 2), 0, 0],
    east: [-(size - Math.floor(size / 2) + (Math.floor(size / 4)+1)), 0, -Math.floor(size / 2)],
    west: [0, 0, -Math.floor(size / 2)],
  };

  let indexSelector = dir.indexOf(click.block.properties.get("facing"));
  let blockCenter = click.block.offset(rid[indexSelector]);
  click.player.statusMessage = side[dir[indexSelector]].toString();
  blockCenter = blockCenter.offset(
    side[dir[indexSelector]][0],
    side[dir[indexSelector]][1],
    side[dir[indexSelector]][2]
  );

  for (let xa = 0; xa < size; xa++) {
    for (let ya = 0; ya < size; ya++) {
      for (let za = 0; za < size; za++) {
        click.level.spawnParticles(
          "minecraft:end_rod",
          true,
          blockCenter.x + xa + 0.5,
          blockCenter.y + ya + 0.5,
          blockCenter.z + za + 0.5,
          0,
          0,
          0,
          0.1,
          2
        );
      }
    }
  }
});
