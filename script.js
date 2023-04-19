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

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.innerHTML = currentPlayer === "X" ? "X" : "O";

      cell.disabled = true;

      currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
  });
})();
