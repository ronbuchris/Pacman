'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const PWRFOOD = '⚡️';
const CHERRY = '🍒';

var gBoard;
var gCountFood = 0;
var gCherryInterval;
var gGame = {
  score: 0,
  isOn: false,
};
function init() {
  gGame.isOn = true;
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gCherryInterval = setInterval(function () {
    addCherry();
  }, 15000);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gCountFood++;
      if (
        i === 0 ||
        i === SIZE - 1 ||
        j === 0 ||
        j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)
      ) {
        board[i][j] = WALL;
        gCountFood--;
      }
      if (
        (i === 1 && j === 1) ||
        (i === 1 && j === 8) ||
        (i === 8 && j === 1) ||
        (i === 8 && j === 8)
      ) {
        board[i][j] = PWRFOOD;
      }
    }
  }
  return board;
}

function updateScore(diff) {
  gGame.score += diff;
  document.querySelector('h2 span').innerText = gGame.score;
}

function gameOver(res) {
  openModal(res);
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(gCherryInterval);
  gCherryInterval = null;
}

function openModal(res) {
  var elModal = document.querySelector('.modal');
  var elResult = document.querySelector('.result');
  elModal.style.display = 'block';
  elResult.innerText = res === 'win' ? 'you win' : 'you loose';
}

function closeModal() {
  var elModal = document.querySelector('.modal');
  elModal.style.display = 'none';
  restartGame();
}

function restartGame() {
  gCountFood = 0;
  gGame.score = 0;
  gCountEatenFood = 0;
  document.querySelector('h2 span').innerText = gGame.score;
  init();
}

function addCherry() {
  var emptyCells = checkEmptyCells();
  if (!emptyCells.length) return;
  var idx = getRandomInt(0, emptyCells.length);
  var emptyCell = emptyCells[idx];
  gBoard[emptyCell.i][emptyCell.j] = CHERRY;
  renderCell(emptyCell, CHERRY);
}

function checkEmptyCells() {
  var emptyCells = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      var cell = gBoard[i][j];
      if (cell === EMPTY) {
        emptyCells.push({ i: i, j: j });
      }
    }
  }
  return emptyCells;
}
