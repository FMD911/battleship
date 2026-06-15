import Player from "./player.js";
import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

export default function Game() {
  const computer = Player(true);

  const playerBoard = Gameboard();
  const computerBoard = Gameboard();

  const playerShips = [Ship(2), Ship(3), Ship(3)];
  const computerShips = [Ship(2), Ship(3), Ship(3)];

  function randomPlace(board, ship) {
    let placed = false;

    while (!placed) {
      const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      const positions = [];

      for (let i = 0; i < ship.length; i++) {
        const nx = direction === "horizontal" ? x + i : x;
        const ny = direction === "vertical" ? y + i : y;

        if (nx >= 10 || ny >= 10) break;

        positions.push([nx, ny]);
      }

      if (positions.length === ship.length) {
        board.placeShip(ship, [x, y], direction);
        placed = true;
      }
    }
  }

  playerShips.forEach(s => randomPlace(playerBoard, s));
  computerShips.forEach(s => randomPlace(computerBoard, s));

  function playerTurn(coord) {
    return computerBoard.receiveAttack(coord);
  }

  function computerTurn() {
    const coord = computer.randomAttack();
    const result = playerBoard.receiveAttack(coord);
    return { coord, result };
  }

  function checkWinner() {
    const computerDead = computerBoard.ships.every(e =>
      e.ship.hits >= e.ship.length
    );

    const playerDead = playerBoard.ships.every(e =>
      e.ship.hits >= e.ship.length
    );

    if (computerDead) return "player";
    if (playerDead) return "computer";

    return null;
  }

  return {
    playerTurn,
    computerTurn,
    playerBoard,
    computerBoard,
    checkWinner,
  };
}