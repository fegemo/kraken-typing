import BootState from 'states/BootState';
import SplashState from 'states/SplashState';
import LoadingState from 'states/LoadingState';
import MenuState from 'states/MenuState';
import GameState from 'states/GameState';

class Game extends Phaser.Game {

  constructor() {
    super(350, 600, Phaser.AUTO, 'game', null);
    this.state.add('boot', BootState, false);
    this.state.add('splash', SplashState, false);
    this.state.add('loading', LoadingState, false);
    this.state.add('menu', MenuState, false);
    this.state.add('game', GameState, false);
    this.state.start('boot');
  }
}

var game = new Game();
