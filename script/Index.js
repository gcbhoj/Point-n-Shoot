import { Game } from "./Game.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas1");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const gameStartButton = document.getElementById("gameStartButton");
  const restartGameButton = document.getElementById("restartGame");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const gameOverScreen = document.getElementById("gameOverScreen");

  let game = null; // To hold the game instance

  // Start game
  gameStartButton.addEventListener("click", () => {
    if (!game) {
      welcomeScreen.style.display = "none";
      canvas.style.display = "block";

      game = new Game(canvas, () => {
        canvas.style.display = "none";
        gameOverScreen.style.display = "block";
        game = null; // reset for replay
      });
    }
  });

  // Restart game
  if (restartGameButton) {
    restartGameButton.addEventListener("click", () => {
      gameOverScreen.style.display = "none";
      canvas.style.display = "block";

      game = new Game(canvas, () => {
        canvas.style.display = "none";
        gameOverScreen.style.display = "block";
        game = null;
      });
    });
  }
  // Slider to get rating review from player
  const slider = document.getElementById("favoriteRating");
  const ratingDisplay = document.getElementById("ratingDisplay");

  // Set default values
  ratingDisplay.value = slider.value;

  // Update values when slider is used
  slider.oninput = function () {
    ratingDisplay.value = this.value;
  };
});
