import Cactus from "./Cactus.js";

class CactiController {


    cacti = [];


    constructor(ctx, cactiImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.cactiImages = cactiImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    makeOne(height) {
        const index = this.getRandomNumber(0, this.cactiImages.length - 1);
        const cactusImage = this.cactiImages[index];
        const x = this.canvas.width * 1.5;
        const y = ((10, this.canvas.height - cactusImage.height) / 5) * height;
    
        const cactus = new Cactus(
            this.ctx,
            x,
            y,
            cactusImage.width,
            cactusImage.height,
            cactusImage.image
        );
    
        this.cacti.push(cactus);
      }

    update(gameSpeed, deltaTime) {

        this.cacti.forEach((cactus) => {
            cactus.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
        })

        // 지나간 선인장 삭제
        this.cacti = this.cacti.filter(cactus => cactus.x > -cactus.width);
    }

    draw() {
        this.cacti.forEach((cactus) => cactus.draw());
    }

    collideWith(sprite) {
        return this.cacti.some(cactus => cactus.collideWith(sprite));
    }

    reset() {
        this.cacti = [];
    }
}

export default CactiController;