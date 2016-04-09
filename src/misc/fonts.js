// Google Web Fonts script will look for a global object with this name
export default function(global, game) {
  global.WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text
    // the first time it's created.
    // active: function() {
    //   game.time.events.add(Phaser.Timer.SECOND, createText, this);
    // },

    google: {
      families: ['Ubuntu Mono']
    }
  };
}
