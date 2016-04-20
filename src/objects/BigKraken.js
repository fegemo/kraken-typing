const BIG_KRAKEN_DIMENSIONS = { width: 400, height: 350 };

export default class BigKraken {
  constructor(game) {
    this.game = game;
  }

  preload() {
    this.game.load.spritesheet('big-kraken', 'imgs/big-kraken.png',
      BIG_KRAKEN_DIMENSIONS.width, BIG_KRAKEN_DIMENSIONS.height);
    this.game.load.image('bubble', 'imgs/bubble.png');
  }

  create() {
    this.sprite = this.game.add.sprite(
      this.game.world.width+BIG_KRAKEN_DIMENSIONS.width/2,
      this.game.world.height+BIG_KRAKEN_DIMENSIONS.height/2,
      'big-kraken');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.tint = 0xbbbbbb;
    this.bubbles = this.game.add.emitter(0, 0, 8);
    this.bubbles.setAlpha(0.7, 0, 1000);
    this.bubbles.minParticleScale = 0.4;
    this.bubbles.maxParticleScale = 1.0;
  }

  render() {

  }

  update() {

  }

  appear(from) {
    var initialPositionX, initialPositionY,
      targetPositionX, targetPositionY,
      floatingOffsetX, floatingOffsetY,
      angle,
      bubblePositionX, bubblePositionY;
    let appearTween = this.game.add.tween(this.sprite);
    let disappearTween = this.game.add.tween(this.sprite);
    let hoveringTween = this.game.add.tween(this.sprite);
    this.sprite.frame = 0;
    //TODO: refactor lotsa code here...
    // - get angle from Math.atan2
    // - mirror right/left, top/bottom values
    // - remove magic numbers for durations
    switch (from) {
      case 'bottom right':
        initialPositionX = this.game.world.width + BIG_KRAKEN_DIMENSIONS.width/2;
        initialPositionY = this.game.world.height + BIG_KRAKEN_DIMENSIONS.height/2;
        targetPositionX = this.game.world.width - BIG_KRAKEN_DIMENSIONS.width*0.25;
        targetPositionY = this.game.world.height - BIG_KRAKEN_DIMENSIONS.height*0.25;
        floatingOffsetX = this.game.world.width*(1/30);
        floatingOffsetY = this.game.world.height*(1/30);
        bubblePositionX = this.game.world.width;
        bubblePositionY = this.game.world.height;
        angle = -45;
        break;
      case 'bottom left':
        initialPositionX = -BIG_KRAKEN_DIMENSIONS.width/2;
        initialPositionY = this.game.world.height + BIG_KRAKEN_DIMENSIONS.height/2;
        targetPositionX = BIG_KRAKEN_DIMENSIONS.width*0.25;
        targetPositionY = this.game.world.height - BIG_KRAKEN_DIMENSIONS.height*0.25;
        floatingOffsetX = -this.game.world.width*(1/30);
        floatingOffsetY = this.game.world.height*(1/30);
        bubblePositionX = 0;
        bubblePositionY = this.game.world.height;
        angle = 45;
        break;
      case 'top right':
        initialPositionX = this.game.world.width + BIG_KRAKEN_DIMENSIONS.width/2;
        initialPositionY = -BIG_KRAKEN_DIMENSIONS.height/2;
        targetPositionX = this.game.world.width - BIG_KRAKEN_DIMENSIONS.width*0.25;
        targetPositionY = BIG_KRAKEN_DIMENSIONS.height*0.25;
        floatingOffsetX = this.game.world.width*(1/30);
        floatingOffsetY = -this.game.world.height*(1/30);
        bubblePositionX = this.game.world.width;
        bubblePositionY = 0;
        angle = -45*3;
        break;
      case 'top left':
        initialPositionX = -BIG_KRAKEN_DIMENSIONS.width/2;
        initialPositionY = -BIG_KRAKEN_DIMENSIONS.height/2;
        targetPositionX = BIG_KRAKEN_DIMENSIONS.width*0.25;
        targetPositionY = BIG_KRAKEN_DIMENSIONS.height*0.25;
        floatingOffsetX = -this.game.world.width*(1/30);
        floatingOffsetY = -this.game.world.height*(1/30);
        bubblePositionX = 0;
        bubblePositionY = 0;
        angle = 45*3;
        break;
    }
    this.sprite.x = initialPositionX;
    this.sprite.y = initialPositionY;
    this.sprite.angle = angle;
    appearTween.to({x: targetPositionX, y: targetPositionY},
      200, Phaser.Easing.Quadratic.Out, false);
    disappearTween.to({x: initialPositionX, y: initialPositionY},
      200, Phaser.Easing.Quadratic.In, false);
    hoveringTween.to({
      x: targetPositionX+floatingOffsetX,
      y: targetPositionY+floatingOffsetY
    }, 1000, Phaser.Easing.Quadratic.InOut, false, 0, 0, true);
    appearTween.chain(hoveringTween.chain(disappearTween)).start();

    // configures timer to change to frame of happy kraken
    this.game.time.events.add(1.25*1000, () => this.sprite.frame = 1, this);

    // configures/starts the bubble emitter
    this.bubbles.makeParticles('bubble');
    this.bubbles.gravity = -200;
    this.bubbles.x = bubblePositionX;
    this.bubbles.y = bubblePositionY;
    let baseBubbleSpeedX = targetPositionX - initialPositionX;
    let baseBubbleSpeedY = targetPositionY - initialPositionY;
    this.bubbles.minParticleSpeed.setTo(baseBubbleSpeedX/2, baseBubbleSpeedY/2);
    this.bubbles.maxParticleSpeed.setTo(baseBubbleSpeedX, baseBubbleSpeedY);
    this.bubbles.start(false, 1000, 45, 30);
  }
}
