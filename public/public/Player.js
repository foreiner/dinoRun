class Player {
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  dinoRunImages = [];

  //점프 상태값
  keyW = false;
  keyA = false;
  keyS = false;
  keyD = false;
  mouseMoved = false;
  mouseX = 0;
  mouseY = 0;

  serveruploadinterval = 100;
  lastsendtime = 0;

  MOVE_SPEED = 0.4;
  moveVector = [0, 0];

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

    // 키보드, 마우스스 설정
    // 등록된 이벤트가 있는 경우 삭제하고 다시 등록
    document.removeEventListener('mousemove', this.mousemove);
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);

    document.addEventListener('mousemove', this.mousemove);
    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);
  }

  keydown = (event) => {
    this.mouseMoved = false;
    if (event.code === 'KeyW') {
      this.keyW = true;
      this.keyS = false;
    } else if (event.code === 'KeyS') {
      this.keyS = true;
      this.keyW = false;
    } else if (event.code === 'KeyA') {
      this.keyA = true;
      this.keyD = false;
    } else if (event.code === 'KeyD') {
      this.keyD = true;
      this.keyA = false;
    }
  };

  keyup = (event) => {
    if (event.code === 'KeyW') {
      this.keyW = false;
    } else if (event.code === 'KeyS') {
      this.keyS = false;
    } else if (event.code === 'KeyA') {
      this.keyA = false;
    } else if (event.code === 'KeyD') {
      this.keyD = false;
    }
  };

  mousemove = (event) => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;


    const message = document.getElementById('inputCheckA');


    if (this.mouseX >= 0 && this.mouseX <= this.canvas.width && this.mouseY >= 0 && this.mouseY <= this.canvas.height) {
        this.mouseMoved = true;
    }
    else{

    }
  };

  update(gameSpeed, deltaTime) {
    this.run(gameSpeed, deltaTime);

    if (this.jumpInProgress) {
      this.image = this.standingStillImage;
    }

    this.move(deltaTime);
  }
  getposition(){
    return {x: this.x, y:this.y};
  }

  move(deltaTime) {
    if(this.mouseMoved){
        if (this.mouseY < this.y-1) {
          this.keyW = true;
          this.keyS = false;
        } else if (this.mouseY > this.y+1) {
          this.keyS = true;
          this.keyW = false;
        }
        else{
            this.keyW = false;
            this.keyS = false;
        }
        
        if (this.mouseX < this.x-1) {
          this.keyA = true;
          this.keyD = false;
        } else if (this.mouseX > this.x+1) {
          this.keyD = true;
          this.keyA = false;
        }
        else{
            this.keyA = false;
            this.keyD = false;
        }
    }


    if (this.keyW || this.keyA || this.keyS || this.keyD) {
      this.y -= (this.keyW * 1 + this.keyS * -1) * this.MOVE_SPEED * this.yMovement * deltaTime * this.scaleRatio;
      this.x -= (this.keyA * 1 + this.keyD * -1) * this.MOVE_SPEED * this.xMovement * deltaTime * this.scaleRatio;
      if(this.y < 0) this.y = 0;
      else if(this.y > this.canvas.height - this.height) this.y = this.canvas.height - this.height;
      if(this.x < 0) this.x = 0;
      else if(this.x > this.canvas.width - this.width) this.x = this.canvas.width - this.width;
    }
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
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export default Player;
