const DISTANCE_FROM_SPRITE_TO_TEXT = 8;
const COLOR_OF_CURRENT_CHARACTER = '#ff00ff';
const COLOR_OF_REGULAR_CHARACTER = '#000000';
const BASE_Y_SPEED = 30;
const CONSTANT_SPEED_INSTRUCTION_ENEMY = 30;

export default class Enemy {

  constructor(game, state, text, x, y) {
    this.game = game;
    this.state = state;
    this.originalText = text;
    this.position = new Phaser.Point(x, y);
    this.lives = text.replace(/ /g, '').length;
    this._indexOffirstAliveChar = 0;
  }

  preload() {
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

  get spriteImage() {
    // abstract method
    return 'null';
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
    // wanted to call this.sprite.destroy() instead of .kill(),
    // but it was raising an exception
    this.sprite.parent.remove(this.sprite, false);
    this.sprite.kill();
  }

  hitByTorpedo(destroyedCallback, context) {
    this.lives--;
    return this.lives <= 0;
  }
}


export class InstructionEnemy extends Enemy {
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

  get spriteImage() {
    return 'enemy-instruction';
  }

  get type() {
    return 'instruction';
  }

  get torpedoType() {
    return 'laser';
  }
}

export class ConsoleEnemy extends Enemy {
  defineSpeed() {
    // speed towards player
    let xDistanceToPlayer = this.state.player.sprite.x - this.position.x;
    let yDistanceToPlayer = this.state.player.sprite.y - this.position.y;

    let ySpeed = BASE_Y_SPEED * this.speedMultiplier;
    let timeToImpact = yDistanceToPlayer/ySpeed;
    let xSpeed = xDistanceToPlayer / timeToImpact;
    this.sprite.body.velocity.x = xSpeed;
    this.sprite.body.velocity.y = ySpeed;
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

  get speedMultiplier() {
    return this._speedMultiplier || 1;
  }

  set speedMultiplier(mul) {
    this._speedMultiplier = mul;
  }
}
