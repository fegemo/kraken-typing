import database from 'levels/database';

var level1 = {
  initialMinInterval: 1500,
  finalMinInterval: 1000,

  initialMaxInterval: 2300,
  finalMaxInterval: 1500,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.5,

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
      type: 'instructions',
      delayAfter: 300,
      enemies: {
        exactly: [
          'there', 'they', 'come', 'so', 'take', 'care'
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
        exactly: [],
        git: {
          cmd: '#anim-git-clone',
          progress: 0
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
  level1,
  level2
];
