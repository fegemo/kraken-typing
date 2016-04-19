import BigKraken from 'objects/BigKraken';

export default class MenuState extends Phaser.State {
  preload() {
    this.game.load.image('bubble-bg', 'imgs/bubble-bg.png');
    this.game.load.image('bubble-bg-smaller', 'imgs/bubble-bg-smaller.png');
    this.game.load.audio('sfx', 'sounds/audio-sprite.ogg');
    this.game.load.audio('sweet-water', 'sounds/sweet-water-by-david-szesztay.ogg');
    this.game.load.image('displacement-texture', 'imgs/displacement-texture.png');
    this.game.load.script('filter', 'scripts/DisplacementFilter.js');

    this.bigKraken = new BigKraken(this.game);
    this.bigKraken.preload();
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

    // big kraken
    this.bigKraken.create();
    this.game.time.events.add(this.game.rnd.between(3000, 4000), this.spawnBigKraken, this);

    // tried to make the logo be a mask for the bubbles, but it didnt show up
    // let bmd = this.game.make.bitmapData(this.logo.width, this.logo.height);
    // bmd.alphaMask(this.bubbleField2, this.logo);
    // this.game.add.image(this.logo.x, this.logo.y+100, bmd).anchor.setTo(0.5, 0.5);
    this.playGameText = this.createMenuItem('play', this.game.world.centerY * 1.2, this.startGame);
    // this.optionsText = this.createMenuItem('options', this.game.world.centerY * 1.4, this.options);
    // this.creditsText = this.createMenuItem('credits', this.game.world.centerY * 1.6, this.credits);

    // water effect (filter)
    if (this.game.renderType === Phaser.WEBGL) {
      this.displacementTexture = this.game.make.sprite(0, 0, 'displacement-texture').texture;
      this.displacementFilter = new PIXI.DisplacementFilter(this.displacementTexture);
      this.bubbleField1.filters = [this.displacementFilter];
      this.bubbleField2.filters = [this.displacementFilter];
      this.logo.filters = [this.displacementFilter];
      this.bigKraken.sprite.filters = [this.displacementFilter];
      this.displacementOffset = 0;
    }

    // sound effects
    this.fx = this.game.add.audio('sfx');
    this.fx = this.game.add.audio('sfx');
    this.fx.allowMultiple = true;
    this.fx.addMarker('blip', 6.0, 0.5);
    this.fx.addMarker('star', 10.0, 0.4);
    // music
    this.music = this.game.add.audio('sweet-water', 0.7, true);
    this.music.play();
  }

  render() {

  }

  update() {
    this.bgAngle += 0.001;
    this.bubbleField1.tilePosition.y -= .1;
    this.bubbleField1.tilePosition.x += Math.sin(this.bgAngle) * 0.1;

    // this.bubbleField2.tilePosition.y -= .5;
    // this.bubbleField2.tilePosition.x += Math.sin(this.bgAngle) * 0.5;

    // water effect
    if (this.game.renderType === Phaser.WEBGL) {
      this.displacementOffset += 0.1;
      this.displacementFilter.offset.x = this.displacementOffset*5;
      this.displacementFilter.offset.y = this.displacementOffset*5;
    }
  }

  spawnBigKraken() {
    var from = this.game.rnd.pick(['bottom left', 'bottom right']);
    this.bigKraken.appear(from);
    this.game.time.events.add(this.game.rnd.between(13000, 14000), this.spawnBigKraken, this);
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
    this.music.stop();
    this.fx.play('star');
    this.game.state.start('game');
  }

  options() {

  }

  credits() {

  }
};
