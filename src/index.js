import Game from "./game.js";
import { createBoard, markHit, markMiss } from "./dom.js";

const game = Game();

const playerBoard = document.getElementById("player-board");
const computerBoard = document.getElementById("computer-board");
const status = document.getElementById("status");

const vsAI = document.getElementById("vs-ai");
const vsPlayer = document.getElementById("vs-player");

let mode = null; 
let gameOver = false;
let turn = "player1";

vsAI?.addEventListener("click", () => {
  mode = "ai";
  gameOver = false;
  turn = "player1";
  status.textContent = "AI Mode - Your turn";
});

vsPlayer?.addEventListener("click", () => {
  mode = "pvp";
  gameOver = false;
  turn = "player1";
  status.textContent = "PvP Mode - Player 1 turn";
});

function checkEnd() {
  const winner = game.checkWinner();
  if (!winner) return;

  gameOver = true;

  if (winner === "player") {
    status.textContent = "🎉 Player 1 Wins!";
  } else {
    status.textContent = mode === "ai" ? "💀 AI Wins!" : "🎉 Player 2 Wins!";
  }
}

createBoard(computerBoard, (coord, cell) => {
  if (gameOver || !mode) return;
  if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

  if (mode === "ai") {
    const result = game.playerTurn(coord);

    result === "hit" ? markHit(cell) : markMiss(cell);

    checkEnd();

    if (!gameOver) {
      setTimeout(() => {
        const { coord: aiCoord, result } = game.computerTurn();

        const cells = playerBoard.querySelectorAll(".cell");
        const index = aiCoord[1] * 10 + aiCoord[0];
        const aiCell = cells[index];

        if (aiCell) {
          result === "hit" ? markHit(aiCell) : markMiss(aiCell);
        }

        checkEnd();
      }, 300);
    }
  }

  if (mode === "pvp") {
    if (turn !== "player1") return;

    const result = game.computerBoard.receiveAttack(coord);

    result === "hit" ? markHit(cell) : markMiss(cell);

    turn = "player2";
    status.textContent = "Player 2 turn";

    checkEnd();
  }
});

createBoard(playerBoard, (coord, cell) => {
  if (gameOver || mode !== "pvp") return;
  if (turn !== "player2") return;

  const result = game.playerBoard.receiveAttack(coord);

  result === "hit" ? markHit(cell) : markMiss(cell);

  turn = "player1";
  status.textContent = "Player 1 turn";

  checkEnd();
});

const resetBtn = document.getElementById("reset");

resetBtn?.addEventListener("click", () => {
  mode = null;
  gameOver = false;
  turn = "player1";

  status.textContent = "Choose a mode";

  document.querySelectorAll(".cell").forEach(cell => {
    cell.classList.remove("hit", "miss");
  });
});