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
        quantity: 5,
        git: {
          name: 'git-init',
          cmd: 'git init',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 2,
        git: {
          name: 'git-clone',
          cmd: 'git clone',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 2,
        git: {
          name: 'git-tag',
          cmd: 'git tag',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 2,
        git: {
          name: 'git-checkout',
          cmd: 'git checkout',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 2,
        git: {
          name: 'git-show',
          cmd: 'git show HEAD',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 2,
        git: {
          name: 'git-commit',
          cmd: 'git commit -am "yikes"',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 2,
        git: {
          name: 'git-remote',
          cmd: 'git remote add origin bitbucket.org',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 2,
        git: {
          name: 'git-log',
          cmd: 'git log --graph --all --oneline',
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
      delayAfter: 0,
      enemies: {
        exactly: [
          'type', 'to', 'shoot', 'at', 'us'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 3
      }
    },
    {
      type: 'instructions',
      delayAfter: 0,
      enemies: {
        exactly: [
          'see', 'how', 'easy', 'that', 'was?'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 200,
      enemies: {
        fromPool: database.regular.short,
        quantity: 6
      }
    },
    {
      type: 'console',
      delayAfter: 1000,
      enemies: {
        fromPool: database.regular.short,
        quantity: 8
      }
    }
  ]
};

var level2 = {
  initialMinInterval: 1400,
  finalMinInterval: 1100,

  initialMaxInterval: 3200,
  finalMaxInterval: 2400,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.25,

  waves: [
    {
      type: 'instructions',
      delayAfter: 200,
      enemies: {
        exactly: [
          'kill', 'git', 'cmds', 'for', 'prizes'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 1500,
      enemies: {
        fromPool: database.regular.short,
        quantity: 4,
        git: {
          name: 'git-init',
          cmd: 'git init',
          atProgress: 0.7
        }
      }
    },
    {
      type: 'instructions',
      delayAfter: 200,
      enemies: {
        exactly: [
          'keep', 'it', 'going', 'till', 'the', 'end'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 800,
      enemies: {
        fromPool: database.regular.short,
        quantity: 6
      }
    },
    {
      type: 'console',
      delayAfter: 1000,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 2,
        git: {
          name: 'git-clone',
          cmd: 'git clone',
          atProgress: 0.4
        }
      }
    }
  ]
};

var level3 = {
  initialMinInterval: 1300,
  finalMinInterval: 900,

  initialMaxInterval: 3000,
  finalMaxInterval: 2000,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.3,

  waves: [
    {
      type: 'instructions',
      delayAfter: 0,
      enemies: {
        exactly: [
          'good', 'job', 'over', 'there'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 400,
      enemies: {
        fromPool: database.regular.short,
        quantity: 6
      }
    },
    {
      type: 'console',
      delayAfter: 1500,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 6,
        git: {
          name: 'git-tag',
          cmd: 'git tag',
          atProgress: 0.8
        }
      }
    },
    {
      type: 'console',
      delayAfter: 1000,
      enemies: {
        fromPool: database.regular.large,
        quantity: 3
      }
    },
    {
      type: 'console',
      delayAfter: 800,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 4,
        git: {
          name: 'git-checkout',
          cmd: 'git checkout master',
          atProgress: 0.5
        }
      }
    }
  ]
};

var level4 = {
  initialMinInterval: 1100,
  finalMinInterval: 800,

  initialMaxInterval: 2600,
  finalMaxInterval: 1800,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.35,

  waves: [
    {
      type: 'console',
      delayAfter: 0,
      enemies: {
        fromPool: database.regular.short,
        quantity: 8
      }
    },
    {
      type: 'console',
      delayAfter: 800,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 4
      }
    },
    {
      type: 'console',
      delayAfter: 1500,
      enemies: {
        fromPool: database.regular.large,
        quantity: 4,
        git: {
          name: 'git-show',
          cmd: 'git show HEAD',
          atProgress: 0.7
        }
      }
    },
    {
      type: 'console',
      delayAfter: 200,
      enemies: {
        fromPool: database.regular.large,
        quantity: 2
      }
    },
    {
      type: 'console',
      delayAfter: 1500,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 4,
        git: {
          name: 'git-commit',
          cmd: 'git commit -am "yikes"',
          atProgress: 0.7
        }
      }
    }
  ]
};

var level5 = {
  initialMinInterval: 1000,
  finalMinInterval: 700,

  initialMaxInterval: 2200,
  finalMaxInterval: 1400,

  initialSpeedMultiplier: 1,
  finalSpeedMultiplier: 1.45,

  waves: [
    {
      type: 'instructions',
      delayAfter: 10,
      enemies: {
        exactly: [
          'you', 'are', 'almost', 'there...'
        ]
      }
    },
    {
      type: 'console',
      delayAfter: 1200,
      enemies: {
        fromPool: database.regular.mid,
        quantity: 7
      }
    },
    {
      type: 'console',
      delayAfter: 1500,
      enemies: {
        fromPool: database.regular.short,
        quantity: 5,
        git: {
          name: 'git-remote',
          cmd: 'git remote add origin bitbucket.org',
          atProgress: 0.4
        }
      }
    },
    {
      type: 'console',
      delayAfter: 600,
      enemies: {
        fromPool: database.regular.large,
        quantity: 7
      }
    },
    {
      type: 'console',
      delayAfter: 1000,
      enemies: {
        fromPool: database.regular.short,
        quantity: 6
      }
    },
    {
      type: 'console',
      delayAfter: 1500,
      enemies: {
        fromPool: database.regular.large,
        quantity: 4,
        git: {
          name: 'git-log',
          cmd: 'git log --graph --all --oneline',
          atProgress: 0.4
        }
      }
    }
  ]
};


export default [
  // level0,
  level1,
  level2,
  level3,
  level4,
  level5
];
