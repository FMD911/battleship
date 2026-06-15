const Gameboard = require("../src/gameboard");
const Ship = require("../src/ship");

test("places ship correctly", () => {
  const board = Gameboard();
  const ship = Ship(3);

  board.placeShip(ship, [0, 0], "horizontal");

  expect(board.ships.length).toBe(1);
});

test("hits ship correctly", () => {
  const board = Gameboard();
  const ship = Ship(2);

  board.placeShip(ship, [0, 0], "horizontal");

  board.receiveAttack([0, 0]);

  expect(ship.hits).toBe(1);
});

test("records missed attack", () => {
  const board = Gameboard();

  board.receiveAttack([5, 5]);

  expect(board.missedAttacks.length).toBe(1);
});