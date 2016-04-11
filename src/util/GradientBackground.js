export default class GradientBackground {
  constructor(game) {
    this.game = game;
  }

  create(width, height, colors = [{ value: 'white', position: 0}]) {
    var bitmap = this.game.add.bitmapData(width, height);
    var grd = bitmap.context.createLinearGradient(0, 0, 0, height);

    colors.forEach(color => {
      grd.addColorStop(color.position, color.value);
    });
    bitmap.context.fillStyle = grd;
    bitmap.context.fillRect(0, 0, width, height);

    this.game.add.sprite(0, 0, bitmap);
  }
}
