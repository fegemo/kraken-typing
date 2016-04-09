import EnemySpawner from 'objects/EnemySpawner';

export default class RandomSpawner extends EnemySpawner {
  constructor(game, state) {
    super(game, state);
    //this.did = false;
  }

  preload() {
    super.preload();
    this.did = false;
  }


  update() {
    if (!this.did) {
      this.spawnEnemyAtRandom('git');
      this.did = true;
    }
  }
}
