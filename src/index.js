import MenuState from 'states/MenuState';
import GameState from 'states/GameState';
import SplashState from 'states/SplashState';

class Game extends Phaser.Game {

  constructor() {
    super(350, 600, Phaser.AUTO, 'game', null);
    this.state.add('splash', SplashState, false);
    this.state.add('menu', MenuState, false);
    this.state.add('game', GameState, false);
    this.state.start('menu');
  }
}

var game = new Game();
