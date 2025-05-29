const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const highScoreDisplay = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");

let score = 0;
let highScore = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

function moveBox() {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  startBtn.disabled = true;
  box.style.display = "block";

  gameInterval = setInterval(moveBox, 800);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(timerInterval);
      box.style.display = "none";
      startBtn.disabled = false;
      if (score > highScore) {
        highScore = score;
        highScoreDisplay.textContent = highScore;
        alert("🎉 New High Score!");
      } else {
        alert("⏱ Time's up!");
      }
    }
  }, 1000);
}

box.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveBox();
});

startBtn.addEventListener("click", startGame);

// Initialize
box.style.display = "none";
