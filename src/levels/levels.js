import database from 'levels/database';

var level0 = {
  initialMinInterval: 500,
  finalMinInterval: 300,

  initialMaxInterval: 300,
  finalMaxInterval: 500,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.2,

  waves: [
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 2,
        git: {
          cmd: 'git init',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.large,
        quantity: 2,
        git: {
          cmd: 'git clone',
          atProgress: 0.4
        }
      }
    }
  ]
};

var level1 = {
  initialMinInterval: 1500,
  finalMinInterval: 1300,

  initialMaxInterval: 3300,
  finalMaxInterval: 2500,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.2,

  waves: [
    {
      type: 'instructions',
      delayAfter: 200,
      enemies: {
        exactly: [
          'type', 'each', 'word', 'to', 'shoot', 'at', 'us'
        ]
      }
    },
    {
      type: 'instructions',
      delayAfter: 100,
      enemies: {
        exactly: [
          'foes', 'are', 'coming...', 'kill', 'them', 'all!'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 2
      }
    },
    {
      type: 'instructions',
      delayAfter: 0,
      enemies: {
        exactly: [
          'see', 'how', 'easy', 'that', 'was?', ':D'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 300,
      enemies: {
        fromPool: database.regular.short,
        quantity: 8
      }
    },
    {
      type: 'console',
      delayAfter: 300,
      enemies: {
        fromPool: database.regular.short,
        quantity: 12
      }
    }
  ]
};

var level2 = {
  initialMinInterval: 1000,
  initialMaxInterval: 2000,

  finalMinInterval: 500,
  finalMaxInterval: 800,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.5,

  waves: [
    {
      type: 'instructions',
      delayAfter: 800,
      enemies: {
        exactly: [
          'git', 'cmds', 'are', 'special'
        ]
      }
    },
    {
      type: 'instructions',
      delayAfter: 800,
      enemies: {
        exactly: [
          'git', 'cmds', 'are', 'special'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 800,
      enemies: {
        exactly: ['yay'],
        git: {
          cmd: 'git clone',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'instructions',
      delayAfter: 800,
      enemies: {
        exactly: [
          'never', 'need', 'to', 'type', 'that', 'again'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 800,
      enemies: {
        fromPool: database.regular.short,
        quantity: 20
      }
    }
  ]
};


export default [
  level0,
  level1,
  level2
];
