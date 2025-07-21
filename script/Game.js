import { Enemy } from "./PurpleBug.js";
const actualScoreDisplay = document.getElementById("actualScoreDisplay")
export class Game {
  constructor(canvas, onGameOver) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.lastTime = 0;
    this.score = 0;
    this.gameOver = false;
    this.onGameOver = onGameOver;

    this.canvas.addEventListener("click", this.handleClick.bind(this));
    requestAnimationFrame(this.animate.bind(this));
  }

  handleClick(event) {
    const rect = this.canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    this.enemies.forEach((enemy) => {
      if (enemy.contains(clickX, clickY)) {
        enemy.markedForDeletion = true;
        this.score++;
      }
    });
  }

  update(deltaTime) {
    this.enemyTimer += deltaTime;
    if (this.enemyTimer > this.enemyInterval) {
      this.enemies.push(new Enemy(this));
      this.enemyTimer = 0;
    }

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.x + enemy.width < 0) {
        this.gameOver = true;
        actualScoreDisplay.value = this.score
      }
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));

    // Draw score
    this.ctx.fillStyle = "black";
    this.ctx.font = "30px Impact";
    this.ctx.fillText("Score: " + this.score, 20, 40);
  }

  animate(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.draw();
    if (!this.gameOver) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.ctx.fillStyle = "red";
      this.ctx.font = "40px Impact";
      this.ctx.fillText(
        "Game Over",
        this.canvas.width / 2 - 100,
        this.canvas.height / 2
      );

      if (this.onGameOver) this.onGameOver(); // notify main app
    }
  }
}
