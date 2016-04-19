(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function agePreviousDescriptions(logEl) {
  var oldDescriptions = Array.from(logEl.querySelectorAll('p'));
  oldDescriptions.forEach(function (p) {
    return p.classList.add('aged');
  });
}

function insertNewDescriptionInLog(logEl, html) {
  var descriptionEl = document.createElement('p');
  logEl.insertBefore(descriptionEl, logEl.firstChild);
  descriptionEl.innerHTML = html;
  descriptionEl.style.opacity = 0;
  window.getComputedStyle(descriptionEl).opacity;
  descriptionEl.style.opacity = 1;
}

function tutorial(gameState) {
  gameState.pauseGame();
  tutorialAppeared = true;
}

var tutorialAppeared = false;
var originalFigureElClasses = void 0;
var originalLogContent = void 0;

document.addEventListener('DOMContentLoaded', function (event) {
  var figureEl = document.querySelector('#git-kraken-figure'),
      logEl = document.querySelector('#git-kraken-log');

  // saves the class names initially added to the figureEl
  originalFigureElClasses = figureEl.className;
  // and the content of the log
  originalLogContent = logEl.innerHTML;
});

exports.default = {
  animate: function animate(name) {
    var figureEl = document.querySelector('#git-kraken-figure'),
        logEl = document.querySelector('#git-kraken-log'),
        leftArrowEl = document.querySelector('#gkui-arrow-1'),
        rightArrowEl = document.querySelector('#gkui-arrow-2');

    if (!tutorialAppeared) {
      tutorial(this);
    }

    // puts a class with the name as the command on the figure element (top-most)
    figureEl.classList.add(name);

    // makes current paragraphs gray
    agePreviousDescriptions(logEl);

    switch (name) {
      case 'git-init':
        leftArrowEl.innerText = 'Init a repo here!';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Start a fresh repo and also choose a license and a starting <code>.gitignore</code>');
        break;

      case 'git-clone':
        leftArrowEl.innerText = 'Clone a repo here!';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Connect to GitHub &amp; BitBucket to clone straight from them. No keyboard expertise required.');
        break;

      case 'git-tag':
        leftArrowEl.innerText = 'See/create tags here';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Create, delete and check for tags here.');
        break;

      case 'git-checkout':
        leftArrowEl.innerText = 'Switch branches here';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Change the current branch, delete or create new ones here.');
        break;

      case 'git-show':
        leftArrowEl.innerText = '';
        rightArrowEl.innerText = 'Inspect a commit';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'See the details of a previous commit here.');
        break;

      case 'git-commit':
        leftArrowEl.innerText = '';
        rightArrowEl.innerText = 'Add stuff and commit';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'View the diff, add files and commit, everything here!');
        break;

      case 'git-remote':
        leftArrowEl.innerText = 'Remote repos';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Set up and view remote repos easily.');
        break;

      case 'git-log':
        leftArrowEl.innerText = '';
        rightArrowEl.innerText = 'Graphical logs';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'See what\'s going on the repo through logs showing commits and branches.');
        insertNewDescriptionInLog(logEl, '<a id="gk-download" href="http://gitkraken.com" target="_blank">Unleash the Kraken</a>');
        break;
    }
  },

  reset: function reset() {
    var figureEl = document.querySelector('#git-kraken-figure'),
        logEl = document.querySelector('#git-kraken-log'),
        leftArrowEl = document.querySelector('#gkui-arrow-1'),
        rightArrowEl = document.querySelector('#gkui-arrow-2');

    // puts its original class back to it, removing all others
    figureEl.className = originalFigureElClasses;
    logEl.innerHTML = originalLogContent;

    leftArrowEl.innerHTML = '';
    rightArrowEl.innerHTML = '';
  }
};

},{}],2:[function(require,module,exports){
'use strict';

var _MenuState = require('states/MenuState');

var _MenuState2 = _interopRequireDefault(_MenuState);

var _GameState = require('states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

var _SplashState = require('states/SplashState');

var _SplashState2 = _interopRequireDefault(_SplashState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, 350, 600, Phaser.AUTO, 'game', null));

    _this.state.add('splash', _SplashState2.default, false);
    _this.state.add('menu', _MenuState2.default, false);
    _this.state.add('game', _GameState2.default, false);
    _this.state.start('menu');
    return _this;
  }

  return Game;
}(Phaser.Game);

var game = new Game();

},{"states/GameState":15,"states/MenuState":16,"states/SplashState":17}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  regular: {
    // 2 to 3 letters
    short: [{ cmd: 'cd', os: 'windows' }, { cmd: 'cd', os: 'linux' }, { cmd: 'dir', os: 'windows' }, { cmd: 'ls', os: 'linux' }, { cmd: 'dir', os: 'windows' }, { cmd: 'top', os: 'linux' }, { cmd: 'pwd', os: 'linux' }, { cmd: 'cd ..', os: 'windows' }, { cmd: 'cd ..', os: 'linux' }, { cmd: 'del', os: 'windows' }, { cmd: 'md', os: 'windows' }, { cmd: 'cp', os: 'linux' }, { cmd: 'rm', os: 'linux' }, { cmd: 'tar', os: 'linux' }, { cmd: 'cd', os: 'windows' }, { cmd: 'tar', os: 'linux' }, { cmd: 'cat', os: 'linux' }, { cmd: 'clear', os: 'linux' }, { cmd: 'cls', os: 'windows' }, { cmd: 'cat', os: 'linux' }, { cmd: 'sed', os: 'linux' }, { cmd: 'sh', os: 'linux' }, { cmd: 'ps', os: 'linux' }, { cmd: 'aux', os: 'linux' }, { cmd: 'zip', os: 'windows' }],

    // 4 to 6
    mid: [{ cmd: 'apm', os: 'windows' }, { cmd: 'apt-get', os: 'linux' }, { cmd: 'sudo', os: 'linux' }, { cmd: 'brew', os: 'osx' }, { cmd: 'kill', os: 'linux' }, { cmd: 'grep', os: 'linux' }, { cmd: 'date', os: 'linux' }, { cmd: 'echo', os: 'linux' }, { cmd: 'head', os: 'linux' }, { cmd: 'tail', os: 'linux' }, { cmd: 'more', os: 'linux' }, { cmd: 'less', os: 'linux' }, { cmd: 'man', os: 'linux' }, { cmd: 'which', os: 'linux' }, { cmd: 'mkdir', os: 'linux' }, { cmd: 'touch', os: 'osx' }, { cmd: 'cd ..', os: 'windows' }, { cmd: 'copy', os: 'windows' }, { cmd: 'chkdsk', os: 'windows' }, { cmd: 'cd ..', os: 'linux' }, { cmd: 'nstat', os: 'linux' }, { cmd: 'open', os: 'linux' }, { cmd: 'rename', os: 'linux' }, { cmd: 'source', os: 'linux' }, { cmd: 'telnet', os: 'linux' }, { cmd: 'ping', os: 'windows' }, { cmd: 'ping', os: 'linux' }, { cmd: 'time', os: 'linux' }, { cmd: 'type', os: 'linux' }, { cmd: 'wget', os: 'linux' }, { cmd: 'curl', os: 'linux' }, { cmd: 'whoami', os: 'linux' }],

    // more than 6 letters
    large: [{ cmd: 'whereis', os: 'osx' }, { cmd: 'format C:', os: 'windows' }, { cmd: 'apt-get install', os: 'linux' }, { cmd: 'shutdown', os: 'linux' }, { cmd: 'shutdown', os: 'windows' }, { cmd: 'ipconfig', os: 'windows' }, { cmd: 'ifconfig', os: 'linux' }, { cmd: 'cd ../../', os: 'osx' }, { cmd: 'apt-cache search', os: 'linux' }, { cmd: 'brew install', os: 'osx' }, { cmd: 'mv ../ .', os: 'linux' }, { cmd: 'copy ../ .', os: 'windows' }, { cmd: 'cd ..', os: 'osx' }]
  }
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _database = require('levels/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var level0 = {
  initialMinInterval: 500,
  finalMinInterval: 300,

  initialMaxInterval: 300,
  finalMaxInterval: 500,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.2,

  waves: [{
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 5,
      git: {
        name: 'git-init',
        cmd: 'git init',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 2,
      git: {
        name: 'git-clone',
        cmd: 'git clone',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 2,
      git: {
        name: 'git-tag',
        cmd: 'git tag',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 2,
      git: {
        name: 'git-checkout',
        cmd: 'git checkout',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 2,
      git: {
        name: 'git-show',
        cmd: 'git show HEAD~4',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 2,
      git: {
        name: 'git-commit',
        cmd: 'git commit -am "yikes"',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 2,
      git: {
        name: 'git-remote',
        cmd: 'git remote add origin bitbucket.org',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 2,
      git: {
        name: 'git-log',
        cmd: 'git log --graph --all --oneline',
        atProgress: 0.4
      }
    }
  }]
};

var level1 = {
  initialMinInterval: 1500,
  finalMinInterval: 1300,

  initialMaxInterval: 3300,
  finalMaxInterval: 2500,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.2,

  waves: [{
    type: 'instructions',
    delayAfter: 0,
    enemies: {
      exactly: ['type', 'to', 'shoot', 'at', 'us']
    }
  }, {
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 3
    }
  }, {
    type: 'instructions',
    delayAfter: 0,
    enemies: {
      exactly: ['see', 'how', 'easy', 'that', 'was?']
    }
  }, {
    type: 'console',
    delayAfter: 200,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 6
    }
  }, {
    type: 'console',
    delayAfter: 1000,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 8
    }
  }]
};

var level2 = {
  initialMinInterval: 1400,
  finalMinInterval: 1100,

  initialMaxInterval: 3200,
  finalMaxInterval: 2400,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.25,

  waves: [{
    type: 'instructions',
    delayAfter: 200,
    enemies: {
      exactly: ['kill', 'git', 'cmds', 'for', 'prizes']
    }
  }, {
    type: 'console',
    delayAfter: 1500,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 4,
      git: {
        name: 'git-init',
        cmd: 'git init',
        atProgress: 0.7
      }
    }
  }, {
    type: 'instructions',
    delayAfter: 200,
    enemies: {
      exactly: ['keep', 'it', 'going', 'till', 'the', 'end']
    }
  }, {
    type: 'console',
    delayAfter: 800,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 6
    }
  }, {
    type: 'console',
    delayAfter: 1000,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 2,
      git: {
        name: 'git-clone',
        cmd: 'git clone',
        atProgress: 0.4
      }
    }
  }]
};

var level3 = {
  initialMinInterval: 1300,
  finalMinInterval: 900,

  initialMaxInterval: 3000,
  finalMaxInterval: 2000,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.3,

  waves: [{
    type: 'instructions',
    delayAfter: 0,
    enemies: {
      exactly: ['good', 'job', 'over', 'there']
    }
  }, {
    type: 'console',
    delayAfter: 400,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 6
    }
  }, {
    type: 'console',
    delayAfter: 1500,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 6,
      git: {
        name: 'git-tag',
        cmd: 'git tag',
        atProgress: 0.8
      }
    }
  }, {
    type: 'console',
    delayAfter: 1000,
    enemies: {
      fromPool: _database2.default.regular.large,
      quantity: 3
    }
  }, {
    type: 'console',
    delayAfter: 800,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 4,
      git: {
        name: 'git-checkout',
        cmd: 'git checkout master',
        atProgress: 0.5
      }
    }
  }]
};

