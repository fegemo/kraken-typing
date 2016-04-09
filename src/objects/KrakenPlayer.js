export default class KrakenPlayer {
  
  constructor(game) {
    this.game = game;
  }
  
  preload() {
    this.game.load.spritesheet('kraken', 'imgs/kraken-sprite.png', 56, 100);
  }
  
  create() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    this.sprite = this.game.add.sprite(worldWidth/2, worldHeight-50, 'kraken');
    this.sprite.anchor.setTo(0.5, 0.5);
    
    var goingToSwim = this.sprite.animations.add('goingToSwim', [0, 1, 2, 3], 20, false);
    var swimming = this.sprite.animations.add('swimming', [4, 5], 5, true);
    var stoppingToSwim = this.sprite.animations.add('stoppingToSwim', [4, 5, 1, 0], 20, false);

    goingToSwim.onComplete.add((sprite, animation) => {
      sprite.animations.play('swimming');
    });
    swimming.onLoop.add((sprite, animation) => {
      if (animation.loopCount === 5) {
        sprite.animations.play('stoppingToSwim');
      }
    });
    
    this.floatingTween = this.game.add.tween(this.sprite);
    this.floatingTween.to({ y: this.sprite.y-5 }, 350, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);


    this.game.physics.arcade.enable(this.sprite);
  }
  
  playSwimming() {
    this.sprite.animations.play('goingToSwim');
  }
}