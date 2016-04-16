export default class MenuState extends Phaser.State {
  preload() {
    this.game.load.image('bubble-bg', 'imgs/bubble-bg.png');
    this.game.load.image('bubble-bg-smaller', 'imgs/bubble-bg-smaller.png');
  }

  create() {
    this.game.stage.backgroundColor = '#fff';

    this.bubbleField1 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bubble-bg');
    this.bubbleField2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bubble-bg-smaller');
    this.bgAngle = 0;

    this.logo = this.game.add.text(
      this.game.world.centerX, this.game.world.centerY * 0.8,
      'Kraken\nTyping');
    this.logo.anchor.setTo(0.5, 0.5);
    this.logo.fontSize = 42;
    this.logo.lineSpacing = -33;
    this.logo.align = 'center';
    this.logo.font = 'Chango';
    this.logo.fontWeight = 'normal';

    // let grd = this.logo.context.createLinearGradient(0, 0, this.logo.width*0.75, this.logo.height*0.9);
    let grd = this.logo.context.createLinearGradient(0, 0, 0, this.logo.height);
    grd.addColorStop(0, '#00FFFF');
    grd.addColorStop(1, '#B200FF');

    this.logo.fill = grd;
    this.logo.strokeThickness = 15;
    this.logo.stroke = '#111';
    this.logo.margin = new Phaser.Point(0,20);

    // tried to make the logo be a mask for the bubbles, but it didnt show up
    // let bmd = this.game.make.bitmapData(this.logo.width, this.logo.height);
    // bmd.alphaMask(this.bubbleField2, this.logo);
    // this.game.add.image(this.logo.x, this.logo.y+100, bmd).anchor.setTo(0.5, 0.5);
    this.playGameText = this.createMenuItem('play', this.game.world.centerY * 1.2, this.startGame);
    this.optionsText = this.createMenuItem('options', this.game.world.centerY * 1.4, this.options);
    this.creditsText = this.createMenuItem('credits', this.game.world.centerY * 1.6, this.credits);
  }

  render() {

  }

  update() {
    this.bgAngle += 0.001;
    this.bubbleField1.tilePosition.y -= .1;
    this.bubbleField1.tilePosition.x += Math.sin(this.bgAngle) * 0.1;

    this.bubbleField2.tilePosition.y -= .5;
    this.bubbleField2.tilePosition.x += Math.sin(this.bgAngle) * 0.5;
  }

  createMenuItem(text, y, actionCallback) {
    let t = this.game.add.text(this.game.world.centerX, y, text);
    t.anchor.setTo(0.5, 0.5);
    t.font = 'Chango';
    t.fontSize = 28;
    t.fill = '#FEFF49';
    t.stroke = '#000000';
    t.strokeThickness = 9;
    t.inputEnabled = true;
    t.events.onInputDown.add(actionCallback, this);
    t.events.onInputOver.add(() => {
      t.fill = '#FF9649';
      this.game.canvas.style.cursor = 'pointer';
    }, this);
    t.events.onInputOut.add(() => {
      t.fill = '#FEFF49';
      this.game.canvas.style.cursor = 'initial';
    }, this);
    t.cursor = 'pointer';
  }

  startGame() {
    this.game.state.start('game');
  }

  options() {

  }

  credits() {

  }
};
