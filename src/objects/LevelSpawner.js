import EnemySpawner, {
  ENEMY_CONSOLE_DIMENSIONS,
  ENEMY_INSTRUCTIONS_DIMENSIONS,
  ENEMY_GIT_DIMENSIONS } from 'objects/EnemySpawner';
import levels from 'levels/levels';

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
    let progress = this.spawner.spawned/this.spawner.totalEnemies
    this.spawner.onSpawningProgress.dispatch({
      progress: progress,
      finished: progress === 1
    });
  }

  enemyWasDestroyed(waveFinishedCallback, context) {
    this.killed++;
    if (this.killed >= this.totalEnemies) {
      waveFinishedCallback.call(context);
    }
  }

}

class InstructionsSpawner extends WaveSpawner {
  constructor(wave, level, spawner) {
    super(wave, level, spawner);
    // console.log('instruction wave spawner criado');
  }

  start() {
    // console.log('started instructions wave spawner');
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
    let enemy = this.spawner.spawnEnemyAt(xEnemy, 0, enemyCommand, 'instruction');
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
    // console.log('console wave spawner criado');

    // lerps to see what should be the min and max intervals of this wave
    let consoleWaves = this.level.waves.filter(w => w.type === 'console');
    let howManyConsoleWaves = consoleWaves.length;
    // let consoleWavesWithEnemyQtys = consoleWaves.map(w => {
    //   return {
    //     w,
    //     w.reduce((accum, curr) => {
    //       return accum+(curr.enemies.quantity || 0)+((curr.enemies.exactly||[]).length)+(curr.enemies.git?1:0)}, 0)
    //     }
    //   });
    let indexOfThisWave = this.level.waves.indexOf(wave);
    let percentageOfThisWave = indexOfThisWave/howManyConsoleWaves;
    this.minInterval = Phaser.Math.linear(this.level.initialMinInterval, this.level.finalMinInterval, percentageOfThisWave);
    this.maxInterval = Phaser.Math.linear(this.level.initialMaxInterval, this.level.finalMaxInterval, percentageOfThisWave);
    this.speedMultiplier = Phaser.Math.linear(this.level.initialSpeedMultiplier, this.level.finalSpeedMultiplier, percentageOfThisWave);
  }

  get totalEnemies() {
    return 0 +
      (this.wave.enemies.quantity || 0) +
      (this.wave.enemies.exactly || []).length +
      (this.wave.enemies.git ? 1 : 0);
  }

  start() {
    // console.log('started console wave spawner');
    if (this.spawned < this.totalEnemies) {
      this.spawner.game.time.events.add(
        this.spawner.game.rnd.between(
          this.minInterval,
          this.maxInterval
        ),
        this.spawn,
        this
      );
    }
  }

  spawn() {
    // spawns
    const enemyDescription = this.nextEnemy();
    const xEnemy = this.spawner.game.rnd.between(
      -ENEMY_INSTRUCTIONS_DIMENSIONS.width, this.spawner.game.world.width+ENEMY_INSTRUCTIONS_DIMENSIONS.width);
    let enemy = this.spawner.spawnEnemyAt(xEnemy, 0, enemyDescription.cmd, 'console');
    enemy.speedMultiplier = this.speedMultiplier;
    enemy.create();

    super.spawn();

    // reschedules spawning
    this.start();
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
}




export default class LevelSpawner extends EnemySpawner {
  constructor(game, state) {
    super(game, state);
    this.levels = levels;
    this.currentLevelIndex = 0;
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
    // console.log('going ot load a new wave now with index ' + (this.currentWaveIndex+1));
    let previousWave = this.currentWave;
    this.currentWaveIndex++;
    if (this.currentWave) {
      // lets schedule the start of the next wave
      this.game.time.events.add(previousWave.wave.delayAfter, this.currentWave.start, this.currentWave);
    }
  }

  nextLevel() {
    // console.log('LevelSpawner: nextLevel was called');
    super.nextLevel();

    this.currentLevelIndex++;
    this.start();
  }

  enemyWasDestroyed() {
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
      this._consoleWaves = this.level.waves.filter(w => w.type === 'console');
    }
    return this._consoleWaves;
  }

  get totalEnemies() {
    if (!this._totalEnemies) {
      this._totalEnemies = this.waves.reduce(
        (accum, curr) => accum + curr.totalEnemies
      , 0);
    }
    return this._totalEnemies;
  }
}
