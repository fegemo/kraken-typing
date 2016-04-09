export default class Ball {
  constructor(game, name, bezierPoints, tweenParams) {
    this.game = game;
    this.name = name;
    this.bezierPoints = bezierPoints;
    this.t = 0;
    this.tweenParams = tweenParams;
  }

  createPath() {
    this.path = [];

    const step = 1 / (this.game.width / 4);
    for (let i = 0; i <= 1; i += step) {
      let px = this.game.math.bezierInterpolation(this.bezierPoints.x, i);
      let py = this.game.math.bezierInterpolation(this.bezierPoints.y, i);
      this.path.push({
        x: px,
        y: py
      });
    }
  }

  create() {
    this.createPath();
    this.sprite = this.game.add.sprite(this.path[0].x, this.path[0].y, this.name);
    this.sprite.anchor.setTo(0.5, 0.5);

    this.tween = this.game.add.tween(this);
    this.tween.to({ t: 1 }, this.tweenParams.duration, Phaser.Easing.Quadratic.Out);
    this.tween.delay(this.tweenParams.start);
    this.tween.start();
  }

  update() {
    this.sprite.x = this.game.math.bezierInterpolation(this.bezierPoints.x, this.t);
    this.sprite.y = this.game.math.bezierInterpolation(this.bezierPoints.y, this.t);
  }
}
