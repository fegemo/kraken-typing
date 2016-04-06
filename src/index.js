import SampleGameState from 'states/SampleGameState';
import GameState from 'states/GameState';
import SplashState from 'states/SplashState';

class Game extends Phaser.Game {

	constructor() {
		super(400, 700, Phaser.AUTO, 'content', null);
		this.state.add('SampleGameState', SampleGameState, false);
		this.state.add('GameState', GameState, false);
		this.state.add('SplashState', SplashState, false);
		this.state.start('SplashState');
	}
}

new Game();
