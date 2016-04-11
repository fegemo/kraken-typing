import Gradient from 'util/GradientBackground';

export default class Background {
  constructor(game, minTime = 4000, maxTime = 7000) {
    this.game = game;
    this.minTime = minTime;
    this.maxTime = maxTime;
  }

  preload() {
    this.game.load.image('bubble', 'imgs/bubble.png');
    this.bg = new Gradient(this.game);
  }

  create() {
    // adds the bg gradient to the stage
    this.bg.create(this.game.world.width, this.game.world.height, [{
      value: '#d8f6ff',
      position: 0
    }, {
      value: '#5dc4e6',
      position: 0.8
    }]);

    // adds bubbles to the stage
    this.bubbles = this.game.add.physicsGroup();
    this.bubbles.createMultiple(32, 'bubble', false);
    this.bubbles.callAll('anchor.setTo', this, 0.5, 0.5);

    this.game.time.events.add(this.maxTime, this.spawnBubbles, this);
  }

  spawnBubbles() {
    const numberToSpawn = Math.floor(Math.random()*3) + 2
    let spawningBubbles = [];

    let xPosition = Math.random() * this.game.world.width;
    let xMirror = Math.random() < 0.5 ? -1 : 1;
    let yPosition = this.game.world.height;
    let scale = Math.random()*0.2 + 0.5;
    let ySpeed = Math.random()*30 + 85;
    for (let i = 0; i < numberToSpawn; i++) {
      let bubble = spawningBubbles[i] = this.bubbles.getFirstExists(false);
      if (!bubble) {
        break;
      }

      bubble.reset(xPosition, yPosition);
      bubble.scale.x = scale;
      bubble.scale.y = scale;
      bubble.body.velocity.y = -ySpeed - (Math.random()*3+1)*Math.pow(1.1, numberToSpawn-i);

      // configures the next bubble
      let xDisplacement = Math.random() * bubble.width * 0.5 + bubble.width;
      xPosition += xMirror * xDisplacement;
      xMirror *= -1;

      let yDisplacement = Math.random() * bubble.height * 0.5 + bubble.height;
      yPosition += yDisplacement;
      scale *= 1.1 + Math.random()/10;
    }


    let nextSpawn = Math.random() * (this.maxTime - this.minTime) + this.minTime;
    this.game.time.events.add(nextSpawn, this.spawnBubbles, this);
  }

  update() {
    this.bubbles.iterate('alive', true, RETURN_NONE, (bubble) => {
      if (bubble.bottom < 0) {
        bubble.kill();
      }
    }, this);
  }
}
