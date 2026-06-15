export default function Player(isComputer = false) {
  const previousAttacks = new Set();

  function randomAttack() {
    let x, y, key;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (previousAttacks.has(key));

    previousAttacks.add(key);
    return [x, y];
  }

  return {
    randomAttack,
  };
}