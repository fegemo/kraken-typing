export default class BootState extends Phaser.State {
  preload() {
    this.game.stage.backgroundColor = '#fff';

    this.game.load.image('preload-bar', 'imgs/preload-bar.png');
    this.game.load.image('preload-bar-border', 'imgs/preload-bar-border.png');
    this.game.load.image('logo-text', 'imgs/trio-ternura-studios.png');
    this.game.load.image('logo-ball1', 'imgs/logo-ball1.png');
    this.game.load.image('logo-ball2', 'imgs/logo-ball2.png');
    this.game.load.image('logo-ball3', 'imgs/logo-ball3.png');
  }

  create() {
    this.game.state.start('splash');
  }
}