var level4 = {
  initialMinInterval: 1100,
  finalMinInterval: 800,

  initialMaxInterval: 2600,
  finalMaxInterval: 1800,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.35,

  waves: [{
    type: 'console',
    delayAfter: 0,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 8
    }
  }, {
    type: 'console',
    delayAfter: 800,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 4
    }
  }, {
    type: 'console',
    delayAfter: 1500,
    enemies: {
      fromPool: _database2.default.regular.large,
      quantity: 4,
      git: {
        name: 'git-show',
        cmd: 'git show HEAD~4',
        atProgress: 0.7
      }
    }
  }, {
    type: 'console',
    delayAfter: 200,
    enemies: {
      fromPool: _database2.default.regular.large,
      quantity: 2
    }
  }, {
    type: 'console',
    delayAfter: 1500,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 4,
      git: {
        name: 'git-commit',
        cmd: 'git commit -am "yikes"',
        atProgress: 0.7
      }
    }
  }]
};

var level5 = {
  initialMinInterval: 1000,
  finalMinInterval: 700,

  initialMaxInterval: 2200,
  finalMaxInterval: 1400,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.45,

  waves: [{
    type: 'instructions',
    delayAfter: 10,
    enemies: {
      exactly: ['you', 'are', 'almost', 'there...']
    }
  }, {
    type: 'console',
    delayAfter: 1200,
    enemies: {
      fromPool: _database2.default.regular.mid,
      quantity: 7
    }
  }, {
    type: 'console',
    delayAfter: 1500,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 5,
      git: {
        name: 'git-remote',
        cmd: 'git remote add origin bitbucket.org',
        atProgress: 0.4
      }
    }
  }, {
    type: 'console',
    delayAfter: 600,
    enemies: {
      fromPool: _database2.default.regular.large,
      quantity: 7
    }
  }, {
    type: 'console',
    delayAfter: 1000,
    enemies: {
      fromPool: _database2.default.regular.short,
      quantity: 6
    }
  }, {
    type: 'console',
    delayAfter: 1500,
    enemies: {
      fromPool: _database2.default.regular.large,
      quantity: 4,
      git: {
        name: 'git-log',
        cmd: 'git log --graph --all --oneline',
        atProgress: 0.4
      }
    }
  }]
};

exports.default = [
// level0,
level1, level2, level3, level4, level5];

},{"levels/database":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BIG_KRAKEN_DIMENSIONS = { width: 400, height: 350 };

var BigKraken = function () {
  function BigKraken(game) {
    _classCallCheck(this, BigKraken);

    this.game = game;
  }

  _createClass(BigKraken, [{
    key: 'preload',
    value: function preload() {
      this.game.load.spritesheet('big-kraken', 'imgs/big-kraken.png', BIG_KRAKEN_DIMENSIONS.width, BIG_KRAKEN_DIMENSIONS.height);
      this.game.load.image('bubble', 'imgs/bubble.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.sprite = this.game.add.sprite(this.game.world.width + BIG_KRAKEN_DIMENSIONS.width / 2, this.game.world.height + BIG_KRAKEN_DIMENSIONS.height / 2, 'big-kraken');
      this.sprite.anchor.setTo(0.5, 0.5);
      this.sprite.tint = 0xbbbbbb;
      this.bubbles = this.game.add.emitter(0, 0, 8);
      this.bubbles.setAlpha(0.7, 0, 1500);
      this.bubbles.minParticleScale = 0.4;
      this.bubbles.maxParticleScale = 1.0;
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'appear',
    value: function appear(from) {
      var _this = this;

      var initialPositionX, initialPositionY, targetPositionX, targetPositionY, floatingOffsetX, floatingOffsetY, angle, bubblePositionX, bubblePositionY;
      var appearTween = this.game.add.tween(this.sprite);
      var disappearTween = this.game.add.tween(this.sprite);
      var hoveringTween = this.game.add.tween(this.sprite);
      this.sprite.frame = 0;
      //TODO: refactor lotsa code here...
      // - get angle from Math.atan2
      // - mirror right/left, top/bottom values
      // - remove magic numbers for durations
      switch (from) {
        case 'bottom right':
          initialPositionX = this.game.world.width + BIG_KRAKEN_DIMENSIONS.width / 2;
          initialPositionY = this.game.world.height + BIG_KRAKEN_DIMENSIONS.height / 2;
          targetPositionX = this.game.world.width - BIG_KRAKEN_DIMENSIONS.width * 0.25;
          targetPositionY = this.game.world.height - BIG_KRAKEN_DIMENSIONS.height * 0.25;
          floatingOffsetX = this.game.world.width * (1 / 30);
          floatingOffsetY = this.game.world.height * (1 / 30);
          bubblePositionX = this.game.world.width;
          bubblePositionY = this.game.world.height;
          angle = -45;
          break;
        case 'bottom left':
          initialPositionX = -BIG_KRAKEN_DIMENSIONS.width / 2;
          initialPositionY = this.game.world.height + BIG_KRAKEN_DIMENSIONS.height / 2;
          targetPositionX = BIG_KRAKEN_DIMENSIONS.width * 0.25;
          targetPositionY = this.game.world.height - BIG_KRAKEN_DIMENSIONS.height * 0.25;
          floatingOffsetX = -this.game.world.width * (1 / 30);
          floatingOffsetY = this.game.world.height * (1 / 30);
          bubblePositionX = 0;
          bubblePositionY = this.game.world.height;
          angle = 45;
          break;
        case 'top right':
          initialPositionX = this.game.world.width + BIG_KRAKEN_DIMENSIONS.width / 2;
          initialPositionY = -BIG_KRAKEN_DIMENSIONS.height / 2;
          targetPositionX = this.game.world.width - BIG_KRAKEN_DIMENSIONS.width * 0.25;
          targetPositionY = BIG_KRAKEN_DIMENSIONS.height * 0.25;
          floatingOffsetX = this.game.world.width * (1 / 30);
          floatingOffsetY = -this.game.world.height * (1 / 30);
          bubblePositionX = this.game.world.width;
          bubblePositionY = 0;
          angle = -45 * 3;
          break;
        case 'top left':
          initialPositionX = -BIG_KRAKEN_DIMENSIONS.width / 2;
          initialPositionY = -BIG_KRAKEN_DIMENSIONS.height / 2;
          targetPositionX = BIG_KRAKEN_DIMENSIONS.width * 0.25;
          targetPositionY = BIG_KRAKEN_DIMENSIONS.height * 0.25;
          floatingOffsetX = -this.game.world.width * (1 / 30);
          floatingOffsetY = -this.game.world.height * (1 / 30);
          bubblePositionX = 0;
          bubblePositionY = 0;
          angle = 45 * 3;
          break;
      }
      this.sprite.x = initialPositionX;
      this.sprite.y = initialPositionY;
      this.sprite.angle = angle;
      appearTween.to({ x: targetPositionX, y: targetPositionY }, 200, Phaser.Easing.Quadratic.Out, false);
      disappearTween.to({ x: initialPositionX, y: initialPositionY }, 200, Phaser.Easing.Quadratic.In, false);
      hoveringTween.to({
        x: targetPositionX + floatingOffsetX,
        y: targetPositionY + floatingOffsetY
      }, 1000, Phaser.Easing.Quadratic.InOut, false, 0, 0, true);
      appearTween.chain(hoveringTween.chain(disappearTween)).start();

      // configures timer to change to frame of happy kraken
      this.game.time.events.add(1.25 * 1000, function () {
        return _this.sprite.frame = 1;
      }, this);

      // configures/starts the bubble emitter
      this.bubbles.makeParticles('bubble');
      this.bubbles.gravity = -200;
      this.bubbles.x = bubblePositionX;
      this.bubbles.y = bubblePositionY;
      var baseBubbleSpeedX = targetPositionX - initialPositionX;
      var baseBubbleSpeedY = targetPositionY - initialPositionY;
      this.bubbles.minParticleSpeed.setTo(baseBubbleSpeedX / 2, baseBubbleSpeedY / 2);
      this.bubbles.maxParticleSpeed.setTo(baseBubbleSpeedX, baseBubbleSpeedY);
      this.bubbles.start(false, 1500, 45, 30);
    }
  }]);

  return BigKraken;
}();

exports.default = BigKraken;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DISTANCE_FROM_SPRITE_TO_TEXT = 8;
var COLOR_OF_CURRENT_CHARACTER = '#ff00ff';
var COLOR_OF_REGULAR_CHARACTER = '#000000';
var BASE_Y_SPEED = 30;
var CONSTANT_SPEED_INSTRUCTION_ENEMY = 30;

var Enemy = function () {
  function Enemy(game, state, text, x, y, name) {
    _classCallCheck(this, Enemy);

    this.game = game;
    this.state = state;
    this.originalText = text;
    this.position = new Phaser.Point(x, y);
    this.name = name;
    this.lives = text.replace(/ /g, '').length;
    this.baseYSpeed = BASE_Y_SPEED / Math.max(1, Math.floor(this.lives / 3));
    this._indexOffirstAliveChar = 0;
    this.uponDeath = function () {};
  }

  _createClass(Enemy, [{
    key: 'create',
    value: function create() {
      this.sprite = this.game.add.sprite(this.position.x, this.position.y, this.spriteImage);
      this.sprite.anchor.setTo(0.5, 1);
      this.sprite.entity = this;
      this.state.enemies.add(this.sprite);

      this.textContent = this.game.add.text(0, DISTANCE_FROM_SPRITE_TO_TEXT, this.originalText);
      this.textContent.anchor.setTo(0.5, 0.5);
      this.sprite.addChild(this.textContent);

      this.textContent.font = 'Ubuntu Mono';
      this.textContent.fontSize = 12;
      this.textContent.fill = COLOR_OF_REGULAR_CHARACTER;

      this.defineSpeed();
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'defineSpeed',
    value: function defineSpeed() {
      // abstract method
    }
  }, {
    key: 'deathAnimation',
    value: function deathAnimation() {
      // abstract method
    }
  }, {
    key: 'hitAnimation',
    value: function hitAnimation() {
      // abstract method;
    }
  }, {
    key: 'wrongKeyPressed',
    value: function wrongKeyPressed() {
      this.game.add.tween(this.textContent.scale).from({ x: 1.45, y: 1.45 }, 100, Phaser.Easing.Quadratic.Out, 0).start();
    }
  }, {
    key: 'killChar',
    value: function killChar() {
      // updates the index that points to the first alive character
      while (this.originalText[++this._indexOffirstAliveChar] === ' ') {}

      // updates the text by replacing killed chars with spaces
      this.textContent.text = this.originalText.replace(this.originalText.substr(0, this._indexOffirstAliveChar), ' '.repeat(this._indexOffirstAliveChar));

      // updates the colors so the first alive char has a different color
      this.textContent.addColor(COLOR_OF_CURRENT_CHARACTER, this._indexOffirstAliveChar);
      this.textContent.addColor(COLOR_OF_REGULAR_CHARACTER, this._indexOffirstAliveChar + 1);

      return !this.hasMoreChars;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this = this;

      while (this.hasMoreChars) {
        this.killChar();
      }
      this.textContent.destroy();

      // calls the anim for death - leaves for child classes to implement
      this.deathAnimation(function () {
        // the enemy might have something to do upon its death
        _this.uponDeath();

        // wanted to call this.sprite.destroy() instead of .kill(),
        // but it was raising an exception
        _this.sprite.parent.remove(_this.sprite, false);
        _this.sprite.kill();
      }, this);
    }
  }, {
    key: 'hitByTorpedo',
    value: function hitByTorpedo(destroyedCallback, context) {
      this.lives--;
      this.hitAnimation();
      return this.lives <= 0;
    }
  }, {
    key: 'spriteImage',
    get: function get() {
      // abstract method
      return 'null';
    }
  }, {
    key: 'torpedoSoundSprite',
    get: function get() {
      // abstract
      return 'null';
    }
  }, {
    key: 'explosionSoundSprite',
    get: function get() {
      // abstract
      return 'null';
    }
  }, {
    key: 'hasMoreChars',
    get: function get() {
      return this._indexOffirstAliveChar < this.originalText.length;
    }
  }, {
    key: 'currentChar',
    get: function get() {
      return this.originalText[this._indexOffirstAliveChar];
    }
  }], [{
    key: 'preload',
    value: function preload(game) {
      // console & instruction enemy
      game.load.image('enemy-console', 'imgs/enemy-console.png');
      game.load.image('enemy-instruction', 'imgs/enemy-instruction.png');
      game.load.image('flare', 'imgs/flare.png');
      game.load.image('console-piece', 'imgs/console-piece.png');
      // git enemy
      game.load.image('enemy-git', 'imgs/enemy-git.png');
      game.load.spritesheet('star-particles', 'imgs/star-particles.png', 20, 24);
      game.load.image('git-piece', 'imgs/git-piece.png');
    }
  }]);

  return Enemy;
}();

exports.default = Enemy;

var InstructionEnemy = exports.InstructionEnemy = function (_Enemy) {
  _inherits(InstructionEnemy, _Enemy);

  function InstructionEnemy() {
    _classCallCheck(this, InstructionEnemy);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InstructionEnemy).apply(this, arguments));
  }

  _createClass(InstructionEnemy, [{
    key: 'create',
    value: function create() {
      _get(Object.getPrototypeOf(InstructionEnemy.prototype), 'create', this).call(this);
      this.flare = this.game.add.emitter(0, 0, 10);
      this.flare.makeParticles('flare', 0);
      this.flare.gravity = 150;
      this.flare.y = -this.sprite.height / 2;
      this.flare.setAlpha(0.4, 0, 800);
      this.flare.minParticleSpeed = new Phaser.Point(-300, -50);
      this.flare.maxParticleSpeed = new Phaser.Point(+300, +50);
    }
  }, {
    key: 'defineSpeed',
    value: function defineSpeed() {
      this.sprite.body.velocity.x = 0;
      this.sprite.body.velocity.y = CONSTANT_SPEED_INSTRUCTION_ENEMY * 4;
    }
  }, {
    key: 'update',
    value: function update() {
      _get(Object.getPrototypeOf(InstructionEnemy.prototype), 'update', this).call(this);
      if (this.sprite.body.velocity.y > CONSTANT_SPEED_INSTRUCTION_ENEMY) {
        this.sprite.body.velocity.y--;
      }
    }
  }, {
    key: 'deathAnimation',
    value: function deathAnimation(onCompleteCallback, context) {
      var _this3 = this;

      var expandTween = this.game.add.tween(this.sprite.scale);
      var contractTween = this.game.add.tween(this.sprite.scale);

      expandTween.to({ x: 2, y: 0.25 }, 150, Phaser.Easing.Quadratic.Out);
      contractTween.to({ x: 0.1, y: 1.5 }, 75, Phaser.Easing.Quadratic.Out);
      contractTween.onComplete.addOnce(function () {
        _this3.flare.start(true, 800, null, 10);
        onCompleteCallback.call(context);
      });

      this.flare.x = this.sprite.x;
      this.flare.y = this.sprite.y;
      expandTween.chain(contractTween).start();
    }
  }, {
    key: 'spriteImage',
    get: function get() {
      return 'enemy-instruction';
    }
  }, {
    key: 'type',
    get: function get() {
      return 'instruction';
    }
  }, {
    key: 'torpedoType',
    get: function get() {
      return 'laser';
    }
  }, {
    key: 'torpedoSoundSprite',
    get: function get() {
      return 'laserX';
    }
  }, {
    key: 'explosionSoundSprite',
    get: function get() {
      return 'disappearingX';
    }
  }]);

  return InstructionEnemy;
}(Enemy);

var ConsoleEnemy = exports.ConsoleEnemy = function (_Enemy2) {
  _inherits(ConsoleEnemy, _Enemy2);

  function ConsoleEnemy() {
    _classCallCheck(this, ConsoleEnemy);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleEnemy).apply(this, arguments));
  }

  _createClass(ConsoleEnemy, [{
    key: 'create',
    value: function create() {
      _get(Object.getPrototypeOf(ConsoleEnemy.prototype), 'create', this).call(this);
      // console pieces emitter
      this.flare = this.game.add.emitter(0, 0, this.lives * 2 + 15);
      this.flare.makeParticles(this.explosionSpriteImage, 0);
      this.flare.gravity = 150;
      this.flare.y = -this.sprite.height / 2;
      this.flare.setAlpha(1.0, 0, 800);
      this.flare.minParticleSpeed = new Phaser.Point(-120, -150);
      this.flare.maxParticleSpeed = new Phaser.Point(+120, -50);
    }
  }, {
    key: 'defineSpeed',
    value: function defineSpeed() {
      // speed towards player
      var xDistanceToPlayer = this.state.player.sprite.x - this.position.x;
      var yDistanceToPlayer = this.state.player.sprite.y - this.position.y;

      var ySpeed = this.baseYSpeed * this.speedMultiplier;
      var timeToImpact = yDistanceToPlayer / ySpeed;
      var xSpeed = xDistanceToPlayer / timeToImpact;
      this.sprite.body.velocity.x = xSpeed;
      this.sprite.body.velocity.y = ySpeed;
    }
  }, {
    key: 'deathAnimation',
    value: function deathAnimation(onCompleteCallback, context) {
      this.flare.x = this.sprite.x;
      this.flare.y = this.sprite.y;
      this.flare.start(true, 800, null, 10);
      if (onCompleteCallback) {
        onCompleteCallback.call(context);
      }
    }
  }, {
    key: 'hitAnimation',
    value: function hitAnimation() {
      for (var i = this.game.rnd.between(1, 2); i > 0; i--) {
        this.flare.emitParticle(this.sprite.x, this.sprite.y - this.sprite.height / 2);
      }
    }
  }, {
    key: 'spriteImage',
    get: function get() {
      return 'enemy-console';
    }
  }, {
    key: 'type',
    get: function get() {
      return 'console';
    }
  }, {
    key: 'torpedoType',
    get: function get() {
      return 'torpedo';
    }
  }, {
    key: 'explosionSpriteImage',
    get: function get() {
      return 'console-piece';
    }
  }, {
    key: 'torpedoSoundSprite',
    get: function get() {
      return 'torpedoX';
    }
  }, {
    key: 'explosionSoundSprite',
    get: function get() {
      return 'explosionX';
    }
  }, {
    key: 'speedMultiplier',
    get: function get() {
      return this._speedMultiplier || 1;
    },
    set: function set(mul) {
      this._speedMultiplier = mul;
    }
  }]);

  return ConsoleEnemy;
}(Enemy);

