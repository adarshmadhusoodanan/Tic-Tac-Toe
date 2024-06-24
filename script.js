
// tic tac toe funtionality

// select all element

const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const toggleAIBtn = document.getElementById('toggleAI');


// constants for X and O 

const X_CLASS = 'x';
const O_CLASS = 'o';

// tracking turns

let oTurn;
let playingWithAI = false;


// winning combinations

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];


//initializing the game
startGame();



//add event listener for both buttons
restartBtn.addEventListener('click', startGame);
toggleAIBtn.addEventListener('click', toggleAI);



// function for start and restart
function startGame() {
    oTurn = false;  // staring player - X
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);  // removing X and O from each cell
        cell.classList.remove(O_CLASS); 

        cell.textContent = '';   // Clearing the text content

        cell.removeEventListener('click', handleClick);  // remove existing event listener
        cell.addEventListener('click', handleClick, { once: true });  // add click e listener
    });

    setBoardHoverClass(); // set hover for the turns
    statusDisplay.innerText = `Player ${oTurn ? "O" : "X"}'s turn`; //update the status and display
}



// handle cell click

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS; // X or O DEtermining
    placeMark(cell, currentClass);  // placeing the mark on the cell

    if (checkWin(currentClass)) {
        endGame(false);     // win, end
    } else if (isDraw()) {
        endGame(true);     // draw, end
    } else {
        swapTurns();    // swap turns
        setBoardHoverClass();   // set hover class for next turn

        if (playingWithAI && oTurn) {
            setTimeout(makeAIMove, 500); // ai makes a move after a delay
        } else {
            statusDisplay.innerText = `Player ${oTurn ? "O" : "X"}'s turn`; // update status in display
        }
    }
}


// ending the game

function endGame(draw) {
    if (draw) {
        statusDisplay.innerText = "Draw!";
    } else {
        statusDisplay.innerText = `Player ${oTurn ? "O" : "X"} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick); // remove event listener from cells
    });
}


// check game is draw or not
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS); // if all the cells are placed
    });
}


// place mark on the cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);  // add the current class 
    cell.textContent = currentClass.toUpperCase(); // Set text content to 'X' or 'O'
    cell.removeEventListener('click', handleClick); // remove click e listener after placing mark
}


// swap turns

function swapTurns() {
    oTurn = !oTurn;
}


// setting hover class 

function setBoardHoverClass() {
    board.classList.remove(X_CLASS); // remove X and O hover
    board.classList.remove(O_CLASS);
    if (oTurn) {                        // check if O Tturns or X turns
        board.classList.add(O_CLASS); // Aadd o hover class 
    } else {
        board.classList.add(X_CLASS); // add X hover class
    }
}


// current class is won or not

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass); // check if there is an winning combo for all cells
        });
    });
}


// toggle for playing with ai
function toggleAI() {
    playingWithAI = !playingWithAI; // toggle ai
    toggleAIBtn.innerText = playingWithAI ? "Play with Player" : "Play with AI"; //update btn  text
    startGame(); // restart the game when toggling AI
}


// make a move for ai
function makeAIMove() {
    const emptyCells = [...cells].filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS));
    if (emptyCells.length === 0) return; // No empty cells left
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]; // choose randam empty cell
    placeMark(randomCell, O_CLASS); // place o
    if (checkWin(O_CLASS)) {
        endGame(false);        // win, end
    } else if (isDraw()) {
        endGame(true);      // draw, end
    } else {
        swapTurns();   // swap  turn
        setBoardHoverClass();  // set hover to next plyr
        statusDisplay.innerText = `Player ${oTurn ? "O" : "X"}'s turn`; // update status to the display
    }
}
