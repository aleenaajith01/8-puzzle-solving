let myCanvas = document.getElementById("gridCanvas");
let context = myCanvas.getContext("2d");


const columsRows = 3;
const gridWidth = gridHeight = myCanvas.width / columsRows;
let initialGrid = [['', 2, 3],
                   [1, 5, 6],
                   [4, 7, 8]]


function drawPuzzleAndSetNumbers() {
    context.clearRect(0, 0, myCanvas.width, myCanvas.height); // Clear canvas before redrawing

    context.lineWidth = 16;   //it doesn't require unit spec. Default unit is pixel.
    context.font = "30px Times New Roman";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.strokeStyle = "#033618";

    for (let row = 0; row < columsRows; row++) {
        for (let col = 0; col < columsRows; col++) {
            const x = col * gridWidth;
            const y = row * gridHeight;

            // Drawing grid
            context.beginPath();
            context.rect(x, y, gridWidth, gridHeight);
            context.stroke();

            // Filling the numbers
            const numberElement = initialGrid[row][col];
            if (numberElement) {
                const posX = x + gridWidth / 2;
                const posY = y + gridHeight / 2;
                context.fillText(numberElement, posX, posY);
            }
        }
    }
}
drawPuzzleAndSetNumbers();

document.addEventListener("DOMContentLoaded", () => {
    arrayElementsShuffle();   // for changing to dynamic array
})

//Core Logic for Puzzle 
const solutionGrid = [[1, 2, 3],
                      [4, 5, 6],
                      [7, 8, '']]

function PuzzleSolved() {
    for (let row = 0; row < columsRows; row++) {
        for (let col = 0; col < columsRows; col++) {
            if (initialGrid[row][col] !== solutionGrid[row][col]) {
                return false;
            }
        }
    }
    return true;
}

myCanvas.addEventListener("click", function (event) {
    if (!countdownStarted) {
        startCountdown(); 
    }
    
    startStopwatch();
    let rect = myCanvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    let row = Math.floor(y / gridHeight);
    let col = Math.floor(x / gridWidth);

    if (findAdjacentCells(initialGrid)) {
        swapingWithEmpty(row, col);
    }

    if (PuzzleSolved()) {
        stopCountdown();

        successBanner();
        
        playAgain.innerHTML = "Play Again";
        playAgain.addEventListener("click", () => {
            gameModal.style.display = "none";
            arrayElementsShuffle();
            clickTimestamps = [];
            movesLog = [];
            resetStopwatch();
            countdownStarted = false;
            resetGame(); 
        });
    }
});