var GitEnemy = exports.GitEnemy = function (_ConsoleEnemy) {
  _inherits(GitEnemy, _ConsoleEnemy);

  function GitEnemy() {
    _classCallCheck(this, GitEnemy);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GitEnemy).apply(this, arguments));
  }

  _createClass(GitEnemy, [{
    key: 'create',
    value: function create() {
      this.baseYSpeed = BASE_Y_SPEED / 2;
      _get(Object.getPrototypeOf(GitEnemy.prototype), 'create', this).call(this);
      this.sprite.scale.setTo(1.25, 1.25);
      this.stars = this.game.add.emitter(0, 0, 30);
      this.sprite.addChild(this.stars);
      this.stars.makeParticles('star-particles', [0, 1, 2, 3, 4, 5, 6, 7]);
      this.stars.setAlpha(0.55, 0, 700);
      this.stars.minParticleScale = 0.5;
      this.stars.maxParticleScale = 1.0;
      this.stars.minParticleSpeed.setTo(0, -80);
      this.stars.maxParticleSpeed.setTo(0, -120);

      this.stars.start(false, 700, 100, 0);
    }
  }, {
    key: 'spriteImage',
    get: function get() {
      return 'enemy-git';
    }
  }, {
    key: 'torpedoType',
    get: function get() {
      return 'big-boy';
    }
  }, {
    key: 'torpedoSoundSprite',
    get: function get() {
      return 'torpedoX';
    }
  }, {
    key: 'explosionSoundSprite',
    get: function get() {
      // abstract
      return 'star';
    }
  }, {
    key: 'explosionSpriteImage',
    get: function get() {
      return 'git-piece';
    }
  }, {
    key: 'speedMultiplier',
    get: function get() {
      // it is always 1 for git enemies
      return 1;
    },
    set: function set(mul) {
      // it is always 1 for git enemies
      this._speedMultiplier = 1;
    }
  }]);

  return GitEnemy;
}(ConsoleEnemy);

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENEMY_GIT_DIMENSIONS = exports.ENEMY_INSTRUCTIONS_DIMENSIONS = exports.ENEMY_CONSOLE_DIMENSIONS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Enemy = require('objects/Enemy');

