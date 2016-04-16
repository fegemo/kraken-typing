function agePreviousDescriptions(logEl) {
  var oldDescriptions = Array.from(logEl.querySelectorAll('p'));
  oldDescriptions.forEach(p => p.classList.add('aged'));
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

let tutorialAppeared = false;
let originalFigureElClasses;
let originalLogContent;

document.addEventListener('DOMContentLoaded', function(event) {
  var figureEl = document.querySelector('#git-kraken-figure'),
    logEl = document.querySelector('#git-kraken-log');
    
  // saves the class names initially added to the figureEl
  originalFigureElClasses = figureEl.className;
  // and the content of the log
  originalLogContent = logEl.innerHTML;
});

export default {
  animate: function(name) {
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
        insertNewDescriptionInLog(logEl, 'Start a fresh repo and also choose a license and a starting <code>.gitignore</code>')
        break;

      case 'git-clone':
        leftArrowEl.innerText = 'Clone a repo here!';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Connect to GitHub &amp; BitBucket to clone straight from them. No keyboard expertise required.')
        break;

      case 'git-tag':
        leftArrowEl.innerText = 'See/create tags here';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Create, delete and check for tags here.')
        break;

      case 'git-checkout':
        leftArrowEl.innerText = 'Switch branches here';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Change the current branch, delete or create new ones here.')
        break;

      case 'git-show':
        leftArrowEl.innerText = '';
        rightArrowEl.innerText = 'Inspect a commit';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'See the details of a previous commit here.')
        break;

      case 'git-commit':
        leftArrowEl.innerText = '';
        rightArrowEl.innerText = 'Add stuff and commit';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'View the diff, add files and commit, everything here!')
        break;

      case 'git-remote':
        leftArrowEl.innerText = 'Remote repos';
        rightArrowEl.innerText = '';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'Set up and view remote repos easily.')
        break;

      case 'git-log':
        leftArrowEl.innerText = '';
        rightArrowEl.innerText = 'Graphical logs';
        // inserts the new guy
        insertNewDescriptionInLog(logEl, 'See what\'s going on the repo through logs showing commits and branches.')
        insertNewDescriptionInLog(logEl, '<a id="gk-download" href="http://gitkraken.com" target="_blank">Unleash the Kraken</a>')
        break;
    }
  },

  reset: function() {
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
}
