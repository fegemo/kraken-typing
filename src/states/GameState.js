import KrakenPlayer from 'objects/KrakenPlayer';
import Enemy from 'objects/Enemy';
import Background from 'objects/GameBackground';
import RandomSpawner from 'objects/RandomSpawner';
import Torpedo from 'objects/Torpedo';
import HUD from 'objects/GameStateHUD';

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

    Torpedo.preload(this.game);

    this.hud = new HUD(this.game);
    this.hud.preload();
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

    // typing to destroy!!
    this.game.input.keyboard.addCallbacks(this, null, null, this.keyPressed);

    // torpedoes
    this.torpedos = this.game.add.physicsGroup();

    // buttons & hud
    this.hud.create({
      replayCallback: this.replayGame,
      resumeCallback: this.resumeGame,
      menuCallback: this.leaveToMenu,
      pauseCallback: this.pauseGame
    }, this);
  }

  render() {
    this.spawner.render();


    //// debugs player and enemys
    // this.game.debug.body(this.player.sprite);
    // let e = this.enemies.getFirstAlive();
    // if (e) {
    //   this.game.debug.body(e);
    // }

    //// debugs a torpedo
    // let first = this.torpedos.getFirstAlive();
    // if (first) {
    //   first.entity.render();
    // }
  }

  update() {
    this.spawner.update();

    // configures player collision with enemy
    this.game.physics.arcade.overlap(
      this.player.sprite, this.enemies,
      (player, enemy) => {
        player.entity.hit(this.gameOver, this);
        enemy.entity.destroy();
      });

    // updates torpedos statuses
    this.torpedos.forEachAlive(torpedo => {
      torpedo.entity.update();
    });

    // configures enemy collision with torpedo
    this.enemies.forEachAlive(enemy => {
      this.game.physics.arcade.overlap(enemy, this.torpedos,
        // callback for when a torpedo target at this enemy hit it
        (_, torpedo) => {
        enemy.entity.hitByTorpedo();
        torpedo.entity.destroy();
        // callback to check if the current torpedo was target at this enemy
      }, (_, torpedo) => {
        return torpedo.entity.target === enemy.entity;
      });
    }, this);
  }

  keyPressed(key, e) {
    var spawner = this.spawner;

    // if there is not a this.currentEnemy, look for one
    if (!spawner.currentEnemy) {
      // iterate over alive enemies,
      // checking if their current letter equals `key`
      this.enemies.iterate('alive', true, Phaser.Group.RETURN_NONE, enemy => {
        if (spawner.currentEnemy) return;
        if (enemy.entity.currentChar === key) {
          spawner.currentEnemy = enemy.entity;
        }
      });
    }

    // if we have a spawner, either bc we had before or bc we just picked a
    // new one, we shoot it
    if (spawner.currentEnemy) {
      let killed = spawner.currentEnemy.killChar();
      this.shootTorpedo(spawner.currentEnemy);

      if (killed) {
        spawner.currentEnemy = null;
      }
    }
  }

  shootTorpedo(targetEnemy) {
    var torpedo = new Torpedo(this.game, this.torpedos, this.player, targetEnemy);
    torpedo.create();
  }

  gameOver() {
    this.hud.modals.hideModal('gamePaused');
    this.hud.modals.showModal('gameOver');
  }

  pauseGame() {
    this.hud.modals.showModal('gamePaused');
  }

  resumeGame() {
    this.hud.modals.hideModal('gamePaused');
  }

  replayGame() {
    console.log('replay game');
  }

  leaveToMenu() {
    console.log('left to menu');

  }
}