var _Enemy2 = _interopRequireDefault(_Enemy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ENEMY_CONSOLE_DIMENSIONS = exports.ENEMY_CONSOLE_DIMENSIONS = { width: 30, height: 30 };
var ENEMY_INSTRUCTIONS_DIMENSIONS = exports.ENEMY_INSTRUCTIONS_DIMENSIONS = { width: 30, height: 30 };
var ENEMY_GIT_DIMENSIONS = exports.ENEMY_GIT_DIMENSIONS = { width: 30, height: 30 };

var EnemySpawner = function () {
  function EnemySpawner(game, state) {
    _classCallCheck(this, EnemySpawner);

    this.game = game;
    this.state = state;
    this.currentEnemy = null;
    this.spawned = 0;
    this.onSpawningProgress = new Phaser.Signal();
  }

  _createClass(EnemySpawner, [{
    key: 'preload',
    value: function preload() {
      _Enemy2.default.preload(this.game);
    }
  }, {
    key: 'create',
    value: function create() {
      this.state.enemies = this.game.add.physicsGroup();
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'update',
    value: function update() {
      this.state.enemies.iterate('alive', true, Phaser.Group.RETURN_NONE, function (enemy) {
        enemy.entity.update();
      });
    }
  }, {
    key: 'spawnEnemyAt',
    value: function spawnEnemyAt(x, y, text) {
      var typeConstr = arguments.length <= 3 || arguments[3] === undefined ? _Enemy.ConsoleEnemy : arguments[3];
      var name = arguments[4];

      // var enemyType = type === 'instruction' ? InstructionEnemy : ConsoleEnemy;
      return new typeConstr(this.game, this.state, text, x, y, name);
    }
  }, {
    key: 'spawnEnemyAtRandom',
    value: function spawnEnemyAtRandom(text) {
      var type = arguments.length <= 1 || arguments[1] === undefined ? 'console' : arguments[1];

      var xPosition = Math.random() * this.game.world.width;
      var yPosition = -32;

      return this.spawnEnemyAt(xPosition, yPosition, text, type);
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      this.spawned = 0;
    }
  }]);

  return EnemySpawner;
}();

exports.default = EnemySpawner;

},{"objects/Enemy":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GradientBackground = require('util/GradientBackground');

var _GradientBackground2 = _interopRequireDefault(_GradientBackground);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Background = function () {
  function Background(game) {
    var minTime = arguments.length <= 1 || arguments[1] === undefined ? 4000 : arguments[1];
    var maxTime = arguments.length <= 2 || arguments[2] === undefined ? 7000 : arguments[2];

    _classCallCheck(this, Background);

    this.game = game;
    this.minTime = minTime;
    this.maxTime = maxTime;
  }

  _createClass(Background, [{
    key: 'preload',
    value: function preload() {
      this.game.load.image('bubble', 'imgs/bubble.png');
      this.bg = new _GradientBackground2.default(this.game);
    }
  }, {
    key: 'create',
    value: function create() {
      // adds the bg gradient to the stage
      this.bg.create(this.game.world.width, this.game.world.height, [{
        value: '#d8f6ff',
        position: 0
      }, {
        value: '#5dc4e6',
        position: 0.8
      }]);

      // adds bubbles to the stage
      this.bubbles = this.game.add.physicsGroup();
      this.bubbles.createMultiple(32, 'bubble', false);
      this.bubbles.callAll('anchor.setTo', this, 0.5, 0.5);

      this.game.time.events.add(this.maxTime, this.spawnBubbles, this);
    }
  }, {
    key: 'spawnBubbles',
    value: function spawnBubbles() {
      var numberToSpawn = Math.floor(Math.random() * 3) + 2;
      var spawningBubbles = [];

      var xPosition = Math.random() * this.game.world.width;
      var xMirror = Math.random() < 0.5 ? -1 : 1;
      var yPosition = this.game.world.height;
      var scale = Math.random() * 0.2 + 0.5;
      var ySpeed = Math.random() * 30 + 85;
      for (var i = 0; i < numberToSpawn; i++) {
        var bubble = spawningBubbles[i] = this.bubbles.getFirstExists(false);
        if (!bubble) {
          break;
        }

        bubble.reset(xPosition, yPosition);
        bubble.scale.x = scale;
        bubble.scale.y = scale;
        bubble.body.velocity.y = -ySpeed - (Math.random() * 3 + 1) * Math.pow(1.1, numberToSpawn - i);

        // configures the next bubble
        var xDisplacement = Math.random() * bubble.width * 0.5 + bubble.width;
        xPosition += xMirror * xDisplacement;
        xMirror *= -1;

        var yDisplacement = Math.random() * bubble.height * 0.5 + bubble.height;
        yPosition += yDisplacement;
        scale *= 1.1 + Math.random() / 10;
      }

      var nextSpawn = Math.random() * (this.maxTime - this.minTime) + this.minTime;
      this.game.time.events.add(nextSpawn, this.spawnBubbles, this);
    }
  }, {
    key: 'update',
    value: function update() {
      this.bubbles.iterate('alive', true, RETURN_NONE, function (bubble) {
        if (bubble.bottom < 0) {
          bubble.kill();
        }
      }, this);
    }
  }]);

  return Background;
}();

exports.default = Background;

},{"util/GradientBackground":18}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PAUSE_BUTTON_DIMENSIONS = { width: 25, height: 25 };
var PAUSE_BUTTON_MARGINS = { bottom: 10, left: 5 };
var MUSIC_BUTTON_DIMENSIONS = { width: 25, height: 25 };
var MUSIC_BUTTON_MARGINS = { bottom: 10, left: PAUSE_BUTTON_DIMENSIONS.width + 5 + 5 };
var nextLevelTweensDuration = [120, 800, 200];

var GameStateButtons = function () {
  function GameStateButtons(game, state) {
    _classCallCheck(this, GameStateButtons);

    this.game = game;
    this.state = state;
    // this.state.spawner.onSpawningProgress.add(this.updateProgressBar, this);
  }

  _createClass(GameStateButtons, [{
    key: 'preload',
    value: function preload() {
      this.game.load.image('text-game-over', 'imgs/text-game-over.png');
      this.game.load.image('text-game-paused', 'imgs/text-game-paused.png');
      this.game.load.image('progress-bar', 'imgs/progress-bar.png');
      this.game.load.spritesheet('button-pause', 'imgs/button-pause.png', PAUSE_BUTTON_DIMENSIONS.width, PAUSE_BUTTON_DIMENSIONS.height);
      this.game.load.spritesheet('button-music', 'imgs/button-music.png', MUSIC_BUTTON_DIMENSIONS.width, MUSIC_BUTTON_DIMENSIONS.height);

      this.modals = new gameModal(this.game);
    }
  }, {
    key: 'create',
    value: function create(_ref, context) {
      var resumeCallback = _ref.resumeCallback;
      var pauseCallback = _ref.pauseCallback;
      var replayCallback = _ref.replayCallback;
      var menuCallback = _ref.menuCallback;
      var musicCallback = _ref.musicCallback;

      this.createGameOverModal(arguments[0], context);
      this.createGamePausedModal(arguments[0], context);
      this.createEndGameModal(arguments[0], context);

      var pauseButton = this.game.add.button(PAUSE_BUTTON_MARGINS.left, this.game.world.height - PAUSE_BUTTON_MARGINS.bottom, 'button-pause', pauseCallback, context, 1, 0, 1, 0);
      pauseButton.anchor.setTo(0, 1);
      var musicButton = this.game.add.button(MUSIC_BUTTON_MARGINS.left, this.game.world.height - MUSIC_BUTTON_MARGINS.bottom, 'button-music', musicCallback, context, 1, 0, 1, 0);
      musicButton.anchor.setTo(0, 1);

      this.createNextLevelMessage();

      // this.createLevelProgressBar();
    }
  }, {
    key: 'createGameOverModal',
    value: function createGameOverModal(_ref2, context) {
      var resumeCallback = _ref2.resumeCallback;
      var replayCallback = _ref2.replayCallback;
      var menuCallback = _ref2.menuCallback;

      this.modals.createModal({
        type: 'gameOver',
        includeBackground: true,
        itemsArr: [{
          type: 'image',
          content: 'text-game-over',
          offsetY: -50
        }, {
          type: 'text',
          content: 'replay',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: -70,
          stroke: '0x000000',
          strokeThickness: 9,
          callback: replayCallback.bind(context)
        }, {
          type: 'text',
          content: 'menu',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: 70,
          stroke: '0x000000',
          strokeThickness: 9,
          callback: menuCallback.bind(context)
        }]
      });

      // hover on buttons
      var textReplay = this.modals.getModalItem('gameOver', 3);
      var textMenu = this.modals.getModalItem('gameOver', 4);
      textReplay.inputEnabled = true;
      textMenu.inputEnabled = true;

      textReplay.events.onInputOver.add(this.hoverTextButton, this, 0, textReplay);
      textMenu.events.onInputOver.add(this.hoverTextButton, this, 0, textMenu);
      textReplay.events.onInputOut.add(this.outTextButton, this, 0, textReplay);
      textMenu.events.onInputOut.add(this.outTextButton, this, 0, textMenu);
    }
  }, {
    key: 'createGamePausedModal',
    value: function createGamePausedModal(_ref3, context) {
      var resumeCallback = _ref3.resumeCallback;
      var replayCallback = _ref3.replayCallback;
      var menuCallback = _ref3.menuCallback;

      this.modals.createModal({
        type: 'gamePaused',
        includeBackground: true,
        itemsArr: [{
          type: 'image',
          content: 'text-game-paused',
          offsetY: -50
        }, {
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
        }, {
          type: 'text',
          content: 'menu',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: 70,
          stroke: '0x000000',
          strokeThickness: 9,
          callback: menuCallback.bind(context)
        }]
      });

      // hover on buttons
      var textResume = this.modals.getModalItem('gamePaused', 3);
      var textMenu = this.modals.getModalItem('gamePaused', 4);
      textResume.inputEnabled = true;
      textMenu.inputEnabled = true;

      textResume.events.onInputOver.add(this.hoverTextButton, this, 0, textResume);
      textMenu.events.onInputOver.add(this.hoverTextButton, this, 0, textMenu);
      textResume.events.onInputOut.add(this.outTextButton, this, 0, textResume);
      textMenu.events.onInputOut.add(this.outTextButton, this, 0, textMenu);
    }
  }, {
    key: 'createEndGameModal',
    value: function createEndGameModal(_ref4, context) {
      var resumeCallback = _ref4.resumeCallback;
      var replayCallback = _ref4.replayCallback;
      var menuCallback = _ref4.menuCallback;

      this.modals.createModal({
        type: 'endGame',
        includeBackground: true,
        itemsArr: [{
          type: 'text',
          content: 'Congratulations!!\n\nGo Unleash \nYour Kraken Now',
          fontFamily: 'Chango',
          fontSize: 28,
          offsetY: -80,
          color: '0x9A22FF',
          stroke: '0x000000',
          strokeThickness: 9
        }, {
          type: 'text',
          content: 'replay',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: -70,
          stroke: '0x000000',
          strokeThickness: 9,
          callback: replayCallback.bind(context)
        }, {
          type: 'text',
          content: 'menu',
          fontFamily: 'Chango',
          fontSize: 28,
          color: '0xFEFF49',
          offsetY: 40,
          offsetX: 70,
          stroke: '0x000000',
          strokeThickness: 9,
          callback: menuCallback.bind(context)
        }]
      });

      // hover on buttons
      var textReplay = this.modals.getModalItem('endGame', 3);
      var textMenu = this.modals.getModalItem('endGame', 4);
      textReplay.inputEnabled = true;
      textMenu.inputEnabled = true;

      textReplay.events.onInputOver.add(this.hoverTextButton, this, 0, textReplay);
      textMenu.events.onInputOver.add(this.hoverTextButton, this, 0, textMenu);
      textReplay.events.onInputOut.add(this.outTextButton, this, 0, textReplay);
      textMenu.events.onInputOut.add(this.outTextButton, this, 0, textMenu);
    }
  }, {
    key: 'createNextLevelMessage',
    value: function createNextLevelMessage() {
      var _this = this;

      var worldWidth = this.game.world.width;
      var worldHeight = this.game.world.height;

      this.nextLevelTexts = [];
      // 'Next Level!'
      this.nextLevelTexts.push(this.game.add.text(worldWidth, worldHeight * 0.4, 'Next level!', {
        font: '40px Chewy',
        color: '#333333'
      }));

      // # (number of new level)
      this.nextLevelTexts.push(this.game.add.text(0, worldHeight * 0.55, '2', {
        font: '55px Chewy',
        color: '#000000'
      }));
      this.nextLevelTexts[0].anchor.setTo(0, 0.5);
      this.nextLevelTexts[1].anchor.setTo(1, 0.5);

      var tweensTargetX = [[worldWidth * (3 / 5), worldWidth * (2 / 5), -this.nextLevelTexts[0].width, worldWidth], [worldWidth * (2 / 5), worldWidth * (3 / 5), worldWidth, this.nextLevelTexts[1].widdth]];

      this.nextLevelTweens = [];
      this.nextLevelTweens = this.nextLevelTexts.map(function (text, i) {
        var tweenIn = _this.game.add.tween(text),
            tweenMiddle = _this.game.add.tween(text),
            tweenOut = _this.game.add.tween(text);

        tweenIn.to({ x: tweensTargetX[i][0] }, nextLevelTweensDuration[0], Phaser.Easing.Quadratic.Out, false, 0);
        tweenMiddle.to({ x: tweensTargetX[i][1] }, nextLevelTweensDuration[1], Phaser.Easing.Linear.None, false, 0);
        tweenOut.to({ x: tweensTargetX[i][2] }, nextLevelTweensDuration[2], Phaser.Easing.Quadratic.In, false, 0);
        tweenOut.onComplete.add(function () {
          text.x = tweensTargetX[i][3];
        });

        tweenIn.chain(tweenMiddle.chain(tweenOut));
        return tweenIn;
      });
    }
  }, {
    key: 'hoverTextButton',
    value: function hoverTextButton(text) {
      text.fill = '#FF9649';
    }
  }, {
    key: 'outTextButton',
    value: function outTextButton(text) {
      text.fill = '#FEFF49';
    }
  }, {
    key: 'showNextLevelMessage',
    value: function showNextLevelMessage(level) {
      this.nextLevelTexts[1].text = '' + level;
      this.nextLevelTweens.forEach(function (tween) {
        return tween.start();
      });
      return nextLevelTweensDuration.reduce(function (acum, curr) {
        return acum + curr;
      }, 0);
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

  }]);

  return GameStateButtons;
}();

exports.default = GameStateButtons;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KRAKEN_DIMENSIONS = { width: 56, height: 100 };
var KRAKEN_BODY_DIMENSIONS = { width: 40, height: 40, offsetY: -12 };
var LIFE_ICON_DIMENSIONS = { width: 16, height: 16 };
var LIFE_ICON_MARGIN = { right: 10, bottom: 13, between: 2 };
var INITIAL_LIVES = 3;

var KrakenPlayer = function () {
  function KrakenPlayer(game) {
    _classCallCheck(this, KrakenPlayer);

    this.game = game;
    this.lives = new Lives(this.game);
  }

  _createClass(KrakenPlayer, [{
    key: 'preload',
    value: function preload() {
      this.game.load.spritesheet('kraken', 'imgs/kraken-sprite.png', KRAKEN_DIMENSIONS.width, KRAKEN_DIMENSIONS.height);
      this.game.load.spritesheet('kraken-particles', 'imgs/kraken-particles.png', 1, 1);
      this.lives.preload();
    }
  }, {
    key: 'create',
    value: function create() {
      var worldWidth = this.game.world.width;
      var worldHeight = this.game.world.height;

      this.sprite = this.game.add.sprite(worldWidth / 2, worldHeight - 50, 'kraken');
      this.sprite.entity = this;
      this.game.physics.arcade.enable(this.sprite);
      this.sprite.anchor.setTo(0.5, 0.5);
      this.sprite.body.setSize(KRAKEN_BODY_DIMENSIONS.width, KRAKEN_BODY_DIMENSIONS.height, 0, KRAKEN_BODY_DIMENSIONS.offsetY);

      // animations
      var goingToSwim = this.sprite.animations.add('goingToSwim', [0, 1, 2, 3], 20, false);
      var swimming = this.sprite.animations.add('swimming', [4, 5], 5, true);
      var stoppingToSwim = this.sprite.animations.add('stoppingToSwim', [4, 5, 1, 0], 20, false);

      // y yoyo movement
      this.floatingTween = this.game.add.tween(this.sprite);
      this.floatingTween.to({ y: this.sprite.y - 5 }, 350, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

      // life icons
      this.lives.create();

      // particles
      this.emitter = this.game.add.emitter(0, 0, 250);
      this.emitter.makeParticles('kraken-particles', [0, 1, 2, 3, 4]);
      this.sprite.addChild(this.emitter);
      this.emitter.gravity = 400;
      this.emitter.x = 0;
      this.emitter.y = this.sprite.height * 0.25;
      this.emitter.alpha = 0.7;
      this.emitter.width = this.sprite.width * 0.5;
      this.emitter.minParticleSpeed = new Phaser.Point(-30, 10);
      this.emitter.maxParticleSpeed = new Phaser.Point(+30, 10);
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'playSwimming',
    value: function playSwimming() {
      var _this = this;

      var duration = 1800;
      var timeBegin = this.game.time.time;

      // particles - start emitting
      this.emitter.start(false, 1000, 10);

      // movement - going up in 2 steps
      this.floatingTween.pause();
      var tween1 = this.game.add.tween(this.sprite);
      var tween2 = this.game.add.tween(this.sprite);
      var tween3 = this.game.add.tween(this.sprite);
      tween1.to({ y: this.game.world.height * 0.5 }, duration / 3, Phaser.Easing.Quadratic.Out, true);
      tween2.to({ y: -0.5 * this.sprite.height }, duration / 4, Phaser.Easing.Quadratic.Out, false);
      tween3.to({ y: this.game.world.height - 50 }, duration / 5, Phaser.Easing.Quadratic.Out, false);

      tween2.onComplete.add(function () {
        _this.sprite.y = _this.game.world.height + _this.sprite.height / 2;
      }, this);
      tween3.onComplete.add(function () {
        _this.floatingTween.resume();
      }, this);
      tween1.chain(tween2.chain(tween3));

      // animation - playing 3 anims in sequence
      var emitter = this.emitter;
      this.sprite.animations.play('goingToSwim').onComplete.add(function (sprite) {
        sprite.animations.play('swimming').onLoop.add(function (sprite) {
          var timeNow = _this.game.time.time;
          if (timeNow >= timeBegin + duration) {
            sprite.animations.play('stoppingToSwim');
            emitter.on = false;
          }
        });
      });
    }
  }, {
    key: 'hit',
    value: function hit(gameOverCallback, context) {
      if (--this.lives.value <= 0) {
        gameOverCallback.call(context);
        return true;
      }
      return false;
    }
  }, {
    key: 'wrongKeyPressed',
    value: function wrongKeyPressed() {
      var _this2 = this;

      this.sprite.colorBlendStep = 0;
      this.sprite.tint = 0xff3366;
      this.game.add.tween(this.sprite).to({ colorBlendStep: 100 }, 200, Phaser.Easing.Linear.None, false).onUpdateCallback(function () {
        _this2.sprite.tint = Phaser.Color.interpolateColor(0xff3366, 0xffffff, 100, _this2.sprite.colorBlendStep, 1);
      }).start();
    }
  }]);

  return KrakenPlayer;
}();

exports.default = KrakenPlayer;

var Lives = function () {
  function Lives(game) {
    _classCallCheck(this, Lives);

    this.game = game;
    this._value = INITIAL_LIVES;
  }

  _createClass(Lives, [{
    key: 'preload',
    value: function preload() {
      this.game.load.spritesheet('life', 'imgs/life.png', LIFE_ICON_DIMENSIONS.width, LIFE_ICON_DIMENSIONS.height);
    }
  }, {
    key: 'create',
    value: function create() {
      var worldWidth = this.game.world.width;
      var worldHeight = this.game.world.height;

      // creates a # of icons equal to INITIAL_LIVES and positions them
      this.lifeIcons = this.game.add.group();
      for (var i = 0; i < INITIAL_LIVES; i++) {
        var icon = this.game.add.sprite(worldWidth - LIFE_ICON_MARGIN.right - LIFE_ICON_DIMENSIONS.width / 2 - i * (LIFE_ICON_DIMENSIONS.width + LIFE_ICON_MARGIN.between), worldHeight - LIFE_ICON_DIMENSIONS.height / 2 - LIFE_ICON_MARGIN.bottom, 'life');
        icon.anchor.setTo(0.5, 0.5);

        this.lifeIcons.add(icon);
      }
    }
  }, {
    key: 'value',
    set: function set(v) {
      var _this3 = this;

      this._value = v;

      // sets the frame of the icons according to the number of lives
      this.lifeIcons.forEachExists(function (icon) {
        var i = _this3.lifeIcons.getIndex(icon);
        icon.frame = i + 1 > _this3._value ? 1 : 0;
      }, this);
    },
    get: function get() {
      return this._value;
    }
  }]);

  return Lives;
}();

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EnemySpawner2 = require('objects/EnemySpawner');

var _EnemySpawner3 = _interopRequireDefault(_EnemySpawner2);

var _Enemy = require('objects/Enemy');

var _Enemy2 = _interopRequireDefault(_Enemy);

var _levels = require('levels/levels');

var _levels2 = _interopRequireDefault(_levels);

var _gkui = require('gkui/gkui');

var _gkui2 = _interopRequireDefault(_gkui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INSTRUCTIONS_INTERVAL = 600;

var WaveSpawner = function () {
  function WaveSpawner(wave, level, spawner) {
    _classCallCheck(this, WaveSpawner);

    this.wave = wave;
    this.level = level;
    this.spawner = spawner;
    this.spawned = 0;
    this.killed = 0;
  }

  _createClass(WaveSpawner, [{
    key: 'start',
    value: function start() {
      // abstract method
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      this.spawned++;
      this.spawner.spawned++;

      this.spawner.onSpawningProgress.dispatch({
        progress: this.progressTotal,
        finished: this.progressTotal >= 1
      });
    }
  }, {
    key: 'enemyWasDestroyed',
    value: function enemyWasDestroyed(waveFinishedCallback, context) {
      this.killed++;
      if (this.killed >= this.totalEnemies) {
        waveFinishedCallback.call(context);
      }
    }
  }, {
    key: 'progressTotal',
    get: function get() {
      return this.spawner.spawned / this.spawner.totalEnemies;
    }
  }]);

  return WaveSpawner;
}();

var InstructionsSpawner = function (_WaveSpawner) {
  _inherits(InstructionsSpawner, _WaveSpawner);

  function InstructionsSpawner(wave, level, spawner) {
    _classCallCheck(this, InstructionsSpawner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InstructionsSpawner).call(this, wave, level, spawner));
  }

  _createClass(InstructionsSpawner, [{
    key: 'start',
    value: function start() {
      this.spawner.game.time.events.repeat(INSTRUCTIONS_INTERVAL, this.totalEnemies, this.spawn, this);
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      var xEnemy = Phaser.Math.linear(_EnemySpawner2.ENEMY_INSTRUCTIONS_DIMENSIONS.width * 1.5, this.spawner.game.world.width, this.spawned / this.totalEnemies);
      var enemyCommand = this.wave.enemies.exactly[this.spawned];
      var enemy = this.spawner.spawnEnemyAt(xEnemy, 0, enemyCommand, _Enemy.InstructionEnemy);
      enemy.create();
      _get(Object.getPrototypeOf(InstructionsSpawner.prototype), 'spawn', this).call(this);
    }
  }, {
    key: 'totalEnemies',
    get: function get() {
      return this.wave.enemies.exactly.length;
    }
  }]);

  return InstructionsSpawner;
}(WaveSpawner);

var ConsoleSpawner = function (_WaveSpawner2) {
  _inherits(ConsoleSpawner, _WaveSpawner2);

  function ConsoleSpawner(wave, level, spawner) {
    _classCallCheck(this, ConsoleSpawner);

    // lerps to see what should be the min and max intervals of this wave

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleSpawner).call(this, wave, level, spawner));

    var consoleWaves = _this2.spawner.consoleWaves;
    var indexOfThisWave = _this2.level.waves.indexOf(wave);
    var percentageOfThisWave = indexOfThisWave / consoleWaves.length;
    _this2.minInterval = Phaser.Math.linear(_this2.level.initialMinInterval, _this2.level.finalMinInterval, percentageOfThisWave);
    _this2.maxInterval = Phaser.Math.linear(_this2.level.initialMaxInterval, _this2.level.finalMaxInterval, percentageOfThisWave);
    _this2.speedMultiplier = Phaser.Math.linear(_this2.level.initialSpeedMultiplier, _this2.level.finalSpeedMultiplier, percentageOfThisWave);
    return _this2;
  }

  _createClass(ConsoleSpawner, [{
    key: 'start',
    value: function start() {
      var _this3 = this;

      // regular console enemies
      if (this.spawned < this.totalConsoleEnemies) {
        this.spawner.game.time.events.add(this.spawner.game.rnd.between(this.minInterval, this.maxInterval), this.spawn, this);
      }

      // special (shiny) git enemyit
      var git = this.wave.enemies.git;
      if (!!git && !this.hasSpawnedGitEnemy && this.progressConsoleOnly >= git.atProgress) {
        (function () {
          _this3.hasSpawnedGitEnemy = true;
          var enemy = _this3.spawn(_Enemy.GitEnemy);

          enemy.uponDeath = function () {
            _gkui2.default.animate.call(this.spawner.state, enemy.name);
          }.bind(_this3);
        })();
      }
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? _Enemy.ConsoleEnemy : arguments[0];

      // spawns
      var enemyDescription = type === _Enemy.ConsoleEnemy ? this.nextEnemy() : this.wave.enemies.git;

      var xEnemy = type === _Enemy.ConsoleEnemy ? this.spawner.game.rnd.between(-_EnemySpawner2.ENEMY_INSTRUCTIONS_DIMENSIONS.width, this.spawner.game.world.width + _EnemySpawner2.ENEMY_INSTRUCTIONS_DIMENSIONS.width) : this.spawner.game.rnd.between(this.spawner.game.world.width / 3, this.spawner.game.world.width / 3 * 2);
      var enemy = this.spawner.spawnEnemyAt(xEnemy, 0, enemyDescription.cmd, type, enemyDescription.name);
      enemy.speedMultiplier = this.speedMultiplier;
      enemy.create();

      // updates this.spawned etc.
      _get(Object.getPrototypeOf(ConsoleSpawner.prototype), 'spawn', this).call(this);

      // reschedules spawning
      this.start();

      return enemy;
    }
  }, {
    key: 'nextEnemy',
    value: function nextEnemy() {
      if (this.wave.enemies.fromPool) {
        return this.spawner.game.rnd.pick(this.wave.enemies.fromPool);
      } else if (this.wave.enemies.exactly) {
        return this.wave.enemies.exactly[this.spawned];
      }
      return 'null';
    }
  }, {
    key: 'totalEnemies',
    get: function get() {
      if (!this._totalEnemies) {
        this._totalEnemies = this.totalConsoleEnemies + (this.wave.enemies.git ? 1 : 0);
      }
      return this._totalEnemies;
    }
  }, {
    key: 'totalConsoleEnemies',
    get: function get() {
      if (!this._totalConsoleEnemies) {
        this._totalConsoleEnemies = 0 + (this.wave.enemies.quantity || 0) + (this.wave.enemies.exactly || []).length;
      }
      return this._totalConsoleEnemies;
    }
  }, {
    key: 'progressConsoleOnly',
    get: function get() {
      return (this.spawned - (this.hasSpawnedGitEnemy ? 1 : 0)) / this.totalConsoleEnemies;
    }
  }]);

  return ConsoleSpawner;
}(WaveSpawner);

var LevelSpawner = function (_EnemySpawner) {
  _inherits(LevelSpawner, _EnemySpawner);

  function LevelSpawner(game, state) {
    _classCallCheck(this, LevelSpawner);

    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelSpawner).call(this, game, state));

    _this4.levels = _levels2.default;
    _this4.currentLevelIndex = 0;
    _this4._totalEnemies = [];
    _this4.state.onDestroyingProgress.add(_this4.enemyWasDestroyed, _this4);
    return _this4;
  }

  _createClass(LevelSpawner, [{
    key: 'start',
    value: function start() {
      var _this5 = this;

      this.spawned = 0;
      this.waves = this.levels[this.currentLevelIndex].waves.map(function (wave) {
        var waveSpawner = wave.type === 'instructions' ? InstructionsSpawner : ConsoleSpawner;
        return new waveSpawner(wave, _this5.currentLevel, _this5);
      });
      this.currentWaveIndex = 0;

      this.currentWave.start();
    }
  }, {
    key: 'nextWave',
    value: function nextWave() {
      var previousWave = this.currentWave;
      this.currentWaveIndex++;
      if (this.currentWave) {
        // lets schedule the start of the next wave
        this.game.time.events.add(previousWave.wave.delayAfter, this.currentWave.start, this.currentWave);
      }
    }
  }, {
    key: 'hasNextLevel',
    value: function hasNextLevel() {
      return this.currentLevelIndex + 1 < this.levels.length;
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      _get(Object.getPrototypeOf(LevelSpawner.prototype), 'nextLevel', this).call(this);

      this.currentLevelIndex++;
      this.start();
    }
  }, {
    key: 'enemyWasDestroyed',
    value: function enemyWasDestroyed() {
      if (!this.currentWave) {
        console.error('tried to tell a wave spawner that an enemy was destroyed, but there were no more currentWave');
      }
      this.currentWave.enemyWasDestroyed(this.nextWave, this);
    }
  }, {
    key: 'currentWave',
    get: function get() {
      return this.waves[this.currentWaveIndex];
    }
  }, {
    key: 'currentLevel',
    get: function get() {
      return this.levels[this.currentLevelIndex];
    }
  }, {
    key: 'consoleWaves',
    get: function get() {
      if (!this._consoleWaves) {
        this._consoleWaves = this.currentLevel.waves.filter(function (w) {
          return w.type === 'console';
        });
      }
      return this._consoleWaves;
    }
  }, {
    key: 'totalEnemies',
    get: function get() {
      if (!this._totalEnemies[this.currentLevelIndex]) {
        this._totalEnemies[this.currentLevelIndex] = this.waves.reduce(function (accum, curr) {
          return accum + curr.totalEnemies;
        }, 0);
      }
      return this._totalEnemies[this.currentLevelIndex];
    }
  }]);

  return LevelSpawner;
}(_EnemySpawner3.default);

