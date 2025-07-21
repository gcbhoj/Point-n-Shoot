import { Game } from "./Game.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas1");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const welcomeScreen = document.getElementById("welcomeScreen");
  let game; // To hold the game instance

window.addEventListener("click", (e) => {
  const button = e.target.closest("#gameStartButton");
  if (button && !game) {
    welcomeScreen.style.display = "none";
    canvas.style.display = "block";

    game = new Game(canvas, () => {
      canvas.style.display = "none";
      welcomeScreen.style.display = "block";
      game = null; // reset for replay
    });

    console.log("Game started");
  }
});

});
