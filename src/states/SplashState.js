import TweenParams from 'util/TweenParams';
import Ball from 'objects/LogoBall';

export default class SplashState extends Phaser.State {

  createBalls() {
    const worldWidth = this.game.world.width;
    const halfWorldWidth = worldWidth / 2;
    const worldHeight = this.game.world.height;
    const halfWorldHeight = worldHeight / 2;

    let ballPathPoints = {
      'logo-ball1': {
        x: [-50, halfWorldWidth + 50, halfWorldWidth - 50, halfWorldWidth * 0.65],
        y: [worldHeight, worldHeight * 0.3, worldHeight * 0.15, halfWorldHeight * 0.6]
      },
      'logo-ball2': {
        x: [-75, halfWorldWidth + 150, halfWorldWidth + 75, halfWorldWidth * 1.0],
        y: [worldHeight, worldHeight * 0.2, worldHeight * 0.05, halfWorldHeight * 0.45]
      },
      'logo-ball3': {
        x: [-150, halfWorldWidth + 250, halfWorldWidth + 150, halfWorldWidth * 1.35],
        y: [worldHeight, worldHeight * 0.4, worldHeight * 0.25, halfWorldHeight * 0.75]
      }
    }

    this.balls = Object.keys(ballPathPoints).map((img, i) => {
      let ball = new Ball(
        this.game,
        img,
        ballPathPoints[img],
        this[`animLogoBall${i + 1}`]
      );
      ball.create();
      this.game.add.existing(ball.sprite);
      return ball;
    });

  }


  preload() {
    this.game.load.image('logo-text', 'imgs/trio-ternura-studios.png');

    this.animLogoText = new TweenParams(200, 200, Phaser.Easing.Quadratic.Out);
    this.animLogoBall1 = new TweenParams(800, 750, Phaser.Easing.Bounce.Out);
    this.animLogoBall2 = new TweenParams(950, 750, Phaser.Easing.Bounce.Out);
    this.animLogoBall3 = new TweenParams(1100, 750, Phaser.Easing.Bounce.Out);

    this.game.load.image('logo-ball1', 'imgs/logo-ball1.png');
    this.game.load.image('logo-ball2', 'imgs/logo-ball2.png');
    this.game.load.image('logo-ball3', 'imgs/logo-ball3.png');
  }

  create() {
    this.game.stage.backgroundColor = '#fff';

    let logoTextSprite = this.game.add.sprite(
      this.game.world.width / 2,
      this.game.world.height,
      'logo-text');
    logoTextSprite.anchor.setTo(0.5, 0);

    this.game.add.tween(logoTextSprite).to({
      y: this.game.world.height * (0.5)
    }, this.animLogoText.duration,
      Phaser.Easing.Quadratic.Out,
      true,
      this.animLogoText.start);


    this.createBalls();

    // creates an invisible text with each webfont so it preloads them here
    this.game.make.text(-100, -100, 'a', { font: 'Erica One' });
    this.game.make.text(-100, -100, 'b', { font: 'Chango' });
    this.game.make.text(-100, -100, 'c', { font: 'Ubuntu Mono' });

    this.game.time.events.add(5000, this.goToMenu, this);
  }

  render() {

  }

  update() {
    this.balls.forEach(ball => {
      ball.update();
    });
  }

  goToMenu() {
    this.game.state.start('menu');
  }
};
