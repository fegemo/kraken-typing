import EnemySpawner, {
  ENEMY_CONSOLE_DIMENSIONS,
  ENEMY_INSTRUCTIONS_DIMENSIONS,
  ENEMY_GIT_DIMENSIONS } from 'objects/EnemySpawner';
import Enemy, { InstructionEnemy, ConsoleEnemy, GitEnemy } from 'objects/Enemy';
import levels from 'levels/levels';
import gkui from 'gkui/gkui';

const INSTRUCTIONS_INTERVAL = 600;

class WaveSpawner {
  constructor(wave, level, spawner) {
    this.wave = wave;
    this.level = level;
    this.spawner = spawner;
    this.spawned = 0;
    this.killed = 0;
  }

  start() {
    // abstract method
  }

  spawn() {
    this.spawned++;
    this.spawner.spawned++;

    this.spawner.onSpawningProgress.dispatch({
      progress: this.progressTotal,
      finished: this.progressTotal >= 1
    });
  }

  enemyWasDestroyed(waveFinishedCallback, context) {
    this.killed++;
    if (this.killed >= this.totalEnemies) {
      waveFinishedCallback.call(context);
    }
  }

  get progressTotal() {
    return this.spawner.spawned/this.spawner.totalEnemies;
  }
}

class InstructionsSpawner extends WaveSpawner {
  constructor(wave, level, spawner) {
    super(wave, level, spawner);
  }

  start() {
    this.spawner.game.time.events.repeat(
      INSTRUCTIONS_INTERVAL,
      this.totalEnemies,
      this.spawn,
      this
    );
  }

  spawn() {
    const xEnemy = Phaser.Math.linear(
      ENEMY_INSTRUCTIONS_DIMENSIONS.width*1.5,
      this.spawner.game.world.width,
      this.spawned/this.totalEnemies);
    let enemyCommand = this.wave.enemies.exactly[this.spawned];
    let enemy = this.spawner.spawnEnemyAt(xEnemy, 0, enemyCommand, InstructionEnemy);
    enemy.create();
    super.spawn();
  }

  get totalEnemies() {
    return this.wave.enemies.exactly.length;
  }
}

class ConsoleSpawner extends WaveSpawner {
  constructor(wave, level, spawner) {
    super(wave, level, spawner);

    // lerps to see what should be the min and max intervals of this wave
    let consoleWaves = this.spawner.consoleWaves;
    let indexOfThisWave = this.level.waves.indexOf(wave);
    let percentageOfThisWave = indexOfThisWave/consoleWaves.length;
    this.minInterval = Phaser.Math.linear(this.level.initialMinInterval, this.level.finalMinInterval, percentageOfThisWave);
    this.maxInterval = Phaser.Math.linear(this.level.initialMaxInterval, this.level.finalMaxInterval, percentageOfThisWave);
    this.speedMultiplier = Phaser.Math.linear(this.level.initialSpeedMultiplier, this.level.finalSpeedMultiplier, percentageOfThisWave);
  }

  get totalEnemies() {
    if (!this._totalEnemies) {
      this._totalEnemies =  this.totalConsoleEnemies + (this.wave.enemies.git ? 1 : 0);
    }
    return this._totalEnemies;
  }

  get totalConsoleEnemies() {
    if (!this._totalConsoleEnemies) {
      this._totalConsoleEnemies =  0 +
        (this.wave.enemies.quantity || 0) +
        (this.wave.enemies.exactly || []).length;
    }
    return this._totalConsoleEnemies;
  }

  start() {
    // regular console enemies
    if (this.spawned < this.totalConsoleEnemies) {
      this.spawner.game.time.events.add(
        this.spawner.game.rnd.between(
          this.minInterval,
          this.maxInterval
        ),
        this.spawn,
        this
      );
    }

    // special (shiny) git enemyit
    const git = this.wave.enemies.git;
    if (!!git &&
      !this.hasSpawnedGitEnemy && this.progressConsoleOnly >= git.atProgress) {
        this.hasSpawnedGitEnemy = true;
        let enemy = this.spawn(GitEnemy);

        enemy.uponDeath = function() {
          gkui.animate.call(this.spawner.state, enemy.name);
        }.bind(this);
      }
  }

  spawn(type = ConsoleEnemy) {
    // spawns
    const enemyDescription = type === ConsoleEnemy ? this.nextEnemy() : this.wave.enemies.git;

    const xEnemy = type === ConsoleEnemy ?
      this.spawner.game.rnd.between(
        -ENEMY_INSTRUCTIONS_DIMENSIONS.width,
        this.spawner.game.world.width+ENEMY_INSTRUCTIONS_DIMENSIONS.width
      ) :
      this.spawner.game.rnd.between(
        this.spawner.game.world.width/3,
        (this.spawner.game.world.width/3)*2
      );
    let enemy = this.spawner.spawnEnemyAt(xEnemy, 0, enemyDescription.cmd, type, enemyDescription.name);
    enemy.speedMultiplier = this.speedMultiplier;
    enemy.create();

    // updates this.spawned etc.
    super.spawn();

    // reschedules spawning
    this.start();

    return enemy;
  }

  nextEnemy() {
    if (this.wave.enemies.fromPool) {
      return this.spawner.game.rnd.pick(
        this.wave.enemies.fromPool
      );
    } else if (this.wave.enemies.exactly) {
      return this.wave.enemies.exactly[this.spawned];
    }
    return 'null';
  }

  get progressConsoleOnly() {
    return (this.spawned - (this.hasSpawnedGitEnemy ? 1 : 0)) / this.totalConsoleEnemies;
  }
}




export default class LevelSpawner extends EnemySpawner {
  constructor(game, state) {
    super(game, state);
    this.levels = levels;
    this.currentLevelIndex = 0;
    this._totalEnemies = [];
    this.state.onDestroyingProgress.add(this.enemyWasDestroyed, this);
  }

  start() {
    this.spawned = 0;
    this.waves = this.levels[this.currentLevelIndex].waves
      .map(wave => {
      var waveSpawner = wave.type === 'instructions' ? InstructionsSpawner : ConsoleSpawner;
      return new waveSpawner(wave, this.currentLevel, this);
    });
    this.currentWaveIndex = 0;

    this.currentWave.start();
  }

  nextWave() {
    let previousWave = this.currentWave;
    this.currentWaveIndex++;
    if (this.currentWave) {
      // lets schedule the start of the next wave
      this.game.time.events.add(previousWave.wave.delayAfter, this.currentWave.start, this.currentWave);
    }
  }

  hasNextLevel() {
    return this.currentLevelIndex+1 < this.levels.length;
  }

  nextLevel() {
    super.nextLevel();

    this.currentLevelIndex++;
    this.start();
  }

  enemyWasDestroyed() {
    if (!this.currentWave) {
      console.error('tried to tell a wave spawner that an enemy was destroyed, but there were no more currentWave');
    }
    this.currentWave.enemyWasDestroyed(this.nextWave, this);
  }

  get currentWave() {
    return this.waves[this.currentWaveIndex];
  }

  get currentLevel() {
    return this.levels[this.currentLevelIndex];
  }

  get consoleWaves() {
    if (!this._consoleWaves) {
      this._consoleWaves = this.currentLevel.waves.filter(w => w.type === 'console');
    }
    return this._consoleWaves;
  }

  get totalEnemies() {
    if (!this._totalEnemies[this.currentLevelIndex]) {
      this._totalEnemies[this.currentLevelIndex] = this.waves.reduce(
        (accum, curr) => accum + curr.totalEnemies
      , 0);
    }
    return this._totalEnemies[this.currentLevelIndex];
  }
}
