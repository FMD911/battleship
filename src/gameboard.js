export default function Gameboard() {
  const ships = [];
  const missedAttacks = [];

  function placeShip(ship, [x, y], direction) {
    const positions = [];

    for (let i = 0; i < ship.length; i++) {
      if (direction === "horizontal") {
        positions.push([x + i, y]);
      } else {
        positions.push([x, y + i]);
      }
    }

    ships.push({ ship, positions });
  }

  function receiveAttack([x, y]) {
    for (const entry of ships) {
      for (const pos of entry.positions) {
        if (pos[0] === x && pos[1] === y) {
          entry.ship.hit();
          return "hit";
        }
      }
    }

    missedAttacks.push([x, y]);
    return "miss";
  }

  return {
    ships,
    missedAttacks,
    placeShip,
    receiveAttack,
  };
}