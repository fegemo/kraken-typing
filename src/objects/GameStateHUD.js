const PAUSE_BUTTON_DIMENSIONS = { width: 25, height: 25 };
const PAUSE_BUTTON_MARGINS = { bottom: 10, left: 5 };
const MUSIC_BUTTON_DIMENSIONS = { width: 25, height: 25 };
const MUSIC_BUTTON_MARGINS = { bottom: 10, left: PAUSE_BUTTON_DIMENSIONS.width + 5 + 5 };
const nextLevelTweensDuration = [120, 800, 200];

export default class GameStateButtons {

  constructor(game, state) {
    this.game = game;
    this.state = state;
    // this.state.spawner.onSpawningProgress.add(this.updateProgressBar, this);
  }

  preload() {
    this.game.load.image('text-game-over', 'imgs/text-game-over.png');
    this.game.load.image('text-game-paused', 'imgs/text-game-paused.png');
    this.game.load.image('progress-bar', 'imgs/progress-bar.png');
    this.game.load.spritesheet(
      'button-pause',
      'imgs/button-pause.png',
      PAUSE_BUTTON_DIMENSIONS.width,
      PAUSE_BUTTON_DIMENSIONS.height
    );
    this.game.load.spritesheet(
      'button-music',
      'imgs/button-music.png',
      MUSIC_BUTTON_DIMENSIONS.width,
      MUSIC_BUTTON_DIMENSIONS.height
    );

    this.modals = new gameModal(this.game);
  }

  create({ resumeCallback, pauseCallback, replayCallback, menuCallback, musicCallback }, context) {
    this.createGameOverModal(arguments[0], context);
    this.createGamePausedModal(arguments[0], context);
    this.createEndGameModal(arguments[0], context);

    var pauseButton = this.game.add.button(
      PAUSE_BUTTON_MARGINS.left,
      this.game.world.height - PAUSE_BUTTON_MARGINS.bottom,
      'button-pause',
      pauseCallback,
      context,
      1, 0, 1, 0
    );
    pauseButton.anchor.setTo(0, 1);
    var musicButton = this.game.add.button(
      MUSIC_BUTTON_MARGINS.left,
      this.game.world.height - MUSIC_BUTTON_MARGINS.bottom,
      'button-music',
      musicCallback,
      context,
      1, 0, 1, 0
    );
    musicButton.anchor.setTo(0, 1);

    this.createNextLevelMessage();

    // this.createLevelProgressBar();
  }

  createGameOverModal({ resumeCallback, replayCallback, menuCallback }, context) {
    this.modals.createModal({
      type: 'gameOver',
      includeBackground: true,
      itemsArr: [
        {
          type: 'image',
          content: 'text-game-over',
          offsetY: -50
        },
        {
          type: 'text',
          content: 'replay',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: -70,
          stroke: '0x000000',
          strokeThickness: 4,
          callback: replayCallback.bind(context)
        },
        {
          type: 'text',
          content: 'menu',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: 70,
          stroke: '0x000000',
          strokeThickness: 4,
          callback: menuCallback.bind(context)
        }
      ]
    });

    // hover on buttons
    let textReplay = this.modals.getModalItem('gameOver', 3);
    let textMenu = this.modals.getModalItem('gameOver', 4);
    textReplay.inputEnabled = true;
    textMenu.inputEnabled = true;

    textReplay.events.onInputOver.add(this.hoverTextButton, this, 0, textReplay);
    textMenu.events.onInputOver.add(this.hoverTextButton, this, 0, textMenu);
    textReplay.events.onInputOut.add(this.outTextButton, this, 0, textReplay);
    textMenu.events.onInputOut.add(this.outTextButton, this, 0, textMenu);
  }

  createGamePausedModal({ resumeCallback, replayCallback, menuCallback }, context) {
    this.modals.createModal({
      type: 'gamePaused',
      includeBackground: true,
      itemsArr: [
        {
          type: 'image',
          content: 'text-game-paused',
          offsetY: -50
        },
        {
          type: 'text',
          content: 'resume',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: -70,
          stroke: '0x000000',
          strokeThickness: 4,
          callback: resumeCallback.bind(context)
        },
        {
          type: 'text',
          content: 'menu',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: 70,
          stroke: '0x000000',
          strokeThickness: 4,
          callback: menuCallback.bind(context)
        }
      ]
    });

    // hover on buttons
    let textResume = this.modals.getModalItem('gamePaused', 3);
    let textMenu = this.modals.getModalItem('gamePaused', 4);
    textResume.inputEnabled = true;
    textMenu.inputEnabled = true;

    textResume.events.onInputOver.add(this.hoverTextButton, this, 0, textResume);
    textMenu.events.onInputOver.add(this.hoverTextButton, this, 0, textMenu);
    textResume.events.onInputOut.add(this.outTextButton, this, 0, textResume);
    textMenu.events.onInputOut.add(this.outTextButton, this, 0, textMenu);
  }

