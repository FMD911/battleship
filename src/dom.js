function createBoard(container, onClick) {
  container.innerHTML = "";

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.addEventListener("click", () => {
        onClick([x, y], cell);
      });

      container.appendChild(cell);
    }
  }
}

function markHit(cell) {
  cell.classList.add("hit");
}

function markMiss(cell) {
  cell.classList.add("miss");
}

export { createBoard, markHit, markMiss };