exports.default = LevelSpawner;

},{"gkui/gkui":1,"levels/levels":4,"objects/Enemy":6,"objects/EnemySpawner":7}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ball = function () {
  function Ball(game, name, bezierPoints, tweenParams) {
    _classCallCheck(this, Ball);

    this.game = game;
    this.name = name;
    this.bezierPoints = bezierPoints;
    this.t = 0;
    this.tweenParams = tweenParams;
  }

  _createClass(Ball, [{
    key: "createPath",
    value: function createPath() {
      this.path = [];

      var step = 1 / (this.game.width / 4);
      for (var i = 0; i <= 1; i += step) {
        var px = this.game.math.bezierInterpolation(this.bezierPoints.x, i);
        var py = this.game.math.bezierInterpolation(this.bezierPoints.y, i);
        this.path.push({
          x: px,
          y: py
        });
      }
    }
  }, {
    key: "create",
    value: function create() {
      this.createPath();
      this.sprite = this.game.add.sprite(this.path[0].x, this.path[0].y, this.name);
      this.sprite.anchor.setTo(0.5, 0.5);

      this.tween = this.game.add.tween(this);
      this.tween.to({ t: 1 }, this.tweenParams.duration, Phaser.Easing.Quadratic.Out);
      this.tween.delay(this.tweenParams.start);
      this.tween.start();
    }
  }, {
    key: "update",
    value: function update() {
      this.sprite.x = this.game.math.bezierInterpolation(this.bezierPoints.x, this.t);
      this.sprite.y = this.game.math.bezierInterpolation(this.bezierPoints.y, this.t);
    }
  }]);

  return Ball;
}();