  createEndGameModal({ resumeCallback, replayCallback, menuCallback }, context) {
    this.modals.createModal({
      type: 'endGame',
      includeBackground: true,
      itemsArr: [
        {
          type: 'text',
          content: 'Congratulations!!\n\nGo Unleash \nYour Kraken Now',
          fontFamily: 'Chango',
          fontSize: 28,
          offsetY: -80,
          color: '0x9A22FF',
          stroke: '0x000000',
          strokeThickness: 4
        },
        {
          type: 'text',
          content: 'replay',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: -70,
          stroke: '0x000000',
          strokeThickness: 4,
          callback: replayCallback.bind(context)
        },
        {
          type: 'text',
          content: 'menu',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: 70,
          stroke: '0x000000',
          strokeThickness: 4,
          callback: menuCallback.bind(context)
        }
      ]
    });

    // hover on buttons
    let textReplay = this.modals.getModalItem('endGame', 3);
    let textMenu = this.modals.getModalItem('endGame', 4);
    textReplay.inputEnabled = true;
    textMenu.inputEnabled = true;

    textReplay.events.onInputOver.add(this.hoverTextButton, this, 0, textReplay);
    textMenu.events.onInputOver.add(this.hoverTextButton, this, 0, textMenu);
    textReplay.events.onInputOut.add(this.outTextButton, this, 0, textReplay);
    textMenu.events.onInputOut.add(this.outTextButton, this, 0, textMenu);
  }

  createNextLevelMessage() {
    const worldWidth = this.game.world.width;
    const worldHeight = this.game.world.height;

    this.nextLevelTexts = [];
    // 'Next Level!'
    this.nextLevelTexts.push(
      this.game.add.text(
        worldWidth,
        worldHeight*0.4,
        'Next level!',
        {
          font: '40px Chewy',
          color: '#333333'
        }
      )
    );

    // # (number of new level)
    this.nextLevelTexts.push(
      this.game.add.text(
        0,
        worldHeight*0.55,
        '2',
        {
          font: '55px Chewy',
          color: '#000000'
        }
      )
    );
    this.nextLevelTexts[0].anchor.setTo(0, 0.5);
    this.nextLevelTexts[1].anchor.setTo(1, 0.5);

    let tweensTargetX = [
      [worldWidth*(3/5), worldWidth*(2/5), -this.nextLevelTexts[0].width, worldWidth],
      [worldWidth*(2/5), worldWidth*(3/5), worldWidth, this.nextLevelTexts[1].widdth]
    ];

    this.nextLevelTweens = [];
    this.nextLevelTweens = this.nextLevelTexts.map((text, i) => {
      var tweenIn = this.game.add.tween(text),
        tweenMiddle = this.game.add.tween(text),
        tweenOut = this.game.add.tween(text);

      tweenIn.to({ x: tweensTargetX[i][0] }, nextLevelTweensDuration[0], Phaser.Easing.Quadratic.Out, false, 0);
      tweenMiddle.to({ x: tweensTargetX[i][1] }, nextLevelTweensDuration[1], Phaser.Easing.Linear.None, false, 0);
      tweenOut.to({ x: tweensTargetX[i][2] }, nextLevelTweensDuration[2], Phaser.Easing.Quadratic.In, false, 0);
      tweenOut.onComplete.add(() => {
        text.x = tweensTargetX[i][3];
      });

      tweenIn.chain(tweenMiddle.chain(tweenOut));
      return tweenIn;
    });
  }

  hoverTextButton(text) {
    text.fill = '#FF9649';
  }

  outTextButton(text) {
    text.fill = '#FEFF49';
  }

  showNextLevelMessage(level) {
    this.nextLevelTexts[1].text = ''+level;
    this.nextLevelTweens.forEach(tween => tween.start());
    return nextLevelTweensDuration.reduce((acum, curr) => acum+curr, 0);
  }

  // createLevelProgressBar() {
  //   this.progressBar = this.game.add.sprite(0, 0, 'progress-bar');
  //   this.progressBar.width = 0;
  //   this.progressBar.height = 5;
  //   this.progressBarTween = this.game.add.tween(this.progressBar, 100, Phaser.Easing.Quadratic.Out);
  // }
  //
  // updateProgressBar(e) {
  //   let newWidth = this.game.world.width *e.progress;
  //   this.progressBarTween.to({width: newWidth}).start();
  // }
}
