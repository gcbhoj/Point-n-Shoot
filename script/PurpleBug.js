export class Enemy {
  constructor(game) {
    this.game = game;
    this.width = 92;
    this.height = 100;
    this.x = this.game.canvas.width;
    this.y = Math.random() * (this.game.canvas.height - this.height);
    this.speedX = Math.random() * 5+1 ;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = "images/purplebug.png"; // ✅ Corrected path
    this.frameX = 0;
    this.maxFrame = 5; // 0 to 5 = 6 frames
    this.frameInterval = 100; // ms between frames
    this.frameTimer = 0;
  }

  update(deltaTime) {
    this.x -= this.speedX;
    if (this.x + this.width < 0) this.markedForDeletion = true;

    // animate frame
    if (this.frameTimer > this.frameInterval) {
      this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(ctx) {
    if (this.image.complete && this.image.naturalWidth !== 0) {
      ctx.drawImage(
        this.image,
        this.frameX * this.width,
        0, // sx, sy
        this.width,
        this.height, // sWidth, sHeight
        this.x,
        this.y, // dx, dy
        this.width,
        this.height // dWidth, dHeight
      );
    } else {
      // fallback while image not loaded
      ctx.fillStyle = "purple";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  contains(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
