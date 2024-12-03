function applyMoves(arrayToDraw, movesLog, canvas, context) {
    const rowsCols = 3;
    const gridWidth = canvas.width / rowsCols;
    const gridHeight = canvas.height / rowsCols;

    function initialproblem() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineWidth = "3px";
        context.strokeStyle = "black";
        context.font = "30px Times New Roman";
        context.textAlign = "center";
        context.textBaseline = "middle";

        for (let row = 0; row < rowsCols; row++) {
            for (let col = 0; col < rowsCols; col++) {
                const x = col * gridWidth;
                const y = row * gridHeight;

                // Draw grid cell
                context.beginPath();
                context.rect(x, y, gridWidth, gridHeight);
                context.stroke();

                // Draw the number
                const numElements = arrayToDraw[row][col];
                if (numElements) {
                    const textX = x + gridWidth / 2; // Center of the cell
                    const textY = y + gridHeight / 2; // Center of the cell
                    context.fillText(numElements, textX, textY);
                }
            }
        }
    }

    async function movementAnimation() {
        for (const move of movesLog) {
            const fromRow = move.from.row;
            const fromCol = move.from.col;
            const toRow = move.to.row;
            const toCol = move.to.col;

            [arrayToDraw[toRow][toCol], arrayToDraw[fromRow][fromCol]] =
                [arrayToDraw[fromRow][fromCol], arrayToDraw[toRow][toCol]];

                initialproblem();
            await new Promise(resolve => setTimeout(resolve, 500)); 
        }
    }

    initialproblem(); 
    movementAnimation(); 
}