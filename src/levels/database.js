export default {
  regular: {
    // 2 to 3 letters
    short: [
      { cmd: 'cd', os: 'windows' },
      { cmd: 'cd', os: 'linux' },
      { cmd: 'dir', os: 'windows' },
      { cmd: 'ls', os: 'linux' },
      { cmd: 'dir', os: 'windows' },
      { cmd: 'top', os: 'linux' },
      { cmd: 'pwd', os: 'linux' },
      { cmd: 'cd ..', os: 'windows' },
      { cmd: 'cd ..', os: 'linux' },
      { cmd: 'del', os: 'windows' },
      { cmd: 'md', os: 'windows' },
      { cmd: 'cp', os: 'linux' },
      { cmd: 'rm', os: 'linux' },
      { cmd: 'tar', os: 'linux' },
      { cmd: 'cd', os: 'windows' },
      { cmd: 'tar', os: 'linux' },
      { cmd: 'cat', os: 'linux' },
      { cmd: 'clear', os: 'linux' },
      { cmd: 'cls', os: 'windows' },
      { cmd: 'cat', os: 'linux' },
      { cmd: 'sed', os: 'linux' },
      { cmd: 'sh', os: 'linux' },
      { cmd: 'ps', os: 'linux' },
      { cmd: 'aux', os: 'linux' },
      { cmd: 'zip', os: 'windows' }
    ],

    // 4 to 6
    mid: [
      { cmd: 'apm', os: 'windows' },
      { cmd: 'apt-get', os: 'linux' },
      { cmd: 'sudo', os: 'linux' },
      { cmd: 'brew', os: 'osx' },
      { cmd: 'kill', os: 'linux' },
      { cmd: 'grep', os: 'linux' },
      { cmd: 'date', os: 'linux' },
      { cmd: 'echo', os: 'linux' },
      { cmd: 'head', os: 'linux' },
      { cmd: 'tail', os: 'linux' },
      { cmd: 'more', os: 'linux' },
      { cmd: 'less', os: 'linux' },
      { cmd: 'man', os: 'linux' },
      { cmd: 'which', os: 'linux' },
      { cmd: 'mkdir', os: 'linux' },
      { cmd: 'touch', os: 'osx' },
      { cmd: 'cd ..', os: 'windows' },
      { cmd: 'copy', os: 'windows' },
      { cmd: 'chkdsk', os: 'windows' },
      { cmd: 'cd ..', os: 'linux' },
      { cmd: 'nstat', os: 'linux' },
      { cmd: 'open', os: 'linux' },
      { cmd: 'rename', os: 'linux' },
      { cmd: 'source', os: 'linux' },
      { cmd: 'telnet', os: 'linux' },
      { cmd: 'ping', os: 'windows' },
      { cmd: 'ping', os: 'linux' },
      { cmd: 'time', os: 'linux' },
      { cmd: 'type', os: 'linux' },
      { cmd: 'wget', os: 'linux' },
      { cmd: 'curl', os: 'linux' },
      { cmd: 'whoami', os: 'linux' }
    ],

    // more than 6 letters
    large: [
      { cmd: 'whereis', os: 'osx' },
      { cmd: 'format C:', os: 'windows' },
      { cmd: 'apt-get install', os: 'linux' },
      { cmd: 'shutdown', os: 'linux' },
      { cmd: 'shutdown', os: 'windows' },
      { cmd: 'ipconfig', os: 'windows' },
      { cmd: 'ifconfig', os: 'linux' },
      { cmd: 'cd ../../', os: 'osx' },
      { cmd: 'apt-cache search', os: 'linux' },
      { cmd: 'brew install', os: 'osx' },
      { cmd: 'mv ../ .', os: 'linux' },
      { cmd: 'copy ../ .', os: 'windows' },
      { cmd: 'cd ..', os: 'osx' }
    ]
  },
  git: {
    'git init': '#anim-git-init',
    'git clone': '#anim-git-clone',
    'git branch': '#anim-git-branch'
  }
};
