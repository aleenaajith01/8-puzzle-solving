//Finding thr Empty cell's Position
function emptyCellfinding() {
    for (let i = 0; i < columsRows; i++) {
        for (let j = 0; j < columsRows; j++) {
            if (initialGrid[i][j] === '') {
                return { row: i, col: j };
            }
        }
    }
}
//const theEmptycell = emptyCellfinding();
//console.log(theEmptycell);

//----finding the adjecent cells's of the emptycell----//
function findAdjacentCells(initialGrid) {

    const columsRows = initialGrid.length; 
    let emptyCell = emptyCellfinding(); 
    let row = emptyCell.row;
    let col = emptyCell.col;

    let adjacentCells = [];

    row > 0 && adjacentCells.push({ row: row - 1, col }); // up
    row < columsRows - 1 && adjacentCells.push({ row: row + 1, col }); // down
    col > 0 && adjacentCells.push({ row, col: col - 1 }); // Left
    col < columsRows - 1 && adjacentCells.push({ row, col: col + 1 }); // Right

    return adjacentCells;
}
let adjecentOfEmptyCell = findAdjacentCells(initialGrid);
//console.log(adjecentOfEmptyCell);

let movesLog = [];

function swapingWithEmpty(row, col) {
    const emptyCell = emptyCellfinding();
    const rowDiff = emptyCell.row - row;
    const colDiff = emptyCell.col - col;

    if (rowDiff === 1 && colDiff === 0) {
        moveDirection = "moveDown";
    } else if (rowDiff === -1 && colDiff === 0) {
        moveDirection = "moveUp";
    } else if (colDiff === 1 && rowDiff === 0) {
        moveDirection = "moveRight";
    } else if (colDiff === -1 && rowDiff === 0) {
        moveDirection = "moveLeft";
    }

    if ((Math.abs(rowDiff) === 1 && colDiff === 0) || (rowDiff === 0 && Math.abs(colDiff) === 1)) {
        
        movesLog.push({
            from: { row, col },
            to: { row: emptyCell.row, col: emptyCell.col },
            direction: moveDirection,
        });

        let timestamp = getTimeStamp();
        clickTimestamps.push({timestamp });
        //console.log(`Time: ${timestamp}`); 

        [initialGrid[emptyCell.row][emptyCell.col], initialGrid[row][col]] =
            [initialGrid[row][col], initialGrid[emptyCell.row][emptyCell.col]];

        drawPuzzleAndSetNumbers();
    }
}


//-----Shuffling the array elements array----//
let initialShuffledArray = [];

function arrayElementsShuffle() {

    const flatArray = initialGrid.flat();
    for (let i = flatArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flatArray[i], flatArray[j]] = [flatArray[j], flatArray[i]];
    }

    initialGrid = [];
    while (flatArray.length) initialGrid.push(flatArray.splice(0, columsRows));

    if (initialShuffledArray.length === 0) {
        initialShuffledArray = JSON.parse(JSON.stringify(initialGrid));
    }
    
    drawPuzzleAndSetNumbers();
    return initialGrid;
}