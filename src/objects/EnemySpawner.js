import Enemy, { InstructionEnemy, ConsoleEnemy, GitEnemy } from 'objects/Enemy';

export const ENEMY_CONSOLE_DIMENSIONS = { width: 30, height: 30 };
export const ENEMY_INSTRUCTIONS_DIMENSIONS = { width: 30, height: 30 };
export const ENEMY_GIT_DIMENSIONS = { width: 30, height: 30 };

export default class EnemySpawner {

  constructor(game, state) {
    this.game = game;
    this.state = state;
    this.currentEnemy = null;
    this.spawned = 0;
    this.onSpawningProgress = new Phaser.Signal();
  }

  preload() {
    Enemy.preload(this.game);
  }

  create() {
    this.state.enemies = this.game.add.physicsGroup();
  }

  render() {

  }

  update() {
    this.state.enemies.iterate('alive', true, Phaser.Group.RETURN_NONE,
      enemy => {
      enemy.entity.update();
    });
  }

  spawnEnemyAt(x, y, text, typeConstr = ConsoleEnemy, name) {
    // var enemyType = type === 'instruction' ? InstructionEnemy : ConsoleEnemy;
    return new typeConstr(this.game, this.state, text, x, y, name);
  }

  spawnEnemyAtRandom(text, type = 'console') {
    let xPosition = Math.random() * this.game.world.width;
    let yPosition = -32;

    return this.spawnEnemyAt(xPosition, yPosition, text, type);
  }

  nextLevel() {
    this.spawned = 0;
  }
}