exports.default = Ball;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EnemySpawner2 = require('objects/EnemySpawner');

var _EnemySpawner3 = _interopRequireDefault(_EnemySpawner2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var INITIAL_INTERVAL = 1500;
var FINAL_INTERVAL = 1400;
var TYPICAL_NUMBER_OF_ENEMIES = 1;

var RandomSpawner = function (_EnemySpawner) {
  _inherits(RandomSpawner, _EnemySpawner);

  function RandomSpawner() {
    _classCallCheck(this, RandomSpawner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RandomSpawner).apply(this, arguments));
  }

  _createClass(RandomSpawner, [{
    key: 'start',
    value: function start() {
      this.game.time.events.add(INITIAL_INTERVAL, this.randSpawn, this);
    }
  }, {
    key: 'randSpawn',
    value: function randSpawn() {
      var enemy = this.spawnEnemyAtRandom('git clone');
      enemy.create();
      this.spawned++;

      if (this.spawned < TYPICAL_NUMBER_OF_ENEMIES) {
        var next = Phaser.Math.linear(INITIAL_INTERVAL, FINAL_INTERVAL, this.spawned / TYPICAL_NUMBER_OF_ENEMIES);
        this.game.time.events.add(next * (Math.random() * 0.2 + 0.9), this.randSpawn, this);
      }

      this.onSpawningProgress.dispatch({
        progress: this.spawned / TYPICAL_NUMBER_OF_ENEMIES,
        finished: this.spawned === TYPICAL_NUMBER_OF_ENEMIES
      });
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      _get(Object.getPrototypeOf(RandomSpawner.prototype), 'nextLevel', this).call(this);
      this.start();
    }
  }]);

  return RandomSpawner;
}(_EnemySpawner3.default);

