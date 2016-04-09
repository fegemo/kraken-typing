export default class Enemy {

  constructor(game, text, size) {
    this.game = game;
    this.text = text;
    this.size = size;
  }

  preload() {

  }

  create(x, y) {
    this.sprite = this.game.add.sprite(x, y, 'enemy-console');
  }

}
