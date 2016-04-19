const DISTANCE_FROM_SPRITE_TO_TEXT = 8;
const COLOR_OF_CURRENT_CHARACTER = '#ff00ff';
const COLOR_OF_REGULAR_CHARACTER = '#000000';
const BASE_Y_SPEED = 30;
const CONSTANT_SPEED_INSTRUCTION_ENEMY = 30;

export default class Enemy {

  constructor(game, state, text, x, y, name) {
    this.game = game;
    this.state = state;
    this.originalText = text;
    this.position = new Phaser.Point(x, y);
    this.name = name;
    this.lives = text.replace(/ /g, '').length;
    this.baseYSpeed = BASE_Y_SPEED / Math.max(1,Math.floor(this.lives/3))
    this._indexOffirstAliveChar = 0;
    this.uponDeath = function() {};
  }

  static preload(game) {
    // console & instruction enemy
    game.load.image('enemy-console', 'imgs/enemy-console.png');
    game.load.image('enemy-instruction', 'imgs/enemy-instruction.png');
    game.load.image('flare', 'imgs/flare.png');
    game.load.image('console-piece', 'imgs/console-piece.png');
    // git enemy
    game.load.image('enemy-git', 'imgs/enemy-git.png');
    game.load.spritesheet('star-particles', 'imgs/star-particles.png', 20, 24);
    game.load.image('git-piece', 'imgs/git-piece.png');
  }

  create() {
    this.sprite = this.game.add.sprite(this.position.x, this.position.y, this.spriteImage);
    this.sprite.anchor.setTo(0.5, 1);
    this.sprite.entity = this;
    this.state.enemies.add(this.sprite);

    this.textContent = this.game.add.text(
      0, DISTANCE_FROM_SPRITE_TO_TEXT,
      this.originalText);
    this.textContent.anchor.setTo(0.5, 0.5);
    this.sprite.addChild(this.textContent);

    this.textContent.font = 'Ubuntu Mono';
    this.textContent.fontSize = 12;
    this.textContent.fill = COLOR_OF_REGULAR_CHARACTER;

    this.defineSpeed();
  }

  update() {

  }

  defineSpeed() {
    // abstract method
  }

  deathAnimation() {
    // abstract method
  }

  hitAnimation() {
    // abstract method;
  }

  get spriteImage() {
    // abstract method
    return 'null';
  }

  get torpedoSoundSprite() {
    // abstract
    return 'null';
  }

  get explosionSoundSprite() {
    // abstract
    return 'null';
  }

  wrongKeyPressed() {
    this.game.add.tween(this.textContent.scale)
      .from({ x: 1.45, y: 1.45 }, 100, Phaser.Easing.Quadratic.Out, 0)
      .start();
  }

  get hasMoreChars() {
    return this._indexOffirstAliveChar < this.originalText.length;
  }

  get currentChar() {
    return this.originalText[this._indexOffirstAliveChar];
  }

  killChar() {
    // updates the index that points to the first alive character
    while (this.originalText[++this._indexOffirstAliveChar] === ' ');

    // updates the text by replacing killed chars with spaces
    this.textContent.text = this.originalText.replace(
      this.originalText.substr(0, this._indexOffirstAliveChar),
      ' '.repeat(this._indexOffirstAliveChar));

    // updates the colors so the first alive char has a different color
    this.textContent.addColor(COLOR_OF_CURRENT_CHARACTER, this._indexOffirstAliveChar);
    this.textContent.addColor(COLOR_OF_REGULAR_CHARACTER, this._indexOffirstAliveChar+1);

    return !this.hasMoreChars;
  }

  destroy() {
    while (this.hasMoreChars) {
      this.killChar();
    }
    this.textContent.destroy();

    // calls the anim for death - leaves for child classes to implement
    this.deathAnimation(() => {
      // the enemy might have something to do upon its death
      this.uponDeath();

      // wanted to call this.sprite.destroy() instead of .kill(),
      // but it was raising an exception
      this.sprite.parent.remove(this.sprite, false);
      this.sprite.kill();
    }, this);
  }

  hitByTorpedo(destroyedCallback, context) {
    this.lives--;
    this.hitAnimation();
    return this.lives <= 0;
  }
}


export class InstructionEnemy extends Enemy {

  create() {
    super.create();
    this.flare = this.game.add.emitter(0, 0, 10);
    this.flare.makeParticles('flare', 0);
    this.flare.gravity = 150;
    this.flare.y = -this.sprite.height/2;
    this.flare.setAlpha(0.4, 0, 800);
    this.flare.minParticleSpeed = new Phaser.Point(-300, -50);
    this.flare.maxParticleSpeed = new Phaser.Point(+300, +50);
  }