exports.default = RandomSpawner;

},{"objects/EnemySpawner":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rand = require('util/rand');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TORPEDO_DIMENSIONS = { width: 16, height: 24 };
var TORPEDO_TIME_TO_PURSUIT = 1500;
var TORPEDO_INITIAL_VELOCITY = {
  x: {
    min: 200,
    variation: 420
  },
  y: {
    min: -10,
    variation: -15
  }
};
var TORPEDO_SPEED = 390;
var TORPEDO_STEER_RATE = 100;
var State = {
  // stays in this for TORPEDO_TIME_TO_PURSUIT mili...
  JUST_SHOT: 'JUST_SHOT',
  // it is pursuing the enemy in a straight line
  PURSUING: 'PURSUING',
  // the enemy it was targeting doesnt exist anymore
  ADRIFT: 'ADRIFT'
};

var Torpedo = function () {
  function Torpedo(game, group, player, target) {
    _classCallCheck(this, Torpedo);

    this.game = game;
    this.group = group;
    this.player = player;
    this.target = target;
    this.state = State.JUST_SHOT;
  }

  _createClass(Torpedo, [{
    key: 'create',
    value: function create() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? 'torpedo' : arguments[0];

      this.sprite = this.game.add.sprite(this.player.sprite.x, this.player.sprite.top, type);
      this.group.add(this.sprite);
      this.sprite.entity = this;
      this.sprite.anchor.setTo(0.5, 0.5);
      this.sprite.body.velocity.x = Phaser.Utils.randomChoice(1, -1) * (0, _rand.randomFloat)(TORPEDO_INITIAL_VELOCITY.x.min, TORPEDO_INITIAL_VELOCITY.x.variation);
      this.sprite.body.velocity.y = (0, _rand.randomFloat)(TORPEDO_INITIAL_VELOCITY.y.min, TORPEDO_INITIAL_VELOCITY.y.variation);
      this.sprite.body.drag.x = 0.4;
      this.sprite.body.drag.y = 0.1;
      this.sprite.tint = 0xff3366;
      this.born = this.game.time.time;

      // animation
      this.sprite.animations.add('turnedOff', [2, 3], 5, true);
      this.sprite.animations.add('pursuing', [0, 1], 20, true);
      this.sprite.play('turnedOff');

      // the rotation will be updated on the update() function
      this.sprite.body.allowRotation = false;
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'update',
    value: function update() {

      this.checkState();

      var targetBottom = {
        x: this.target.sprite.x,
        y: Phaser.Math.linear(this.target.sprite.y, this.target.sprite.bottom, 0.75)
      };

      switch (this.state) {
        case State.JUST_SHOT:
          var angleToTarget = Math.atan2(this.target.sprite.y - this.sprite.y, this.target.sprite.x - this.sprite.x);
          var xVelocityDesired = Math.cos(angleToTarget) * TORPEDO_SPEED;
          var yVelocityDesired = Math.sin(angleToTarget) * TORPEDO_SPEED;

          this.sprite.body.velocity.x = Phaser.Math.linear(this.sprite.body.velocity.x, xVelocityDesired, (this.game.time.time - this.born) / TORPEDO_TIME_TO_PURSUIT);
          this.sprite.body.velocity.y = Phaser.Math.linear(this.sprite.body.velocity.y, yVelocityDesired, (this.game.time.time - this.born) / TORPEDO_TIME_TO_PURSUIT);

          this.sprite.rotation = Math.atan2(this.sprite.body.velocity.y, this.sprite.body.velocity.x) + Math.PI / 2;

          break;
        case State.PURSUING:
          if (this.game.time.time > this.lastSteer + TORPEDO_STEER_RATE) {
            this.sprite.rotation = this.game.physics.arcade.moveToObject(this.sprite, targetBottom, TORPEDO_SPEED) + Math.PI / 2;
            this.lastSteer = this.game.time.time;
          }

          break;
        case State.ADRIFT:
          this.sprite.rotation = Math.atan2(this.sprite.body.velocity.y, this.sprite.body.velocity.x) + Math.PI / 2;
          break;
      }
    }
  }, {
    key: 'checkState',
    value: function checkState() {
      // checks if the torpedo must transition to a new state,
      // considering its current state, the current time
      if (this.state !== State.ADRIFT && (!this.target || !this.target.sprite || !this.target.sprite.alive)) {
        this.state = State.ADRIFT;
        this.sprite.tint = 0x777777;
        this.sprite.play('turnedOff');
      } else if (this.state === State.JUST_SHOT && this.game.time.time > this.born + TORPEDO_TIME_TO_PURSUIT / 4 && this.sprite.animations.currentAnim.name !== 'pursuing') {
        this.sprite.tint = 0xffffff;
        this.sprite.play('pursuing');
      }
      // commenting this out improves perf. at mostly no cost to the game
      else if (this.state === State.JUST_SHOT && this.game.time.time > this.born + TORPEDO_TIME_TO_PURSUIT) {
          this.sprite.body.drag.x = 0;
          this.sprite.body.drag.y = 0;
          this.lastSteer = this.game.time.time - 1;

          this.state = State.PURSUING;
        }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.sprite.parent.remove(this.sprite, true);
      this.sprite.entity = null;
    }
  }], [{
    key: 'preload',
    value: function preload(game) {
      game.load.spritesheet('torpedo', 'imgs/torpedo.png', TORPEDO_DIMENSIONS.width, TORPEDO_DIMENSIONS.height);
      game.load.spritesheet('laser', 'imgs/laser.png', TORPEDO_DIMENSIONS.width, TORPEDO_DIMENSIONS.height);
      game.load.spritesheet('big-boy', 'imgs/big-boy.png', TORPEDO_DIMENSIONS.width, TORPEDO_DIMENSIONS.height);
    }
  }]);

  return Torpedo;
}();

exports.default = Torpedo;

},{"util/rand":20}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _KrakenPlayer = require('objects/KrakenPlayer');

var _KrakenPlayer2 = _interopRequireDefault(_KrakenPlayer);

var _Enemy = require('objects/Enemy');

var _Enemy2 = _interopRequireDefault(_Enemy);

var _GameBackground = require('objects/GameBackground');

var _GameBackground2 = _interopRequireDefault(_GameBackground);

var _RandomSpawner = require('objects/RandomSpawner');

var _RandomSpawner2 = _interopRequireDefault(_RandomSpawner);

var _LevelSpawner = require('objects/LevelSpawner');

var _LevelSpawner2 = _interopRequireDefault(_LevelSpawner);

var _Torpedo = require('objects/Torpedo');

var _Torpedo2 = _interopRequireDefault(_Torpedo);

var _GameStateHUD = require('objects/GameStateHUD');

var _GameStateHUD2 = _interopRequireDefault(_GameStateHUD);

var _gkui = require('gkui/gkui');

