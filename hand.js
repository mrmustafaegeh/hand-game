const score = {
  win: 0,
  loss: 0,
  tie: 0,
};

const handIcons = {
  rock: "fas fa-hand-fist",
  paper: "fas fa-hand",
  scissors: "fas fa-hand-scissors",
};

let isAnimating = false;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateCountdown() {
  const countdownEl = document.getElementById("countdown");
  const countdown = ["3", "2", "1", "Go!"];

  for (let i = 0; i < countdown.length; i++) {
    countdownEl.textContent = countdown[i];
    countdownEl.classList.add("animate");
    await delay(800);
    countdownEl.classList.remove("animate");
  }

  countdownEl.textContent = "";
}

async function animateHands(playerMove, computerMove) {
  const playerHand = document.getElementById("playerHand");
  const computerHand = document.getElementById("computerHand");

  // Start shaking animation
  playerHand.classList.add("shaking");
  computerHand.classList.add("shaking");

  // Shake for 2 seconds
  await delay(2000);

  // Stop shaking and reveal choices
  playerHand.classList.remove("shaking");
  computerHand.classList.remove("shaking");

  // Update hand displays with new icons
  playerHand.innerHTML = `<i class="${handIcons[playerMove]}"></i>`;
  computerHand.innerHTML = `<i class="${handIcons[computerMove]}"></i>`;

  // Add reveal animation
  playerHand.classList.add("revealing");
  computerHand.classList.add("revealing");

  await delay(800);

  // Clean up reveal animation
  playerHand.classList.remove("revealing");
  computerHand.classList.remove("revealing");
}

function highlightWinner(result) {
  const playerHand = document.getElementById("playerHand");
  const computerHand = document.getElementById("computerHand");

  // Remove any existing winner class
  playerHand.classList.remove("winner");
  computerHand.classList.remove("winner");

  if (result === "You win") {
    playerHand.classList.add("winner");
  } else if (result === "You lost") {
    computerHand.classList.add("winner");
  }

  // Remove winner class after animation
  setTimeout(() => {
    playerHand.classList.remove("winner");
    computerHand.classList.remove("winner");
  }, 1000);
}

function updateScore(playerMove, computerMove, result) {
  const updateScore = document.querySelector(".update-score");
  if (updateScore) {
    updateScore.innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}. ${result} <br>
    Wins: ${score.win}, Losses: ${score.loss}, Ties: ${score.tie}`;

    // Add result-based styling
    updateScore.className = "update-score";
    if (result === "You win") {
      updateScore.classList.add("win");
    } else if (result === "You lost") {
      updateScore.classList.add("lose");
    } else if (result === "tie") {
      updateScore.classList.add("tie");
    }

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

async function playerGame(playerMove) {
  if (isAnimating) return;

  isAnimating = true;
  const computerMove = pickComputerMove();
  let result = "";

  // Disable buttons during animation
  document.querySelectorAll(".game-button").forEach((btn) => {
    btn.disabled = true;
  });

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

  // Run animations
  await animateCountdown();
  await animateHands(playerMove, computerMove);

  // Highlight winner and update score
  highlightWinner(result);
  updateScore(playerMove, computerMove, result);

  // Re-enable buttons
  setTimeout(() => {
    document.querySelectorAll(".game-button").forEach((btn) => {
      btn.disabled = false;
    });
    isAnimating = false;

    // Reset hands to default after delay
    setTimeout(() => {
      document.getElementById("playerHand").innerHTML =
        '<i class="fas fa-hand-fist"></i>';
      document.getElementById("computerHand").innerHTML =
        '<i class="fas fa-hand-fist"></i>';
    }, 3000);
  }, 1000);
}

function resetGame() {
  if (isAnimating) return;

  score.win = 0;
  score.loss = 0;
  score.tie = 0;
  const messageElement = document.querySelector(".delete-result");

  // Reset hand displays
  document.getElementById("playerHand").innerHTML =
    '<i class="fas fa-hand-fist"></i>';
  document.getElementById("computerHand").innerHTML =
    '<i class="fas fa-hand-fist"></i>';

  // Clear any animations
  document.getElementById("playerHand").className = "hand-icon player";
  document.getElementById("computerHand").className = "hand-icon computer";

  if (messageElement) {
    messageElement.innerHTML =
      "The game has been reset. Let's start the game over!";
    messageElement.style.display = "block";
  }
  setTimeout(function () {
    messageElement.style.display = "none";
  }, 3000);
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
