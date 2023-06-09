//Factory functions to create player objects
const Player = (name, symbol) => {
  //const getSymbol = () => symbol;
  return { name, symbol };
};

// AI player
const aiPlayer = (name, symbol) => {
  //const getSymbol = () => symbol;

  const getRandomAvailableCell = (board) => {
    const availableCells = [];
    board.forEach((cell, index) => {
      if (cell === "") {
        availableCells.push(index);
      }
    });
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
  };

  const makeMove = (board) => {
    let index;
    do {
      index = getRandomAvailableCell(board);
    } while (board[index] !== "");
    board[index] = symbol;
    return index;
  };

  return { name, symbol, makeMove };
};

// Module pattern to create game board
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer;
  let gameStarted = false;
  let playerSelectedSymbol = false;
  const cells = document.querySelectorAll(".cell");
  const resultDiv = document.getElementById("result");

  const player1 = Player("Player", "");
  const aiPlay = aiPlayer("AI", "");

  // Button event listeners to select symbol and start the game
  const xButton = document.getElementById("xBtn");
  xButton.addEventListener("click", () => {
    player1.symbol = "X";
    aiPlay.symbol = "O";
    currentPlayer = player1;
    playerSelectedSymbol = true;
    gameStarted = true;
    gameController.startGame();
  });

  const oButton = document.getElementById("oBtn");
  oButton.addEventListener("click", () => {
    player1.symbol = "O";
    aiPlay.symbol = "X";
    currentPlayer = player1;
    playerSelectedSymbol = true;
    gameStarted = true;
    gameController.startGame();
  });

  const resetButton = document.getElementById("resetBtn");
  resetButton.addEventListener("click", () => {
    cells.forEach((cell, index) => {
      cell.innerHTML = "";
      board[index] = "";
      cell.disabled = false;
    });
    showResult("");
    gameStarted = false;
    playerSelectedSymbol = false;
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
  const showResult = (message) => {
    resultDiv.innerHTML = message;
    if (message !== "") {
      resultDiv.classList.add("show");
      setTimeout(() => {
        resultDiv.classList.remove("show");
      }, 7000);
    }
  };

  // announce winner or tie
  const showMessage = (message, isWin) => {
    const messageContainer = isWin
      ? document.getElementById("win-message-container")
      : document.getElementById("tie-message-container");
    console.log(messageContainer);
    if (messageContainer) {
      const messageElement = messageContainer.querySelector(".message");
      messageElement.textContent = message;
      messageContainer.classList.add("show");
      setTimeout(() => {
        messageContainer.classList.remove("show");
      }, 7000);
    }
  };

  const announceWinner = (currentPlayer, winnerSymbol) => {
    const message = winnerSymbol
      ? ` ${currentPlayer.name} ${winnerSymbol} wins!`
      : "It's A Tie!";
    showResult(message);
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    gameStarted = false;
    playerSelectedSymbol = false;
    setTimeout(() => {
      resultDiv.classList.remove("show");
    }, 7000);
  };

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (
        board[index] !== "" ||
        checkWin() ||
        board.every((cell) => cell !== "")
      ) {
        return;
      }

      cell.innerHTML = currentPlayer.symbol;
      board[index] = currentPlayer.symbol;

      if (checkWin()) {
        announceWinner(currentPlayer, currentPlayer.symbol);
        cells.forEach((cell) => {
          cell.disabled = true;
        });
        return;
      }

      if (board.every((cell) => cell !== "")) {
        announceWinner(currentPlayer, null);
        return;
      }

      currentPlayer = currentPlayer === player1 ? aiPlay : player1;

      if (currentPlayer === aiPlay && gameStarted) {
        currentPlayer = aiPlay;
        const aiMove = aiPlay.makeMove(board);
        const aiCells = cells[aiMove];
        aiCells.innerHTML = aiPlay.symbol;
        board[aiMove] = aiPlay.symbol;
        if (checkWin()) {
          announceWinner(currentPlayer, currentPlayer.symbol);
          cells.forEach((cell) => {
            cell.disabled = true;
          });
          return;
        }
        if (board.every((cell) => cell !== "")) {
          announceWinner(currentPlayer, null);
          return;
        }
        currentPlayer = player1;
      }
    });
  });
  return {
    board,
    currentPlayer,
    playerSelectedSymbol,
    player1,
    aiPlay,
    cells,
    checkWin,
    announceWinner,
  };
})();

const gameController = (() => {
  let currentPlayer;

  const startGame = () => {
    gameBoard.currentPlayer = gameBoard.player1;
    currentPlayer = gameBoard.currentPlayer;
  };

  return { startGame };
})();
gameController.startGame();
