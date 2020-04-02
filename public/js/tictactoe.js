const message = document.getElementById("message");
const background = document.getElementById("background");
const cross = document.getElementById("cross");
const naught = document.getElementById("naught");

const board = new Array(9).fill(0);
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]
  let crossTurn = true;
  let gameStatus = 0;

window.onload = () => {  
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.width = 64;
  const context = canvas.getContext("2d");

  document.body.addEventListener("keyup", (event) => {
    if (event.keyCode >= 97 && event.keyCode <= 105 && gameStatus === 0) {
      // Numpad 1 - 9 keys control the game
      const index = event.keyCode - 97;
      if (board[index] === 0) {
        board[index] = crossTurn ? 1 : 2;
        console.log(board);
        turnComplete();
      }
    } else if (event.keyCode === 32 && gameStatus !== 0) {
      // Space resets the game if it's over
      board.fill(0);
      gameStatus = 0;
      crossTurn = !crossTurn;
      drawBoard();
      printMessage();
    }
  });

  drawBoard();
  printMessage();

  function turnComplete() {
    drawBoard();
    crossTurn = !crossTurn;
    gameStatus = checkForWinner();
    printMessage();
  }

  function printMessage() {
    if (gameStatus == 0) {
      message.innerHTML = `It's ${crossTurn ? "X" : "O"}'s turn.`;
    } else if (gameStatus == 3) {
      message.innerHTML = "It's a tie. Press space to play again.";
    } else {
      message.innerHTML = `${crossTurn ? "O" : "X"} wins. Press space to play again.`
    }
  }
  
  function checkForWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
      let pattern = winPatterns[i];
      if (board[pattern[0]] !== 0 && (board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]])) {
        return board[pattern[0]];
      }
    }

    // Execution will reach here only if no winning pattern is found
    if (board.find(elem => elem === 0) === undefined) {
      return 3;
    } else {
      return 0;
    }
  }

  function drawBoard() {
    context.drawImage(background, 0, 0, 64, 128);
    for (let i = 0; i < 9; i++) {
      if (board[i] !== 0) {
        x = (i % 3) * 22;
        y = (2 - (Math.floor(i / 3))) * 44;
        context.drawImage(board[i] === 1 ? cross : naught, x, y, 20, 40);
      }
    }
    const url = canvas.toDataURL();
    setFavicon(url);
  }

  function setFavicon(url) {
    let favicon = document.querySelector('link[rel="icon"]');
    let newIcon = favicon.cloneNode(true);
    newIcon.setAttribute('href', url);
    console.log(favicon, newIcon);
    document.querySelector("head").replaceChild(newIcon, favicon);
    console.log(document.querySelector("head"));
  }
}