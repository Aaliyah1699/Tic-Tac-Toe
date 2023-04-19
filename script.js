const Player = (name, symbol) => {
  const getSymbol = () => symbol;

  return { name, getSymbol };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer;
  const cells = document.querySelectorAll(".cell");
  const resultDiv = document.getElementById("result");

  const player1 = Player("Player 1", "");
  const player2 = Player("Player 2", "");

  const xButton = document.getElementById("xBtn");
  xButton.addEventListener("click", () => {
    player1.symbol = "X";
    player2.symbol = "O";
    currentPlayer = player1;
    gameController.startGame();
  });

  const oButton = document.getElementById("oBtn");
  oButton.addEventListener("click", () => {
    player1.symbol = "O";
    player2.symbol = "X";
    currentPlayer = player1;
    gameController.startGame();
  });

  const resetButton = document.getElementById("resetBtn");
  resetButton.addEventListener("click", () => {
    cells.forEach((cell, index) => {
      cell.innerHTML = "";
        board[index] = "";
      cell.disabled = false;
    });
    resultDiv.innerHTML = "";
  });

  const checkWin = () => {
    const winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6], // diagonal
    ];

    for (let i = 0; i < winCombo.length; i++) {
      const [a, b, c] = winCombo[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  const announceWinner = () => {
    const winner = currentPlayer === player1 ? player2 : player1;
    resultDiv.innerHTML = `Winner: ${winner.name}`;
    cells.forEach((cell) => {
        cell.disabled = true;
        });
  };

  const announceTie = () => {
    resultDiv.innerHTML = "It's A Tie!";
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (board[index] !== "") {
        return;
      }

      cell.innerHTML = currentPlayer.getSymbol();
      board[index] = currentPlayer.getSymbol();

      if (checkWin()) {
        announceWinner();
        return;
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;
    });
  });
})();

const gameController = (() => {
    let currentPlayer;

    const startGame = () => {
        currentPlayer = player1;
    };

    return { startGame };
})();
