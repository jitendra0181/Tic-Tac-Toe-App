document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const messageContainer = document.getElementById("message-container");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restart-btn");
    const cells = [];
    let currentPlayer = "X";
    let gameOver = false;

    // Create the cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => {
            if (!gameOver && !cell.textContent) {
                cell.textContent = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });
        cells.push(cell);
        board.appendChild(cell);
    }

    // Winning combinations
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check for a winner
    function checkWinner() {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent) {
                gameOver = true;
                message.textContent = `Player ${currentPlayer} wins!`;
                messageContainer.style.display = "block";
                break;
            }
        }

        // Check for a draw
        if (!gameOver && cells.every(cell => cell.textContent)) {
            gameOver = true;
            message.textContent = "It's a draw!";
            messageContainer.style.display = "block";
        }
    }

    // Reset the board
    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        gameOver = false;
        messageContainer.style.display = "none";
    }

    // Restart the game
    restartBtn.addEventListener("click", resetBoard);
});
