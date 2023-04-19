const Player = (name, symbol) => {
  const getSymbol = () => symbol;

  return { name, getSymbol };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer;
  const cells = document.querySelectorAll(".cell");

  const player1 = Player("Player 1", "");
  const player2 = Player("Player 2", "");

  const xButton = document.getElementById("xBtn");
  xButton.addEventListener("click", () => {
    player1.symbol = "X";
    player2.symbol = "O";
    currentPlayer = player1;
  });

  const oButton = document.getElementById("oBtn");
  oButton.addEventListener("click", () => {
    player1.symbol = "O";
    player2.symbol = "X";
    currentPlayer = player1;
  });

  const resetButton = document.getElementById("resetBtn");
  resetButton.addEventListener("click", () => {
    cells.forEach((cell) => {
      cell.innerHTML = "";
      cell.disabled = false;
    });
  });

  const checkWin = () => {
    const winCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6] // diagonal
    ]
  }

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.innerHTML = currentPlayer.getSymbol();

      cell.disabled = true;

      currentPlayer = currentPlayer === player1 ? player2 : player1;
    });
  });
})();

const gameController = (() => {

})();