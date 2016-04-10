const DISTANCE_FROM_SPRITE_TO_TEXT = 5;
const COLOR_OF_CURRENT_CHARACTER = '#ff00ff';
const COLOR_OF_REGULAR_CHARACTER = '#000000';
const DEFAULT_Y_SPEED = 80;

export default class Enemy {

  constructor(game, state, text, size) {
    this.game = game;
    this.state = state;
    this.originalText = text;
    this.lives = text.replace(/ /g, '').length;
    this.size = size;
    this._indexOffirstAliveChar = 0;
  }

  preload() {
  }

  create(x, y) {
    this.sprite = this.game.add.sprite(x, y, 'enemy-console');
    this.sprite.entity = this;
    this.state.enemies.add(this.sprite);

    this.textContent = this.game.add.text(
      this.sprite.width/2, this.sprite.height + DISTANCE_FROM_SPRITE_TO_TEXT,
      this.originalText);
    this.textContent.anchor.setTo(0.5, 0.5);
    this.sprite.addChild(this.textContent);

    this.textContent.font = 'Ubuntu Mono';
    this.textContent.fontSize = 12;
    this.textContent.fill = COLOR_OF_REGULAR_CHARACTER;

    // speed towards player
    let xDistanceToPlayer = this.state.player.sprite.x - x;
    let yDistanceToPlayer = this.state.player.sprite.y - y;

    let ySpeed = DEFAULT_Y_SPEED;
    let timeToImpact = yDistanceToPlayer/ySpeed;
    let xSpeed = xDistanceToPlayer / timeToImpact;
    this.sprite.body.velocity.x = xSpeed;
    this.sprite.body.velocity.y = ySpeed;
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

  hitByTorpedo() {
    this.lives--;
    if (this.lives <= 0) {
      this.destroy();
    }
  }
}
