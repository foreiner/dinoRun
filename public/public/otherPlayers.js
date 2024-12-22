class OtherPlayer {
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  dinoRunImages = [];
  players = {};
  //점프 상태값
  MOVE_SPEED = 0.4;

  // 생성자
  constructor(ctx, width, height, xMovement, yMovement, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.xMovement = xMovement;
    this.yMovement = yMovement;
    this.scaleRatio = scaleRatio;

    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
    // 기본 위치 상수화
    this.yStandingPosition = this.y;

    this.standingStillImage = new Image();
    this.standingStillImage.src = 'images/standing_still.png';
    this.image = this.standingStillImage;

    // 달리기
    const dinoRunImage1 = new Image();
    dinoRunImage1.src = 'images/dino_run1.png';

    const dinoRunImage2 = new Image();
    dinoRunImage2.src = 'images/dino_run2.png';

    this.dinoRunImages.push(dinoRunImage1);
    this.dinoRunImages.push(dinoRunImage2);
  }
  addplayer(data) {
    this.players[data.uuid] = {
      X: data.data[0],
      Y: data.data[1],
    };
  }

  update(gameSpeed, deltaTime) {
    this.run(gameSpeed, deltaTime);

    this.move(deltaTime);
  }

  move(deltaTime) {
    
  }

  run(gameSpeed, deltaTime) {
    if (this.walkAnimationTimer <= 0) {
      if (this.image === this.dinoRunImages[0]) {
        this.image = this.dinoRunImages[1];
      } else {
        this.image = this.dinoRunImages[0];
      }
      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }

    this.walkAnimationTimer -= deltaTime * gameSpeed;
  }

  draw() {
    this.ctx.globalAlpha = 0.5; // 투명도 설정 (0.5는 50% 투명)
    Object.values(this.players).forEach(Element =>{
      this.ctx.drawImage(this.image, Element.X, Element.Y, this.width, this.height + 50);

    })
    this.ctx.globalAlpha = 1;
  }
}

export default OtherPlayer;
