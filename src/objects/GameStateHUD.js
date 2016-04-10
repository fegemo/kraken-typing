const PAUSE_BUTTON_DIMENSIONS = { width: 35, height: 33 };
const PAUSE_BUTTON_MARGINS = { bottom: 10, left: 5 };

export default class GameStateButtons {

  constructor(game) {
    this.game = game;
  }

  preload() {
    this.game.load.image('text-game-over', 'imgs/text-game-over.png');
    this.game.load.image('text-game-paused', 'imgs/text-game-paused.png');
    this.game.load.spritesheet(
      'button-pause',
      'imgs/button-pause.png',
      PAUSE_BUTTON_DIMENSIONS.width,
      PAUSE_BUTTON_DIMENSIONS.height
    );

    this.modals = new gameModal(this.game);
  }

  create({ resumeCallback, pauseCallback, replayCallback, menuCallback }, context) {
    this.createGameOverModal(arguments[0], context);
    this.createGamePausedModal(arguments[0], context);

    var pauseButton = this.game.add.button(
      PAUSE_BUTTON_MARGINS.left,
      this.game.world.height - PAUSE_BUTTON_MARGINS.bottom,
      'button-pause',
      pauseCallback,
      context,
      1, 0, 1, 0
    );
    pauseButton.anchor.setTo(0, 1);

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
          stroke: "0x000000",
          strokeThickness: 9,
          callback: replayCallback
        },
        {
          type: 'text',
          content: 'menu',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: 70,
          stroke: "0x000000",
          strokeThickness: 9,
          callback: menuCallback
        }
      ]
    });

    // hover on buttons
    let textReplay = this.modals.getModalItem('gameOver', 3);
    let textMenu = this.modals.getModalItem('gameOver', 4);
    textReplay.inputEnabled = true;
    textMenu.inputEnabled = true;

    textReplay.events.onInputOver.add(this.hoverText, this, 0, textReplay);
    textMenu.events.onInputOver.add(this.hoverText, this, 0, textMenu);
    textReplay.events.onInputOut.add(this.outText, this, 0, textReplay);
    textMenu.events.onInputOut.add(this.outText, this, 0, textMenu);
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
          strokeThickness: 9,
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
          strokeThickness: 9,
          callback: menuCallback
        }
      ]
    });

    // hover on buttons
    let textResume = this.modals.getModalItem('gameOver', 3);
    let textMenu = this.modals.getModalItem('gameOver', 4);
    textResume.inputEnabled = true;
    textMenu.inputEnabled = true;

    textResume.events.onInputOver.add(this.hoverText, this, 0, textResume);
    textMenu.events.onInputOver.add(this.hoverText, this, 0, textMenu);
    textResume.events.onInputOut.add(this.outText, this, 0, textResume);
    textMenu.events.onInputOut.add(this.outText, this, 0, textMenu);
  }

  hoverText(text) {
    text.fill = '#FF9649';
  }

  outText(text) {
    text.fill = '#FEFF49';
  }
}
