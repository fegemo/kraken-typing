import KrakenPlayer from 'objects/KrakenPlayer';
import Enemy from 'objects/Enemy';
import Background from 'objects/GameBackground';

export default class GameState extends Phaser.State {

  preload() {
    this.player = new KrakenPlayer(this.game);
    this.player.preload();
    
    this.bg = new Background(this.game);
    this.bg.preload();
  }


  create() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    // creates the gradient background
    this.bg.create();
    
    // creates the player
    this.player.create();
    
    // creates the enemy spawner
    
  }

  render() {

  }

  update() {

  }

}