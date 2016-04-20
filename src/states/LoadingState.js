const KRAKEN_DIMENSIONS = { width: 56, height: 100 };
const LIFE_ICON_DIMENSIONS = { width: 16, height: 16 };
const TORPEDO_DIMENSIONS = { width: 16, height: 24 };
const BIG_KRAKEN_DIMENSIONS = { width: 400, height: 350 };
const PAUSE_BUTTON_DIMENSIONS = { width: 25, height: 25 };
const MUSIC_BUTTON_DIMENSIONS = { width: 25, height: 25 };

export default class LoadingState extends Phaser.State {
  preload() {
    this.game.stage.backgroundColor = '#fff';

    this.progressBarBorder = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preload-bar-border');
    this.progressBarBorder.anchor.setTo(0.5);
    this.progressBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preload-bar');
    this.progressBar.anchor.setTo(0.5);
    this.game.load.setPreloadSprite(this.progressBar);

    // splash
    this.game.load.image('logo-text', 'imgs/trio-ternura-studios.png');
    this.game.load.image('logo-ball1', 'imgs/logo-ball1.png');
    this.game.load.image('logo-ball2', 'imgs/logo-ball2.png');
    this.game.load.image('logo-ball3', 'imgs/logo-ball3.png');

    // menu
    this.game.load.image('bubble-bg', 'imgs/bubble-bg.png');
    this.game.load.image('bubble-bg-smaller', 'imgs/bubble-bg-smaller.png');
    this.game.load.audio('sfx', 'sounds/audio-sprite.ogg');
    this.game.load.audio('sweet-water', 'sounds/sweet-water-by-david-szesztay.ogg');
    this.game.load.image('displacement-texture', 'imgs/displacement-texture.png');
    this.game.load.script('filter', 'scripts/DisplacementFilter.js');
    this.game.load.spritesheet('big-kraken', 'imgs/big-kraken.png', BIG_KRAKEN_DIMENSIONS.width, BIG_KRAKEN_DIMENSIONS.height);
    this.game.load.image('bubble', 'imgs/bubble.png');

    // game
    this.game.load.spritesheet('kraken', 'imgs/kraken-sprite.png', KRAKEN_DIMENSIONS.width, KRAKEN_DIMENSIONS.height);
    this.game.load.spritesheet('kraken-particles', 'imgs/kraken-particles.png', 1, 1);
    this.game.load.image('bubble', 'imgs/bubble.png');
    this.game.load.spritesheet('life', 'imgs/life.png', LIFE_ICON_DIMENSIONS.width, LIFE_ICON_DIMENSIONS.height);
    this.game.load.image('enemy-console', 'imgs/enemy-console.png');
    this.game.load.image('enemy-instruction', 'imgs/enemy-instruction.png');
    this.game.load.image('flare', 'imgs/flare.png');
    this.game.load.image('console-piece', 'imgs/console-piece.png');
    this.game.load.image('enemy-git', 'imgs/enemy-git.png');
    this.game.load.spritesheet('star-particles', 'imgs/star-particles.png', 20, 24);
    this.game.load.image('git-piece', 'imgs/git-piece.png');
    this.game.load.spritesheet('torpedo', 'imgs/torpedo.png', TORPEDO_DIMENSIONS.width, TORPEDO_DIMENSIONS.height);
    this.game.load.spritesheet('laser', 'imgs/laser.png', TORPEDO_DIMENSIONS.width, TORPEDO_DIMENSIONS.height);
    this.game.load.spritesheet('big-boy', 'imgs/big-boy.png', TORPEDO_DIMENSIONS.width, TORPEDO_DIMENSIONS.height);
    this.game.load.image('text-game-over', 'imgs/text-game-over.png');
    this.game.load.image('text-game-paused', 'imgs/text-game-paused.png');
    this.game.load.image('progress-bar', 'imgs/progress-bar.png');
    this.game.load.spritesheet('button-pause', 'imgs/button-pause.png', PAUSE_BUTTON_DIMENSIONS.width, PAUSE_BUTTON_DIMENSIONS.height);
    this.game.load.spritesheet('button-music', 'imgs/button-music.png', MUSIC_BUTTON_DIMENSIONS.width, MUSIC_BUTTON_DIMENSIONS.height);
    this.game.load.audio('sfx', 'sounds/audio-sprite.ogg');
    this.game.load.audio('silver-ocean', 'sounds/siliver-ocean-by-mathgrant.ogg');
  }

  create() {
    this.game.state.start('menu');
  }
}
