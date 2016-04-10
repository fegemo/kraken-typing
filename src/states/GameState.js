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

    // configures "arcade" type of physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // creates the gradient background
    this.bg.create();

    // creates the player
    this.player.create();

    // creates the enemy spawner
    this.spawner.create();

    this.game.input.keyboard.addCallbacks(this, null, null, function(key, e) {
      e.stopPropagation();
      // if there is a current enemy, see if it's a hit
      if (this.spawner.currentEnemy) {
        if (this.spawner.currentEnemy.currentChar() === key) {
          let killed = this.spawner.currentEnemy.killChar();

          if (killed) {
            this.spawner.currentEnemy = null;
          }
        }
      }
      // if not, get all enemies that are alive and see if any is hit
      else {
        this.enemies.iterate('alive', true, Phaser.Group.RETURN_NONE,
          enemy => {
            if (enemy.entity.currentChar() === key) {
              this.spawner.currentEnemy = enemy.entity;
              let killed = this.spawner.currentEnemy.killChar();

              if (killed) {
                this.spawner.currentEnemy = null;
              }

            }
          }
        );
      }
    });
  }

  render() {
    this.spawner.render();


    // this.game.debug.body(this.player.sprite);
    // let e = this.enemies.getFirstAlive();
    // if (e) {
    //   this.game.debug.body(e);
    // }
  }

  update() {
    this.spawner.update();

    // configures player collision with enemy
    this.game.physics.arcade.overlap(
      this.player.sprite, this.enemies,
      (p, enemy) => {
        p.entity.hit();
        enemy.entity.destroy();
      });
  }

}
