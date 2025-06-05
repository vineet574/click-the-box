const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const highScoreDisplay = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const difficultySelect = document.getElementById("difficulty");
const finalScoreDisplay = document.getElementById("finalScore");
const clickSound = document.getElementById("clickSound");
const endSound = document.getElementById("endSound");

let score = 0;
let highScore = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;
let isPaused = false;
let gameSpeed = 800;

function moveBox() {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
  box.style.backgroundColor = getRandomColor();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let c = '#';
  for (let i = 0; i < 6; i++) {
    c += letters[Math.floor(Math.random() * 16)];
  }
  return c;
}

function countdown(callback) {
  let count = 3;
  timerDisplay.textContent = `Starting in ${count}`;
  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      timerDisplay.textContent = `Starting in ${count}`;
    } else {
      clearInterval(interval);
      callback();
    }
  }, 1000);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  finalScoreDisplay.textContent = '';
  gameSpeed = parseInt(difficultySelect.value);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  isPaused = false;

  countdown(() => {
    box.style.display = "block";
    gameInterval = setInterval(moveBox, gameSpeed);
    timerInterval = setInterval(() => {
      if (!isPaused) {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
          endGame();
        }
      }
    }, 1000);
  });
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  box.style.display = "none";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  finalScoreDisplay.textContent = `🎯 Final Score: ${score}`;
  endSound.play();
  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
    alert("🎉 New High Score!");
  } else {
    alert("⏱ Time's up!");
  }
}

box.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveBox();
  clickSound.play();
});

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
});

startBtn.addEventListener("click", startGame);

// Initialize
box.style.display = "none";
pauseBtn.disabled = true;
