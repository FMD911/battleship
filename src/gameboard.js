function Gameboard() {
  const ships = [];

  function placeShip(ship, [x, y], direction) {
    ships.push(ship);
  }

  function receiveAttack([x, y]) {
    if (ships.length > 0) {
      ships[0].hit();
    }
  }

  return {
    ships,
    placeShip,
    receiveAttack,
  };
}

module.exports = Gameboard;