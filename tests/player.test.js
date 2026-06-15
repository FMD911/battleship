const Player = require("../src/player");
const Gameboard = require("../src/gameboard");

test("player can attack enemy board", () => {
  const player = Player();
  const board = Gameboard();

  player.attack(board, [0, 0]);

  expect(board.missedAttacks.length).toBe(1);
});

test("computer generates valid random attack", () => {
  const computer = Player(true); 
  const coord = computer.randomAttack();

  expect(coord.length).toBe(2);
  expect(coord[0]).toBeGreaterThanOrEqual(0);
  expect(coord[0]).toBeLessThan(10);
});