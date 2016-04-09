import KrakenPlayer from 'objects/KrakenPlayer';
import Enemy from 'objects/Enemy';
import Background from 'objects/GameBackground';
import RandomSpawner from 'objects/RandomSpawner';

export default class GameState extends Phaser.State {

  preload() {
    // fonts
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');

    this.player = new KrakenPlayer(this.game);
    this.player.preload();

    this.bg = new Background(this.game);
    this.bg.preload();

    this.spawner = new RandomSpawner(this.game, this);
    this.spawner.preload();
  }


  create() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    // creates the gradient background
    this.bg.create();

    // creates the player
    this.player.create();

    // creates the enemy spawner
    this.spawner.create();
  }

  render() {
    this.spawner.render();
  }

  update() {
    this.spawner.update();
  }

}
