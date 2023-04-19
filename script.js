const Player = (name, symbol) => {

}

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
    

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.innerHTML = currentPlayer === "X" ? "X" : "O";

      cell.disabled = true;

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
  });
})();
