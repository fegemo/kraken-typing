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

export default {
  animate: function(command) {
    var figureEl = document.querySelector('#git-kraken-figure'),
      logEl = document.querySelector('#git-kraken-log'),
      leftArrowEl = document.querySelector('#gkui-arrow-1'),
      rightArrowEl = document.querySelector('#gkui-arrow-2');


    command = command.replace(/\s/g, '-');

    // puts a class with the name as the command on the figure element (top-most)
    figureEl.classList.add(command);

    // makes current paragraphs gray
    agePreviousDescriptions(logEl);

    switch (command) {
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

      case 'git-branch':
        break;
    }

  },

  start: function() {

  }
}
