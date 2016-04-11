import Enemy from 'objects/Enemy';

export default class EnemySpawner {

  constructor(game, state) {
    this.game = game;
    this.state = state;
    this.currentEnemy = null;
  }

  preload() {
    this.game.load.image('enemy-console', 'imgs/enemy-console.png');
  }

  create() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    this.state.enemies = this.game.add.physicsGroup();
  }

  spawnEnemyAt(x, y, text) {
    var enemy = new Enemy(this.game, this.state, text);

    enemy.create(x, y);
  }

  spawnEnemyAtRandom(text) {
    let xPosition = Math.random() * this.game.world.width;
    let yPosition = -32;

    this.spawnEnemyAt(xPosition, yPosition, text);
  }

  render() {

  }

  update() {
    this.state.enemies.iterate('alive', true, Phaser.Group.RETURN_NONE,
      enemy => {
      enemy.update();
    });
  }
}




// class LevelSpawner extends EnemySpawner {
//   constructor(game, state) {
//     super(game, state);
//     this.levels = [
//       {
//         name: 'Level 1',
//         waves: [
//           ['git', 'is', 'awesome'],
//           ['let', 'us', 'start'],
//           ['git init'],
//           ['or'],
//           ['git clone https://repo.git']
//         ]
//       }
//     ];
//   }

//   create() {
//     //this.game.time.events.add(1000, );
//   }

//   update() {

//   }
// }
