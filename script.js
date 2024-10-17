// Variables to track the game state
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

// Cache DOM elements
const gameBoard = document.getElementById('game-board');
const messageDiv = document.getElementById('message');
const resetBtn = document.getElementById('reset-btn');

// Winning combinations
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Create game cells dynamically
function createBoard() {
  gameBoard.innerHTML = ''; // Clear any existing cells
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    gameBoard.appendChild(cell);
  });
}

// Handle cell clicks
function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (board[index] || !gameActive) return; // Ignore if cell already occupied or game over

  board[index] = currentPlayer;
  cell.innerHTML = currentPlayer === 'X' 
    ? `<i class="bi bi-x-lg text-danger icon-x"></i>` 
    : `<i class="bi bi-circle text-primary icon-o"></i>`;

  if (checkWinner()) {
    showMessage(`${currentPlayer} wins! 🎉`);
    gameActive = false;
  } else if (board.every(cell => cell)) {
    showMessage("It's a draw! 🤝");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Check if the current player wins
function checkWinner() {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === currentPlayer)
  );
}

// Show message in the alert box
function showMessage(msg) {
  messageDiv.textContent = msg;
  messageDiv.classList.remove('d-none');
}

// Reset the game
resetBtn.addEventListener('click', () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  messageDiv.classList.add('d-none');
  createBoard();
});

// Initialize the game
createBoard();
