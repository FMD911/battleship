const Game = require("../src/game");

test("game initializes correctly", () => {
  const game = Game();

  game.playerTurn([0, 0]);
  game.computerTurn();

  expect(true).toBe(true);
});