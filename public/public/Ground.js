class Ground {
  constructor(ctx, width, height, speed, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.x = 0;
    this.y = this.canvas.height - this.height;

    this.groundImage = new Image();
    this.groundImage.src = 'images/ground.png';
  }

  update(gameSpeed, deltaTime) {
    this.x -= gameSpeed * deltaTime * this.speed * this.scaleRatio;
  }

  draw() {
    for (let i = 0; i < 5; i++) {
      this.ctx.globalAlpha = 1 - 0.15 * i; // 투명도 설정 (0.5는 50% 투명)
      const adjustedX = this.x - 500 * i;
      const adjustedY = this.y - (this.height + 10) * i;
      this.ctx.drawImage(this.groundImage, adjustedX, adjustedY, this.width, this.height);

      this.ctx.drawImage(
        this.groundImage,
        // 2개 연결
        adjustedX + this.width,
        adjustedY,
        this.width,
        this.height,
      );
    }
    this.ctx.globalAlpha = 1;

    // 땅이 끝났을 때 처음으로
    if (this.x < -this.width) {
      this.x = 0;
    }
  }

  reset() {
    this.x = 0;
  }
}

export default Ground;
