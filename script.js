const Player = (name, symbol) => {
  const getSymbol = () => symbol;

  return { name, getSymbol };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer;
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.innerHTML = currentPlayer === "X" ? "X" : "O";

      cell.disabled = true;

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
  });
})();
