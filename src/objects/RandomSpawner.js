import EnemySpawner from 'objects/EnemySpawner';

const INITIAL_INTERVAL = 1500;
const FINAL_INTERVAL = 1400;
const TYPICAL_NUMBER_OF_ENEMIES = 1;

export default class RandomSpawner extends EnemySpawner {

  start() {
    this.game.time.events.add(INITIAL_INTERVAL, this.randSpawn, this);
  }

  randSpawn() {
    var enemy  =this.spawnEnemyAtRandom('git clone');
    enemy.create();
    this.spawned++;

    if (this.spawned < TYPICAL_NUMBER_OF_ENEMIES) {
      let next = Phaser.Math.linear(INITIAL_INTERVAL, FINAL_INTERVAL, this.spawned/TYPICAL_NUMBER_OF_ENEMIES);
      this.game.time.events.add(next * (Math.random()*0.2+0.9), this.randSpawn, this);
    }

    this.onSpawningProgress.dispatch({
      progress: this.spawned/TYPICAL_NUMBER_OF_ENEMIES,
      finished: this.spawned === TYPICAL_NUMBER_OF_ENEMIES
    });
  }

  nextLevel() {
    super.nextLevel();
    this.start();
  }
}
