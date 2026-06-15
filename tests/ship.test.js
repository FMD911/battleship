const Ship = require("../src/ship");

test("ship takes a hit", () => {
  const ship = Ship(3);

  ship.hit();
  expect(ship.hits).toBe(1);
});

test("ship sinks after enough hits", () => {
  const ship = Ship(2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});