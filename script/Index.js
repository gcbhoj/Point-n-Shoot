import { Game } from "./Game.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas1");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const gameStartButton = document.getElementById("gameStartButton");
  const restartGameButton = document.getElementById("restartGame");
  const welcomeScreen = document.getElementById("welcomeScreen");
  const gameOverScreen = document.getElementById("gameOverScreen");
  const baseUrl = "http://localhost:5000/api";

  let game = null; // To hold the game instance

  let startTime;
  let endTime;
  let totalTimeSpent;

  // Start game
  gameStartButton.addEventListener("click", () => {
    if (!game) {
      startTime = new Date().getTime();
      welcomeScreen.style.display = "none";
      canvas.style.display = "block";

      game = new Game(canvas, () => {
        endTime = new Date().getTime();

        totalTimeSpent = ((endTime - startTime) / 60000).toFixed(2);

        console.log("Total Time Spent:", totalTimeSpent, "minutes");
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
      sendGameData();
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

  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get("gameId");
  const userId = urlParams.get("userId");

  // function to set isfavorite to true or false

  function sendGameData() {
    const score = document.getElementById("actualScoreDisplay").value;
    const rating = document.getElementById("ratingDisplay").value;

    const favoriteRadio = document.querySelector(
      'input[name="isFavorite"]:checked'
    );
    const isFavorite = favoriteRadio
      ? favoriteRadio.value === "true"
      : undefined;

    const gameData = {
      gameId: gameId,
      userId: userId,
      score: parseFloat(score),
      playTime: totalTimeSpent,
      rating: parseFloat(rating),
      isFavorite: isFavorite,
    };

    if (!userId) {
      return console.log("GameData", gameData);
    }

    fetch(`${baseUrl}/gamesData/addNew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Server response:", data))
      .catch((err) => console.error("Error sending game data:", err));
  }
});