  defineSpeed() {
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = CONSTANT_SPEED_INSTRUCTION_ENEMY*4;
  }

  update() {
    super.update();
    if (this.sprite.body.velocity.y > CONSTANT_SPEED_INSTRUCTION_ENEMY) {
      this.sprite.body.velocity.y--;
    }
  }

  deathAnimation(onCompleteCallback, context) {
    var expandTween = this.game.add.tween(this.sprite.scale);
    var contractTween = this.game.add.tween(this.sprite.scale);

    expandTween.to({ x: 2, y: 0.25 }, 150, Phaser.Easing.Quadratic.Out);
    contractTween.to({ x: 0.1, y: 1.5 }, 75, Phaser.Easing.Quadratic.Out);
    contractTween.onComplete.addOnce(() => {
      this.flare.start(true, 800, null, 10);
      onCompleteCallback.call(context);
    });

    this.flare.x = this.sprite.x;
    this.flare.y = this.sprite.y;
    expandTween.chain(contractTween).start();
  }

  get spriteImage() {
    return 'enemy-instruction';
  }

  get type() {
    return 'instruction';
  }

  get torpedoType() {
    return 'laser';
  }

  get torpedoSoundSprite() {
    return 'laserX';
  }

  get explosionSoundSprite() {
    return 'disappearingX';
  }
}

export class ConsoleEnemy extends Enemy {

  create() {
    super.create();
    // console pieces emitter
    this.flare = this.game.add.emitter(0, 0, this.lives*2+15);
    this.flare.makeParticles(this.explosionSpriteImage, 0);
    this.flare.gravity = 150;
    this.flare.y = -this.sprite.height/2;
    this.flare.setAlpha(1.0, 0, 800);
    this.flare.minParticleSpeed = new Phaser.Point(-120, -150);
    this.flare.maxParticleSpeed = new Phaser.Point(+120, -50);
  }

  defineSpeed() {
    // speed towards player
    let xDistanceToPlayer = this.state.player.sprite.x - this.position.x;
    let yDistanceToPlayer = this.state.player.sprite.y - this.position.y;

    let ySpeed = this.baseYSpeed * this.speedMultiplier;
    let timeToImpact = yDistanceToPlayer/ySpeed;
    let xSpeed = xDistanceToPlayer / timeToImpact;
    this.sprite.body.velocity.x = xSpeed;
    this.sprite.body.velocity.y = ySpeed;
  }

  deathAnimation(onCompleteCallback, context) {
    this.flare.x = this.sprite.x;
    this.flare.y = this.sprite.y;
    this.flare.start(true, 800, null, 10);
    if (onCompleteCallback) {
      onCompleteCallback.call(context);
    }
  }

  hitAnimation() {
    for (let i = this.game.rnd.between(1,2); i > 0; i--) {
      this.flare.emitParticle(this.sprite.x, this.sprite.y - this.sprite.height/2);
    }
  }

  get spriteImage() {
    return 'enemy-console';
  }

  get type() {
    return 'console';
  }

  get torpedoType() {
    return 'torpedo';
  }

  get explosionSpriteImage() {
    return 'console-piece';
  }

  get torpedoSoundSprite() {
    return 'torpedoX';
  }

  get explosionSoundSprite() {
    return 'explosionX';
  }

  get speedMultiplier() {
    return this._speedMultiplier || 1;
  }

  set speedMultiplier(mul) {
    this._speedMultiplier = mul;
  }
}

export class GitEnemy extends ConsoleEnemy {

  create() {
    this.baseYSpeed = BASE_Y_SPEED / 2;
    super.create();
    this.sprite.scale.setTo(1.25, 1.25);
    this.stars = this.game.add.emitter(0, 0, 30);
    this.sprite.addChild(this.stars);
    this.stars.makeParticles('star-particles', [0,1,2,3,4,5,6,7]);
    this.stars.setAlpha(0.55, 0, 700);
    this.stars.minParticleScale = 0.5;
    this.stars.maxParticleScale = 1.0;
    this.stars.minParticleSpeed.setTo(0, -80);
    this.stars.maxParticleSpeed.setTo(0, -120);

    this.stars.start(false, 700, 100, 0);
  }

  get spriteImage() {
    return 'enemy-git';
  }

  get torpedoType() {
    return 'big-boy';
  }

  get torpedoSoundSprite() {
    return 'torpedoX';
  }

  get explosionSoundSprite() {
    // abstract
    return 'star';
  }

  get explosionSpriteImage() {
    return 'git-piece';
  }

  get speedMultiplier() {
    // it is always 1 for git enemies
    return 1;
  }

  set speedMultiplier(mul) {
    // it is always 1 for git enemies
    this._speedMultiplier = 1;
  }
}
