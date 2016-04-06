import TweenParams from 'util/TweenParams';

class Ball {
    constructor(game, name, bezierPoints) {
        this.game = game;
        this.name = name;
        this.bezierPoints = bezierPoints;
        this.t = 0;
    }
    
    createPath() {
        this.path = [];
        
        const step = 1/(this.game.width/4);
        for (let i = 0; i <= 1; i += step) {
            let px = this.game.math.bezierInterpolation(this.bezierPoints.x, i);
            let py = this.game.math.bezierInterpolation(this.bezierPoints.y, i);
            this.path.push({
                x: px,
                y: py
            });
        }
    }
    
    create() {
        this.createPath();
        this.sprite = this.game.add.sprite(this.path[0].x, this.path[0].y, this.name);
        this.sprite.anchor.setTo(0.5, 0.5);
    }
    
    update() {
        this.sprite.x = this.path[this.t].x;
        this.sprite.y = this.path[this.t].y;
        this.t = Math.min(this.t+1, this.path.length-1);
    }
}

export default class SplashState extends Phaser.State {

    createBalls() {
        const worldWidth = this.game.world.width;
        const halfWorldWidth = worldWidth/2;
        const worldHeight = this.game.world.height;
        const halfWorldHeight = worldHeight/2;
        
        let ballPathPoints = {
            'logo-ball1': {
                x: [-50, halfWorldWidth+50, halfWorldWidth-50, halfWorldWidth*0.65],
                y: [worldHeight, worldHeight*0.3, worldHeight*0.15, halfWorldHeight*0.6]
            },
            'logo-ball2': {
                x: [-75, halfWorldWidth+150, halfWorldWidth+75, halfWorldWidth*1.0],
                y: [worldHeight, worldHeight*0.2, worldHeight*0.05, halfWorldHeight*0.45]
            },
            'logo-ball3': {
                x: [-150, halfWorldWidth+250, halfWorldWidth+150, halfWorldWidth*1.35],
                y: [worldHeight, worldHeight*0.4, worldHeight*0.25, halfWorldHeight*0.75]
            }
        }    
        
        this.balls = Object.keys(ballPathPoints).map(img => {
            let ball = new Ball(this.game, img, ballPathPoints[img]);
            ball.create();
            this.game.add.existing(ball.sprite);
            return ball;
        });
        
    }
    
    
    preload() {
        this.game.load.image('logo-text', 'imgs/trio-ternura-studios.png');
        
        this.animLogoText = new TweenParams(200, 200, Phaser.Easing.Quadratic.Out);
        this.animLogoBall1 = new TweenParams(400, 250, Phaser.Easing.Bounce.Out);
        this.animLogoBall2 = new TweenParams(550, 250, Phaser.Easing.Bounce.Out);
        this.animLogoBall3 = new TweenParams(700, 250, Phaser.Easing.Bounce.Out);
        
        this.game.load.image('logo-ball1', 'imgs/ball1.png');
        this.game.load.image('logo-ball2', 'imgs/ball2.png');
        this.game.load.image('logo-ball3', 'imgs/ball3.png');
    }
    
    create() {
        this.game.stage.backgroundColor = '#fff';
        
        let logoTextSprite = this.game.add.sprite(this.game.world.width/2, this.game.world.height, 'logo-text');
        logoTextSprite.anchor.setTo(0.5, 0);

        this.game.add.tween(logoTextSprite).to({
            y: this.game.world.height*(0.5)
        }, this.animLogoText.duration, Phaser.Easing.Quadratic.Out, true, this.animLogoText.start);
        
        
        this.createBalls();
    }
    
    update() {
        this.balls.forEach(ball => {
            ball.update();
        });
    }
    
    render() {
        
    }
};