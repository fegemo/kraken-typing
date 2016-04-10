const KRAKEN_DIMENSIONS = { width: 56, height: 100 };
const KRAKEN_BODY_DIMENSIONS = { width: 40, height: 40, offsetY: -12 }
const LIFE_ICON_DIMENSIONS = { width: 16, height: 16 };
const LIFE_ICON_MARGIN = { right: 10, bottom: 10, between: 2 };
const INITIAL_LIVES = 3;

export default class KrakenPlayer {

  constructor(game) {
    this.game = game;
    this.lives = new Lives(this.game);
  }

  preload() {
    this.game.load.spritesheet(
      'kraken',
      'imgs/kraken-sprite.png',
      KRAKEN_DIMENSIONS.width,
      KRAKEN_DIMENSIONS.height);

    this.lives.preload();
  }

  create() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    this.sprite = this.game.add.sprite(worldWidth/2, worldHeight-50, 'kraken');
    this.sprite.entity = this;
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.setSize(
      KRAKEN_BODY_DIMENSIONS.width,
      KRAKEN_BODY_DIMENSIONS.height,
      0,
      KRAKEN_BODY_DIMENSIONS.offsetY
    );

    // animations
    var goingToSwim = this.sprite.animations.add('goingToSwim', [0, 1, 2, 3], 20, false);
    var swimming = this.sprite.animations.add('swimming', [4, 5], 5, true);
    var stoppingToSwim = this.sprite.animations.add('stoppingToSwim', [4, 5, 1, 0], 20, false);

    goingToSwim.onComplete.add((sprite, animation) => {
      sprite.animations.play('swimming');
    });
    swimming.onLoop.add((sprite, animation) => {
      if (animation.loopCount === 5) {
        sprite.animations.play('stoppingToSwim');
      }
    });

    // y yoyo movement
    this.floatingTween = this.game.add.tween(this.sprite);
    this.floatingTween.to({ y: this.sprite.y-5 }, 350, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

    // life icons
    this.lives.create();
  }

  playSwimming() {
    this.sprite.animations.play('goingToSwim');
  }

  hit() {
    this.lives.value--;
  }
}


class Lives {
  constructor(game) {
    this.game = game;
    this._value = INITIAL_LIVES;
  }

  preload() {
    this.game.load.spritesheet(
      'life',
      'imgs/life.png',
      LIFE_ICON_DIMENSIONS.width,
      LIFE_ICON_DIMENSIONS.height);
  }

  create() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    // creates a # of icons equal to INITIAL_LIVES and positions them
    this.lifeIcons = this.game.add.group();
    for (let i = 0; i < INITIAL_LIVES; i++) {
      let icon = this.game.add.sprite(
        worldWidth - LIFE_ICON_MARGIN.right - LIFE_ICON_DIMENSIONS.width/2 -
          i*(LIFE_ICON_DIMENSIONS.width + LIFE_ICON_MARGIN.between),
        worldHeight - LIFE_ICON_DIMENSIONS.height/2 - LIFE_ICON_MARGIN.bottom,
        'life');
      icon.anchor.setTo(0.5, 0.5);

      this.lifeIcons.add(icon);
    }
  }

  set value(v) {
    this._value = v;

    // sets the frame of the icons according to the number of lives
    this.lifeIcons.forEachExists(icon => {
      let i = this.lifeIcons.getIndex(icon);
      icon.frame = (i+1) > this._value ? 1 : 0;
    }, this);
  }
  get value() {
    return this._value;
  }
}