var _gkui2 = _interopRequireDefault(_gkui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'preload',
    value: function preload() {
      this.player = new _KrakenPlayer2.default(this.game);
      this.player.preload();

      this.bg = new _GameBackground2.default(this.game);
      this.bg.preload();

      this.onDestroyingProgress = new Phaser.Signal();
      this.spawner = new _LevelSpawner2.default(this.game, this);
      this.spawner.preload();

      _Torpedo2.default.preload(this.game);

      this.hud = new _GameStateHUD2.default(this.game, this);
      this.hud.preload();

      this.game.load.audio('sfx', 'sounds/audio-sprite.ogg');
      this.game.load.audio('silver-ocean', 'sounds/siliver-ocean-by-mathgrant.ogg');

      this.currentLevel = 1;
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      // configures "arcade" type of physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // creates the gradient background
      this.bg.create();

      // creates the enemy spawner
      this.spawner.create();
      this.spawner.onSpawningProgress.add(this.progress, this);

      // typing to destroy!!
      this.game.input.keyboard.addCallbacks(this, null, null, this.keyPressed);

      // torpedoes
      this.torpedos = this.game.add.physicsGroup();

      // buttons & hud
      this.hud.create({
        replayCallback: this.replayGame,
        resumeCallback: this.resumeGame,
        menuCallback: this.leaveToMenu,
        pauseCallback: this.pauseGame,
        musicCallback: function musicCallback() {
          _this2.game.sound.mute = !_this2.game.sound.mute;
        }
      }, this);

      // creates the player
      this.player.create();

      // starts the game (spawner)
      this.spawner.start();

      // resets the gkui
      _gkui2.default.reset();

      // sound effects
      this.fx = this.game.add.audio('sfx');
      this.fx.allowMultiple = true;
      this.fx.addMarker('explosion1', 0.0, 0.4);
      this.fx.addMarker('explosion2', 0.5, 0.4);
      this.fx.addMarker('explosion3', 1.0, 0.4);
      this.fx.addMarker('laser1', 1.5, 0.1);
      this.fx.addMarker('laser2', 2.0, 0.35);
      this.fx.addMarker('laser3', 2.5, 0.32);
      this.fx.addMarker('torpedo1', 3.0, 0.64);
      this.fx.addMarker('torpedo2', 4.0, 0.64);
      this.fx.addMarker('torpedo3', 5.0, 0.6);
      this.fx.addMarker('blip', 6.0, 0.5);
      this.fx.addMarker('error', 6.5, 0.4);
      this.fx.addMarker('hit1', 7.0, 0.21);
      this.fx.addMarker('hit2', 7.5, 0.22);
      this.fx.addMarker('hit3', 8.0, 0.35);
      this.fx.addMarker('disappearing1', 8.5, 0.18);
      this.fx.addMarker('disappearing2', 9.0, 0.18);
      this.fx.addMarker('disappearing3', 9.5, 0.25);
      this.fx.addMarker('star', 10.0, 0.4);
      // music
      this.music = this.game.add.audio('silver-ocean', 0.7, true);
      this.music.play();
    }
  }, {
    key: 'render',
    value: function render() {
      this.spawner.render();
      this.player.render();
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      this.spawner.update();

      // configures player collision with enemy
      this.game.physics.arcade.overlap(this.player.sprite, this.enemies, function (player, enemy) {
        // damages the player
        var gameOvered = player.entity.hit(_this3.gameOver, _this3);
        // destroys the enemy and checks if should go next lvl
        _this3.destroyEnemy(enemy, gameOvered);
      }, function (player, enemy) {
        // the 'instruction' enemy does not collide with the player
        return enemy.entity.type !== 'instruction';
      });

      // updates torpedos statuses
      this.torpedos.forEachAlive(function (torpedo) {
        torpedo.entity.update();
      });

      // for each enemy alive, does:
      // (a) checks if alive enemies have exceeded the bottom of the world (usually the 'instruction' type)
      // (b) checks enemy collision with torpedo
      this.enemies.forEachAlive(function (enemy) {
        if (enemy.top > _this3.game.world.height) {
          _this3.destroyEnemy(enemy, false);
        }

        _this3.game.physics.arcade.overlap(enemy, _this3.torpedos,
        // callback for when a torpedo targeted at this enemy hit it
        function (_, torpedo) {
          // tells enemy it was hit so it can lose its HP and destroys the torpedo
          var destroyed = enemy.entity.hitByTorpedo();
          torpedo.entity.destroy();
          // plays sound of torpedo hit
          _this3.fx.play('hit' + _this3.game.rnd.between(1, 3));

          if (destroyed) {
            _this3.destroyEnemy(enemy, false);
            // plays sound of enemy destroyed
            _this3.fx.play(enemy.entity.explosionSoundSprite.replace('X', _this3.game.rnd.between(1, 3)));
          }

          // callback to check if the current torpedo was targeted at this enemy
        }, function (_, torpedo) {
          return torpedo.entity.target === enemy.entity;
        });
      }, this);
    }
  }, {
    key: 'destroyEnemy',
    value: function destroyEnemy(enemy, gameOvered) {
      // destroys the enemy
      enemy.entity.destroy();
      // tells the spawner that an enemy was destroyed
      this.onDestroyingProgress.dispatch();
      // if the enemy was the current target, free it so other enemies
      // can be shot at
      if (this.spawner.currentEnemy === enemy.entity) {
        this.spawner.currentEnemy = null;
      }
      if (this.finishedSpawning && !gameOvered && !this.enemies.countLiving()) {
        // go to the next level

        this.nextLevel();
      }
    }
  }, {
    key: 'keyPressed',
    value: function keyPressed(key, e) {
      var spawner = this.spawner;

      // if there is not a this.currentEnemy, look for one
      if (!spawner.currentEnemy) {
        // iterate over alive enemies,
        // checking if their current letter equals `key`
        this.enemies.iterate('alive', true, Phaser.Group.RETURN_NONE, function (enemy) {
          if (spawner.currentEnemy) return;
          if (enemy.entity.currentChar === key) {
            spawner.currentEnemy = enemy.entity;
          }
        });
      }

      // if we have a current enemy, either bc we had before or bc we just picked
      // a new one, we shoot it
      if (spawner.currentEnemy) {
        if (spawner.currentEnemy.currentChar === key) {
          var killed = spawner.currentEnemy.killChar();
          this.shootTorpedo(spawner.currentEnemy);

          if (killed) {
            spawner.currentEnemy = null;
          }
        } else {
          this.wrongKeyPressed();
        }
      } else {
        this.wrongKeyPressed();
      }
    }
  }, {
    key: 'wrongKeyPressed',
    value: function wrongKeyPressed() {
      this.fx.play('error');
      this.player.wrongKeyPressed();
      if (this.spawner.currentEnemy) {
        this.spawner.currentEnemy.wrongKeyPressed();
      }
    }
  }, {
    key: 'shootTorpedo',
    value: function shootTorpedo(targetEnemy) {
      var torpedo = new _Torpedo2.default(this.game, this.torpedos, this.player, targetEnemy);
      torpedo.create(targetEnemy.torpedoType);
      // play sound of launching torpedo
      this.fx.play(targetEnemy.torpedoSoundSprite.replace('X', this.game.rnd.between(1, 3)));
    }
  }, {
    key: 'progress',
    value: function progress(e) {
      if (e.finished) {
        this.finishedSpawning = true;
      }
    }
  }, {
    key: 'nextLevel',
    value: function nextLevel() {
      var _this4 = this;

      this.finishedSpawning = false;
      var hasNextLevel = this.spawner.hasNextLevel();
      this.player.playSwimming(hasNextLevel);
      if (hasNextLevel) {
        // goes to next level
        var duration = this.hud.showNextLevelMessage(++this.currentLevel);
        this.game.time.events.add(duration, function () {
          _this4.spawner.nextLevel(_this4.currentLevel);
        }, this);
      } else {
        // goes to finish game screen
        this.hud.modals.showModal('endGame');
      }
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.hud.modals.hideModal('gamePaused');
      this.hud.modals.showModal('gameOver');
    }
  }, {
    key: 'pauseGame',
    value: function pauseGame() {
      this.fx.play('blip');
      // pauses physics and the global timer
      this.game.physics.arcade.isPaused = true;
      this.game.time.events.pause();
      // shows modal
      this.hud.modals.showModal('gamePaused');
    }
  }, {
    key: 'resumeGame',
    value: function resumeGame() {
      this.fx.play('blip');
      // unpauses physics and the global timer
      this.game.physics.arcade.isPaused = false;
      this.game.time.events.resume();
      // hides modal
      this.hud.modals.hideModal('gamePaused');
    }
  }, {
    key: 'replayGame',
    value: function replayGame() {
      this.fx.play('blip');
      // resets the gkui
      _gkui2.default.reset();

      this.resumeGame();
      this.game.state.start('game');
    }
  }, {
    key: 'leaveToMenu',
    value: function leaveToMenu() {
      this.music.stop();
      this.resumeGame();
      this.game.state.start('menu');
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"gkui/gkui":1,"objects/Enemy":6,"objects/GameBackground":8,"objects/GameStateHUD":9,"objects/KrakenPlayer":10,"objects/LevelSpawner":11,"objects/RandomSpawner":13,"objects/Torpedo":14}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BigKraken = require('objects/BigKraken');

var _BigKraken2 = _interopRequireDefault(_BigKraken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuState = function (_Phaser$State) {
  _inherits(MenuState, _Phaser$State);

  function MenuState() {
    _classCallCheck(this, MenuState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MenuState).apply(this, arguments));
  }

  _createClass(MenuState, [{
    key: 'preload',
    value: function preload() {
      this.game.load.image('bubble-bg', 'imgs/bubble-bg.png');
      this.game.load.image('bubble-bg-smaller', 'imgs/bubble-bg-smaller.png');
      this.game.load.audio('sfx', 'sounds/audio-sprite.ogg');
      this.game.load.audio('sweet-water', 'sounds/sweet-water-by-david-szesztay.ogg');
      this.game.load.image('displacement-texture', 'imgs/displacement-texture.png');
      this.game.load.script('filter', 'scripts/DisplacementFilter.js');

      this.bigKraken = new _BigKraken2.default(this.game);
      this.bigKraken.preload();
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#fff';

      this.bubbleField1 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bubble-bg');
      this.bubbleField2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bubble-bg-smaller');
      this.bgAngle = 0;

      this.logo = this.game.add.text(this.game.world.centerX, this.game.world.centerY * 0.8, 'Kraken\nTyping');
      this.logo.anchor.setTo(0.5, 0.5);
      this.logo.fontSize = 42;
      this.logo.lineSpacing = -33;
      this.logo.align = 'center';
      this.logo.font = 'Chango';
      this.logo.fontWeight = 'normal';

      // let grd = this.logo.context.createLinearGradient(0, 0, this.logo.width*0.75, this.logo.height*0.9);
      var grd = this.logo.context.createLinearGradient(0, 0, 0, this.logo.height);
      grd.addColorStop(0, '#00FFFF');
      grd.addColorStop(1, '#B200FF');

      this.logo.fill = grd;
      this.logo.strokeThickness = 15;
      this.logo.stroke = '#111';
      this.logo.margin = new Phaser.Point(0, 20);

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
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'update',
    value: function update() {
      this.bgAngle += 0.001;
      this.bubbleField1.tilePosition.y -= .1;
      this.bubbleField1.tilePosition.x += Math.sin(this.bgAngle) * 0.1;

      // this.bubbleField2.tilePosition.y -= .5;
      // this.bubbleField2.tilePosition.x += Math.sin(this.bgAngle) * 0.5;

      // water effect
      if (this.game.renderType === Phaser.WEBGL) {
        this.displacementOffset += 0.1;
        this.displacementFilter.offset.x = this.displacementOffset * 5;
        this.displacementFilter.offset.y = this.displacementOffset * 5;
      }
    }
  }, {
    key: 'spawnBigKraken',
    value: function spawnBigKraken() {
      var from = this.game.rnd.pick(['bottom left', 'bottom right']);
      this.bigKraken.appear(from);
      this.game.time.events.add(this.game.rnd.between(13000, 14000), this.spawnBigKraken, this);
    }
  }, {
    key: 'createMenuItem',
    value: function createMenuItem(text, y, actionCallback) {
      var _this2 = this;

      var t = this.game.add.text(this.game.world.centerX, y, text);
      t.anchor.setTo(0.5, 0.5);
      t.font = 'Chango';
      t.fontSize = 28;
      t.fill = '#FEFF49';
      t.stroke = '#000000';
      t.strokeThickness = 9;
      t.inputEnabled = true;
      t.events.onInputDown.add(actionCallback, this);
      t.events.onInputOver.add(function () {
        t.fill = '#FF9649';
        _this2.game.canvas.style.cursor = 'pointer';
      }, this);
      t.events.onInputOut.add(function () {
        t.fill = '#FEFF49';
        _this2.game.canvas.style.cursor = 'initial';
      }, this);
      t.cursor = 'pointer';
    }
  }, {
    key: 'startGame',
    value: function startGame() {
      this.music.stop();
      this.fx.play('star');
      this.game.state.start('game');
    }
  }, {
    key: 'options',
    value: function options() {}
  }, {
    key: 'credits',
    value: function credits() {}
  }]);

  return MenuState;
}(Phaser.State);

exports.default = MenuState;
;

},{"objects/BigKraken":5}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TweenParams = require('util/TweenParams');

var _TweenParams2 = _interopRequireDefault(_TweenParams);

var _LogoBall = require('objects/LogoBall');

var _LogoBall2 = _interopRequireDefault(_LogoBall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplashState = function (_Phaser$State) {
  _inherits(SplashState, _Phaser$State);

  function SplashState() {
    _classCallCheck(this, SplashState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SplashState).apply(this, arguments));
  }

  _createClass(SplashState, [{
    key: 'createBalls',
    value: function createBalls() {
      var _this2 = this;

      var worldWidth = this.game.world.width;
      var halfWorldWidth = worldWidth / 2;
      var worldHeight = this.game.world.height;
      var halfWorldHeight = worldHeight / 2;

      var ballPathPoints = {
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
      };

      this.balls = Object.keys(ballPathPoints).map(function (img, i) {
        var ball = new _LogoBall2.default(_this2.game, img, ballPathPoints[img], _this2['animLogoBall' + (i + 1)]);
        ball.create();
        _this2.game.add.existing(ball.sprite);
        return ball;
      });
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image('logo-text', 'imgs/trio-ternura-studios.png');

      this.animLogoText = new _TweenParams2.default(200, 200, Phaser.Easing.Quadratic.Out);
      this.animLogoBall1 = new _TweenParams2.default(800, 750, Phaser.Easing.Bounce.Out);
      this.animLogoBall2 = new _TweenParams2.default(950, 750, Phaser.Easing.Bounce.Out);
      this.animLogoBall3 = new _TweenParams2.default(1100, 750, Phaser.Easing.Bounce.Out);

      this.game.load.image('logo-ball1', 'imgs/logo-ball1.png');
      this.game.load.image('logo-ball2', 'imgs/logo-ball2.png');
      this.game.load.image('logo-ball3', 'imgs/logo-ball3.png');
    }
  }, {
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = '#fff';

      var logoTextSprite = this.game.add.sprite(this.game.world.width / 2, this.game.world.height, 'logo-text');
      logoTextSprite.anchor.setTo(0.5, 0);

      this.game.add.tween(logoTextSprite).to({
        y: this.game.world.height * 0.5
      }, this.animLogoText.duration, Phaser.Easing.Quadratic.Out, true, this.animLogoText.start);

      this.createBalls();

      // creates an invisible text with each webfont so it preloads them here
      this.game.make.text(-100, -100, 'a', { font: 'Chewy' });
      this.game.make.text(-100, -100, 'b', { font: 'Chango' });
      this.game.make.text(-100, -100, 'c', { font: 'Ubuntu Mono' });

      this.game.time.events.add(5000, this.goToMenu, this);
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'update',
    value: function update() {
      this.balls.forEach(function (ball) {
        ball.update();
      });
    }
  }, {
    key: 'goToMenu',
    value: function goToMenu() {
      this.game.state.start('menu');
    }
  }]);

  return SplashState;
}(Phaser.State);

exports.default = SplashState;
;

},{"objects/LogoBall":12,"util/TweenParams":19}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GradientBackground = function () {
  function GradientBackground(game) {
    _classCallCheck(this, GradientBackground);

    this.game = game;
  }

  _createClass(GradientBackground, [{
    key: 'create',
    value: function create(width, height) {
      var colors = arguments.length <= 2 || arguments[2] === undefined ? [{ value: 'white', position: 0 }] : arguments[2];

      var bitmap = this.game.add.bitmapData(width, height);
      var grd = bitmap.context.createLinearGradient(0, 0, 0, height);

      colors.forEach(function (color) {
        grd.addColorStop(color.position, color.value);
      });
      bitmap.context.fillStyle = grd;
      bitmap.context.fillRect(0, 0, width, height);

      this.game.add.sprite(0, 0, bitmap);
    }
  }]);

  return GradientBackground;
}();

exports.default = GradientBackground;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function Animation(start, duration) {
  _classCallCheck(this, Animation);

  this.start = start;
  this.duration = duration;
};

exports.default = Animation;
;

},{}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function randomFloat(start, variation) {
  return Math.random() * variation + start;
};

exports.randomFloat = randomFloat;

},{}]},{},[2])
//# sourceMappingURL=game.js.map
