import MenuState from 'states/MenuState';
import GameState from 'states/GameState';
import SplashState from 'states/SplashState';
import loadFonts from 'misc/fonts';

class Game extends Phaser.Game {

  constructor() {
    super(350, 600, Phaser.AUTO, 'content', null);
    this.state.add('menu', MenuState, false);
    this.state.add('game', GameState, false);
    this.state.add('splash', SplashState, false);
    this.state.start('splash');
  }
}

var game = new Game();
loadFonts(window, game);
