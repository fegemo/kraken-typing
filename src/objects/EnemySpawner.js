import Enemy from 'objects/Enemy';

export default class EnemySpawner {
  
  constructor(game, state) {
    this.game = game;
    this.state = state;
  }
  
  preload() {
    this.game.load.image('enemy-console', 'imgs/enemy-console.png');  
  }
  
  create() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    this.state.enemies = this.state.enemies || this.game.create.physicsGroup();
    
  }
  
  spawnEnemyAt(x, y, text) {
    var enemy = new Enemy(this.game, text);
    enemy.create(x, y);
    
    let xDistanceToPlayer = this.state.player.x - x;
    let yDistanceToPlayer = this.state.player.y - y;
    
    let ySpeed = 20;
    let timeToImpact = yDistanceToPlayer/ySpeed;
    let xSpeed = xDistanceToPlayer / timeToImpact;
    
    enemy.sprite.body.velocity.x = xSpeed;
    enemy.sprite.body.velocity.y = ySpeed;
    
    this.state.enemies.existing(enemy.sprite);
  }
  
  spawnEnemyAtRandom(text) {
    let xPosition = Math.random() * this.game.world.width;
    let yPosition = 0;
    
    this.spawnEnemyAt(xPosition, yPosition, text);
  }
  
  render() {
    
  }
  
  update() {
    
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