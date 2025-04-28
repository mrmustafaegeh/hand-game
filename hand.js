const score = {
  win: 0,
  loss: 0,
  tie: 0,
};

function updateScore(playerMove, computerMove, result) {
  const updateScore = document.querySelector(".update-score");
  if (updateScore) {
    updateScore.innerHTML = `you picked ${playerMove}. computer picked ${computerMove}. ${result} <br>
    win:${score.win} , losses:${score.loss} , tie:${score.tie}`;

    updateScore.style.display = "block";

    setTimeout(function () {
      updateScore.style.display = "none";
    }, 5000);
  }
}


function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function playerGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === computerMove) {
    result = "tie";
  } else if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "You win";
  } else {
    result = "You lost";
  }

  if (result === "You win") {
    score.win += 1;
  } else if (result === "You lost") {
    score.loss += 1;
  } else if (result === "tie") {
    score.tie += 1;
  }

  updateScore(playerMove, computerMove, result);
}

function resetGame() {
  score.win = 0;
  score.loss = 0;
  score.tie = 0;
  const messageElement = document.querySelector(".delete-result");

  if (messageElement) {
    messageElement.innerHTML =
      "The game has been reset. Let's start the game over!";
  }
  setTimeout(function () {
    messageElement.style.display = "none";
  }, 5000);
}

document.getElementById("rockBtn").addEventListener("click", function () {
  playerGame("rock");
});
document.getElementById("paperBtn").addEventListener("click", function () {
  playerGame("paper");
});
document.getElementById("ScissorsBtn").addEventListener("click", function () {
  playerGame("scissors");
});
document.getElementById("delete-button").addEventListener("click", resetGame);
