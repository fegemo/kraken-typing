import KrakenPlayer from 'objects/KrakenPlayer';
import Enemy from 'objects/Enemy';
import Background from 'objects/GameBackground';
import RandomSpawner from 'objects/RandomSpawner';
import Torpedo from 'objects/Torpedo';
import HUD from 'objects/GameStateHUD';

export default class GameState extends Phaser.State {

  preload() {
    this.player = new KrakenPlayer(this.game);
    this.player.preload();

    this.bg = new Background(this.game);
    this.bg.preload();

    this.spawner = new RandomSpawner(this.game, this);
    this.spawner.preload();

    Torpedo.preload(this.game);

    this.hud = new HUD(this.game);
    this.hud.preload();

    this.currentLevel = 1;
  }


  create() {
    // configures "arcade" type of physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // creates the gradient background
    this.bg.create();

    // creates the player
    this.player.create();

    // creates the enemy spawner
    this.spawner.create();
    this.spawner.onSpawningProgress.add(this.progress, this);

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

    this.player.render();

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
        // damages the player
        let gameOvered = player.entity.hit(this.gameOver, this);
        // destroys the enemy
        enemy.entity.destroy();
        // if the enemy was the current target, free it so other enemies
        // can be shot at
        if (this.spawner.currentEnemy === enemy.entity) {
          this.spawner.currentEnemy = null;
        }
        if (this.finishedSpawning && !gameOvered && !this.enemies.countLiving()) {
          // go to the next level
          this.nextLevel();
        }
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
          // tells enemy it was hit so it can lose its HP and destroys the torpedo
          enemy.entity.hitByTorpedo();
          torpedo.entity.destroy();
          // check if all enemies are destroyed so we can go to next level:
          // if the spawner has finished and there are no more alive enemies
          if (this.finishedSpawning && !this.enemies.countLiving()) {
            // go to the next level
            this.nextLevel();
          }

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

    // if we have a current enemy, either bc we had before or bc we just picked
    // a new one, we shoot it
    if (spawner.currentEnemy) {
      if (spawner.currentEnemy.currentChar === key) {
        let killed = spawner.currentEnemy.killChar();
        this.shootTorpedo(spawner.currentEnemy);

        if (killed) {
          spawner.currentEnemy = null;
        }
      }
    }
  }

  shootTorpedo(targetEnemy) {
    var torpedo = new Torpedo(this.game, this.torpedos, this.player, targetEnemy);
    torpedo.create();
  }

  progress(e) {
    console.log(`progress: ${e.progress*100}%`);
    this.finishedSpawning = true;
    // if (e.finished) {
    //   console.log('finished!');
    //   this.player.playSwimming();
    // }
  }

  nextLevel() {
    this.player.playSwimming();
    var duration = this.hud.showNextLevelMessage(++this.currentLevel);
    this.game.time.events.add(duration, () => {
      this.spawner.nextLevel(this.currentLevel);
    }, this);
  }

  gameOver() {
    this.hud.modals.hideModal('gamePaused');
    this.hud.modals.showModal('gameOver');
  }

  pauseGame() {
    // pauses physics and the global timer
    this.game.physics.arcade.isPaused = true;
    this.game.time.events.pause();
    // shows modal
    this.hud.modals.showModal('gamePaused');
  }

  resumeGame() {
    // unpauses physics and the global timer
    this.game.physics.arcade.isPaused = false;
    this.game.time.events.resume();
    // hides modal
    this.hud.modals.hideModal('gamePaused');
  }

  replayGame() {
    this.game.state.start('game');
  }

  leaveToMenu() {
    this.game.state.start('menu');
  }
}
