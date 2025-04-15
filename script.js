const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
let score = 0;

function moveBox() {
  const x = Math.random() * (window.innerWidth - 50);
  const y = Math.random() * (window.innerHeight - 50);
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
}

box.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  moveBox();
});

moveBox();
