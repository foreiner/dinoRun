import { sendEvent } from './Socket.js';

class Score {
  score = 0;
  stage = 1;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = true;
  ELIMINATED_FLAG = false;

  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }
  ELIMINATED() {
    this.ELIMINATED_FLAG = true;
  }

  update(deltaTime) {
    if (this.ELIMINATED_FLAG) return;
    
    this.score += deltaTime * 0.001;
  }

  getItem(itemId) {
    if (this.ELIMINATED_FLAG) return;
    sendEvent(4, { itemId: itemId });
    this.score += itemId * 10;
  }

  reset() {
    this.ELIMINATED_FLAG = false;
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getScore() {
    return this.score;
  }

  setStage(stage){
    this.stage = stage;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText('stage' + this.stage, 50, y);
    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }

}

export default Score;
