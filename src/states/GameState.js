import KrakenPlayer from 'objects/KrakenPlayer';
import Enemy from 'objects/Enemy';
import Background from 'objects/GameBackground';
import RandomSpawner from 'objects/RandomSpawner';
import LevelSpawner from 'objects/LevelSpawner';
import Torpedo from 'objects/Torpedo';
import HUD from 'objects/GameStateHUD';
import gkui from 'gkui/gkui';

export default class GameState extends Phaser.State {

  preload() {
    this.player = new KrakenPlayer(this.game);
    this.player.preload();

    this.bg = new Background(this.game);
    this.bg.preload();

    this.onDestroyingProgress = new Phaser.Signal();
    this.spawner = new LevelSpawner(this.game, this);
    this.spawner.preload();

    Torpedo.preload(this.game);

    this.hud = new HUD(this.game, this);
    this.hud.preload();

    this.currentLevel = 1;
  }


  create() {
    // configures "arcade" type of physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // creates the gradient background
    this.bg.create();

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

    // creates the player
    this.player.create();

    // starts the game (spawner)
    this.spawner.start();

    // resets the gkui
    gkui.reset();
  }

  render() {
    this.spawner.render();
    this.player.render();
  }

  update() {
    this.spawner.update();

    // configures player collision with enemy
    this.game.physics.arcade.overlap(
      this.player.sprite, this.enemies,
      (player, enemy) => {
        // damages the player
        let gameOvered = player.entity.hit(this.gameOver, this);
        // destroys the enemy and checks if should go next lvl
        this.destroyEnemy(enemy, gameOvered);

      }, (player, enemy) => {
        // the 'instruction' enemy does not collide with the player
        return enemy.entity.type !== 'instruction';
      });

    // updates torpedos statuses
    this.torpedos.forEachAlive(torpedo => {
      torpedo.entity.update();
    });

    // for each enemy alive, does:
    // (a) checks if alive enemies have exceeded the bottom of the world (usually the 'instruction' type)
    // (b) checks enemy collision with torpedo
    this.enemies.forEachAlive(enemy => {
      if (enemy.top > this.game.world.height) {
        this.destroyEnemy(enemy, false);
      }

      this.game.physics.arcade.overlap(enemy, this.torpedos,
        // callback for when a torpedo targeted at this enemy hit it
        (_, torpedo) => {
          // tells enemy it was hit so it can lose its HP and destroys the torpedo
          let destroyed = enemy.entity.hitByTorpedo();
          torpedo.entity.destroy();

          if (destroyed) {
            this.destroyEnemy(enemy, false);
          }

        // callback to check if the current torpedo was targeted at this enemy
      }, (_, torpedo) => {
        return torpedo.entity.target === enemy.entity;
      });
    }, this);
  }

  destroyEnemy(enemy, gameOvered) {
    // destroys the enemy
    enemy.entity.destroy();
    // tells the spawner that an enemy was destroyed
    this.onDestroyingProgress.dispatch();
    // if the enemy was the current target, free it so other enemies
    // can be shot at
    if (this.spawner.currentEnemy === enemy.entity) {
      this.spawner.currentEnemy = null;
    }
    if (this.finishedSpawning && !gameOvered && !this.enemies.countLiving()) {
      // go to the next level

      this.nextLevel();
    }
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
    torpedo.create(targetEnemy.torpedoType);
  }

  progress(e) {
    if (e.finished) {
      this.finishedSpawning = true;
    }
  }

  nextLevel() {
    this.finishedSpawning = false;
    let hasNextLevel = this.spawner.hasNextLevel();
    this.player.playSwimming(hasNextLevel);
    if (hasNextLevel) {
      // goes to next level
      let duration = this.hud.showNextLevelMessage(++this.currentLevel);
      this.game.time.events.add(duration, () => {
        this.spawner.nextLevel(this.currentLevel);
      }, this);
    } else {
      // goes to finish game screen
      this.hud.modals.showModal('endGame');
    }
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
    // resets the gkui
    gkui.reset();

    this.resumeGame();
    this.game.state.start('game');
  }

  leaveToMenu() {
    this.resumeGame();
    this.game.state.start('menu');
  }
}
