const columns = 7;
const rows = 6;
let currentPlayer = 'player1'; // Alterna entre 'player1' y 'player2'
let board = [];
let gameActive = true;

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    board = Array(rows).fill().map(() => Array(columns).fill(null));

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'empty');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (!gameActive) return;

    const col = event.target.dataset.col;
    const row = findEmptyRow(col);

    if (row !== null) {
        board[row][col] = currentPlayer;
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.classList.remove('empty');
        cell.classList.add(currentPlayer);

        if (checkWinner(board, currentPlayer)) {
            alert(`${currentPlayer} ha ganado!`);
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    }
}

function findEmptyRow(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            return row;
        }
    }
    return null;
}

function checkWinner(board, player) {
    const rows = board.length;
    const columns = board[0].length;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            if (board[row][col] === player) {
                if (checkDirection(row, col, 0, 1, board, player) || // Horizontal
                    checkDirection(row, col, 1, 0, board, player) || // Vertical
                    checkDirection(row, col, 1, 1, board, player) || // Diagonal /
                    checkDirection(row, col, -1, 1, board, player)) { // Diagonal \
                    return true;
                }
            }
        }
    }
    return false;
}

function checkDirection(row, col, rowDir, colDir, board, player) {
    let count = 0;
    const rows = board.length;
    const columns = board[0].length;

    for (let i = 0; i < 4; i++) {
        const r = row + i * rowDir;
        const c = col + i * colDir;

        if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === player) {
            count++;
        } else {
            break;
        }
    }

    return count === 4;
}

document.getElementById('reset').addEventListener('click', () => {
    createBoard();
    currentPlayer = 'player1';
    gameActive = true;
});

createBoard();
