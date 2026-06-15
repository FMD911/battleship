const Gameboard = require("../src/gameboard");
const Ship = require("../src/ship");

test("can place a ship", () => {
  const board = Gameboard();
  const ship = Ship(3);

  board.placeShip(ship, [0, 0], "horizontal");

  expect(board.ships.length).toBe(1);
});

test("receives attack and records hit", () => {
  const board = Gameboard();
  const ship = Ship(2);

  board.placeShip(ship, [0, 0], "horizontal");

  board.receiveAttack([0, 0]);

  expect(ship.hits).toBe(1);
});