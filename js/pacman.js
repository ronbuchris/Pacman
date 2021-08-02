'use strict';
const PACMAN = '😷';

var gCountEatenFood = 0;
var gPacman;
function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  gCountFood--;
}
function movePacman(ev) {
  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(ev);

  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  if (nextCell === WALL) return;
  if (nextCell === FOOD) {
    updateScore(1);
    gCountEatenFood++;
  } else if (nextCell === CHERRY) {
    updateScore(10);
  } else if (nextCell === PWRFOOD) {
    if (gPacman.isSuper) return;
    gCountEatenFood++;
    gPacman.isSuper = true;
    setTimeout(function () {
      gPacman.isSuper = false;
    }, 5000);
  }

  if (nextCell === GHOST) {
    if (gPacman.isSuper) {
      nextCell === EMPTY;
      var ghostIdx = getGhostIdx(nextLocation);
      gGhosts.splice(ghostIdx, 1);
    } else {
      gameOver();
      return;
    }
  }
  if (gCountEatenFood === gCountFood) {
    gameOver('win');
    return;
  }

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

  // update the dom
  renderCell(gPacman.location, EMPTY);

  gPacman.location = nextLocation;

  // update the model
  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // update the dom
  renderCell(gPacman.location, PACMAN);
}

function getNextLocation(eventKeyboard) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j,
  };
  switch (eventKeyboard.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default:
      return null;
  }
  return nextLocation;
}
