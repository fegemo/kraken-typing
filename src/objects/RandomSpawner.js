import EnemySpawner from 'objects/EnemySpawner';

const INITIAL_INTERVAL = 2500;
const FINAL_INTERVAL = 500;
const TYPICAL_NUMBER_OF_ENEMIES = 10;

export default class RandomSpawner extends EnemySpawner {
  constructor(game, state) {
    super(game, state);
  }

  preload() {
    super.preload();
    this.spawned = 0;
  }

  create() {
    super.create();

    this.game.time.events.add(INITIAL_INTERVAL, this.randSpawn, this);
  }

  update() {
    super.update();
  }

  randSpawn() {
    this.spawnEnemyAtRandom('git clone');
    this.spawned++;

    if (this.spawned < TYPICAL_NUMBER_OF_ENEMIES) {
      let next = Phaser.Math.linear(INITIAL_INTERVAL, FINAL_INTERVAL, this.spawned/TYPICAL_NUMBER_OF_ENEMIES);
      this.game.time.events.add(next * (Math.random()*0.2+0.9), this.randSpawn, this);
    }
  }
}
