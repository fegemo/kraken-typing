import { randomFloat } from 'util/rand';

const TORPEDO_DIMENSIONS = { width: 16, height: 24 };
const TORPEDO_TIME_TO_PURSUIT = 1500;
const TORPEDO_INITIAL_VELOCITY = {
  x: {
    min: 200,
    variation: 420
  },
  y: {
    min: -10,
    variation: -15
  }
};
const TORPEDO_SPEED = 390;
const TORPEDO_STEER_RATE = 100;
const State = {
  // stays in this for TORPEDO_TIME_TO_PURSUIT mili...
  JUST_SHOT: 'JUST_SHOT',
  // it is pursuing the enemy in a straight line
  PURSUING: 'PURSUING',
  // the enemy it was targeting doesnt exist anymore
  ADRIFT: 'ADRIFT'
}

export default class Torpedo {
  constructor(game, group, player, target) {
    this.game = game;
    this.group = group;
    this.player = player;
    this.target = target;
    this.state = State.JUST_SHOT;
  }

  static preload(game) {
    game.load.spritesheet(
      'torpedo',
      'imgs/torpedo.png',
      TORPEDO_DIMENSIONS.width,
      TORPEDO_DIMENSIONS.height
    );
    game.load.spritesheet(
      'laser',
      'imgs/laser.png',
      TORPEDO_DIMENSIONS.width,
      TORPEDO_DIMENSIONS.height
    );
    game.load.spritesheet(
      'big-boy',
      'imgs/big-boy.png',
      TORPEDO_DIMENSIONS.width,
      TORPEDO_DIMENSIONS.height
    );
  }

  create(type = 'torpedo') {
    this.sprite = this.game.add.sprite(this.player.sprite.x, this.player.sprite.top, type);
    this.group.add(this.sprite);
    this.sprite.entity = this;
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.body.velocity.x = Phaser.Utils.randomChoice(1, -1) *
      randomFloat(TORPEDO_INITIAL_VELOCITY.x.min, TORPEDO_INITIAL_VELOCITY.x.variation);
    this.sprite.body.velocity.y = randomFloat(
      TORPEDO_INITIAL_VELOCITY.y.min, TORPEDO_INITIAL_VELOCITY.y.variation);
    this.sprite.body.drag.x = 0.4;
    this.sprite.body.drag.y = 0.1;
    this.sprite.tint = 0xff3366;
    this.born = this.game.time.time;

    // animation
    this.sprite.animations.add('turnedOff', [2,3], 5, true);
    this.sprite.animations.add('pursuing', [0,1], 20, true);
    this.sprite.play('turnedOff');

    // the rotation will be updated on the update() function
    this.sprite.body.allowRotation = false;
  }

  render() {
  }

  update() {

    this.checkState();

    let targetBottom = {
      x: this.target.sprite.x,
      y: Phaser.Math.linear(this.target.sprite.y, this.target.sprite.bottom, 0.75)
    };

    switch(this.state) {
      case State.JUST_SHOT:
        let angleToTarget = Math.atan2(this.target.sprite.y-this.sprite.y, this.target.sprite.x-this.sprite.x);
        let xVelocityDesired = Math.cos(angleToTarget) * TORPEDO_SPEED;
        let yVelocityDesired = Math.sin(angleToTarget) * TORPEDO_SPEED;

        this.sprite.body.velocity.x = Phaser.Math.linear(
          this.sprite.body.velocity.x, xVelocityDesired,
          (this.game.time.time-this.born)/TORPEDO_TIME_TO_PURSUIT);
        this.sprite.body.velocity.y = Phaser.Math.linear(
          this.sprite.body.velocity.y, yVelocityDesired,
          (this.game.time.time-this.born)/TORPEDO_TIME_TO_PURSUIT);

        this.sprite.rotation = Math.atan2(this.sprite.body.velocity.y, this.sprite.body.velocity.x) + Math.PI/2;

        break;
      case State.PURSUING:
        if (this.game.time.time > this.lastSteer + TORPEDO_STEER_RATE) {
          this.sprite.rotation = this.game.physics.arcade.moveToObject(this.sprite, targetBottom, TORPEDO_SPEED) + Math.PI/2;
          this.lastSteer = this.game.time.time;
        }

        break;
      case State.ADRIFT:
        this.sprite.rotation = Math.atan2(this.sprite.body.velocity.y, this.sprite.body.velocity.x) + Math.PI/2;
        break;
    }
  }

  checkState() {
    // checks if the torpedo must transition to a new state,
    // considering its current state, the current time
    if (this.state !== State.ADRIFT &&
      (!this.target || !this.target.sprite || !this.target.sprite.alive)) {
      this.state = State.ADRIFT;
      this.sprite.tint = 0x777777;
      this.sprite.play('turnedOff');
    }
    else if (this.state === State.JUST_SHOT &&
      this.game.time.time > this.born + TORPEDO_TIME_TO_PURSUIT/4 &&
      this.sprite.animations.currentAnim.name !== 'pursuing') {
      this.sprite.tint = 0xffffff;
      this.sprite.play('pursuing');
    }
    // commenting this out improves perf. at mostly no cost to the game
    else if (this.state === State.JUST_SHOT &&
      this.game.time.time > this.born + TORPEDO_TIME_TO_PURSUIT) {
      this.sprite.body.drag.x = 0;
      this.sprite.body.drag.y = 0;
      this.lastSteer = this.game.time.time-1;

      this.state = State.PURSUING;
    }
  }

  destroy() {
    this.sprite.parent.remove(this.sprite, true);
    this.sprite.entity = null;
  }


}
