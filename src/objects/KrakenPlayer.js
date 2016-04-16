const KRAKEN_DIMENSIONS = { width: 56, height: 100 };
const KRAKEN_BODY_DIMENSIONS = { width: 40, height: 40, offsetY: -12 }
const LIFE_ICON_DIMENSIONS = { width: 16, height: 16 };
const LIFE_ICON_MARGIN = { right: 10, bottom: 13, between: 2 };
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
    this.game.load.spritesheet(
      'kraken-particles',
      'imgs/kraken-particles.png',
      1,
      1);
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

    // y yoyo movement
    this.floatingTween = this.game.add.tween(this.sprite);
    this.floatingTween.to({ y: this.sprite.y-5 }, 350, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

    // life icons
    this.lives.create();

    // particles
    this.emitter = this.game.add.emitter(0, 0, 250);
    this.emitter.makeParticles('kraken-particles', [0,1,2,3,4]);
    this.sprite.addChild(this.emitter);
    this.emitter.gravity = 400;
    this.emitter.x = 0;
    this.emitter.y = this.sprite.height*0.25;
    this.emitter.alpha = 0.7;
    this.emitter.width = this.sprite.width*0.5;
    this.emitter.minParticleSpeed = new Phaser.Point(-30, 10);
    this.emitter.maxParticleSpeed = new Phaser.Point(+30, 10);
  }

  render() {
  }

  playSwimming() {
    let duration = 1800;
    let timeBegin = this.game.time.time;

    // particles - start emitting
    this.emitter.start(false, 1000, 10);

    // movement - going up in 2 steps
    this.floatingTween.pause();
    let tween1 = this.game.add.tween(this.sprite);
    let tween2 = this.game.add.tween(this.sprite);
    let tween3 = this.game.add.tween(this.sprite);
    tween1.to({ y: this.game.world.height*0.5 }, duration/3, Phaser.Easing.Quadratic.Out, true);
    tween2.to({ y: -0.5*this.sprite.height }, duration/4, Phaser.Easing.Quadratic.Out, false);
    tween3.to({ y: this.game.world.height - 50 }, duration/5, Phaser.Easing.Quadratic.Out, false);

    tween2.onComplete.addOnce(() => {
      this.sprite.y = this.game.world.height + this.sprite.height/2;
    }, this);
    tween3.onComplete.addOnce(() => {
      this.floatingTween.resume();
    }, this);
    tween1.chain(tween2.chain(tween3));

    // animation - playing 3 anims in sequence
    let emitter = this.emitter;
    this.sprite.animations.play('goingToSwim').onComplete.addOnce(sprite => {
      sprite.animations.play('swimming').onLoop.add(sprite => {
        let timeNow = this.game.time.time;
        if (timeNow >= timeBegin + duration) {
          sprite.animations.play('stoppingToSwim');
          emitter.on = false;
        }
      });
    });
  }

  hit(gameOverCallback, context) {
    if (--this.lives.value <= 0) {
      gameOverCallback.call(context);
      return true;
    }
    return false;
  }

  wrongKeyPressed() {
    this.sprite.colorBlendStep = 0;
    this.sprite.tint = 0xff3366;
    this.game.add.tween(this.sprite)
      .to({ colorBlendStep: 100 }, 200, Phaser.Easing.Linear.None, false)
      .onUpdateCallback(() => {
           this.sprite.tint = Phaser.Color.interpolateColor(
             0xff3366, 0xffffff, 100, this.sprite.colorBlendStep, 1);
       })
       .start();
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
