//Factory functions to create player objects
const Player = (name, symbol) => {
  const getSymbol = () => symbol;

  return { name, getSymbol: getSymbol };
};

// AI player
const aiPlayer = (name, symbol) => {
  const getSymbol = () => symbol;

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
    board[index] = getSymbol();
    return index;
  };

  return { name, getSymbol: getSymbol, makeMove: makeMove };
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
    player1.getSymbol = () => "X";
    aiPlay.getSymbol = () => "O";
    currentPlayer = player1;
    playerSelectedSymbol = true;
    gameStarted = true;
    gameController.startGame();
  });

  const oButton = document.getElementById("oBtn");
  oButton.addEventListener("click", () => {
    player1.getSymbol = () => "O";
    aiPlay.getSymbol = () => "X";
    currentPlayer = player1;
    playerSelectedSymbol = true;
    gameStarted = true;
    gameController.startGame();
  });

  resetButton = document.getElementById("resetBtn");
  resetButton.addEventListener("click", () => {
    cells.forEach((cell, index) => {
      cell.innerHTML = "";
      board[index] = "";
      cell.disabled = false;
    });
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("show");
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
  // announce winner or tie
  const showMessage = (message, isWin) => {
    const messageContainer = isWin
      ? document.getElementById("win-message-container")
      : document.getElementById("tie-message-container");
    if (messageContainer) {
      const messageElement = messageContainer.querySelector(".message");
      messageElement.textContent = message;
      messageContainer.classList.add("show");
      setTimeout(() => {
        messageContainer.classList.remove("show");
      });
    }
  };

  const announceWinner = (currentPlayer) => {
    const winnerSymbol = currentPlayer ? currentPlayer.getSymbol() : "";
    const message = winnerSymbol
      ? ` ${currentPlayer.name} ${winnerSymbol} wins!`
      : "It's A Tie!";

    resultDiv.innerHTML = message;
    resultDiv.classList.add("show");
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    gameStarted = false;
    playerSelectedSymbol = false;
    setTimeout(() => {
      resultDiv.classList.remove("show");
    });
  };

  const announceTie = () => {
    resultDiv.innerHTML = "It's A Tie!";
    resultDiv.classList.add("show");
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    gameStarted = false;
    playerSelectedSymbol = false;
    setTimeout(() => {
      resultDiv.classList.remove("show");
    }, 4000);
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

      cell.innerHTML = currentPlayer.getSymbol();
      board[index] = currentPlayer.getSymbol();

      if (checkWin()) {
        announceWinner(currentPlayer);
        cells.forEach((cell) => {
          cell.disabled = true;
        });
        return;
      }

      if (board.every((cell) => cell !== "")) {
        announceTie();
        return;
      }

      currentPlayer = currentPlayer === player1 ? aiPlay : player1;

      if (currentPlayer === aiPlay && gameStarted) {
        currentPlayer = aiPlay;
        const aiMove = aiPlay.makeMove(board);
        cells[aiMove].innerHTML = aiPlay.getSymbol();
        if (checkWin()) {
          announceWinner(currentPlayer);
          cells.forEach((cell) => {
            cell.disabled = true;
          });
          return;
        }
        if (board.every((cell) => cell !== "")) {
          announceTie();
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
    announceTie,
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
