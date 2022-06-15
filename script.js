const gameboard = (() => {
    let board = [null,null,null,null,null,null,null,null,null];

    // insert a symbol to the board //
    const insert = (symbol, index) => {
        // error checking index number and symbol //
        if (![0,1,2,3,4,5,6,7,8].includes(index)) return console.log('ERROR: bad index');
        if (!['X', 'O'].includes(symbol)) return console.log('ERROR: bad symbol');

        board[index] = symbol;
    }

    const clear = () => {
        board.fill(null, 0);
    }

    const getBoard = () => board;

    return {insert, clear, getBoard};
})();


// module controlling the game //
const game = (() => {
    const players = [null, null];
    let currentPlayer = 0;
    let playing = false;

    // starts the game //
    const start = (player1, player2) => {
        gameboard.clear();
        players[0] = player1;
        players[1] = player2;
        playing = true;
        currentPlayer = 0;
        displayController.displayBoard();
    }
    
    // takes a cell and plays a turn then switches current player for next turn //
    const turn = (cell) => {
        if (playing) {
            gameboard.insert(players[currentPlayer].symbol, cell);
            displayController.updateBoard();
            checkWin(players[currentPlayer].symbol, cell);
            (currentPlayer === 0) ? currentPlayer = 1 : currentPlayer = 0;
        }
    } 


    // checks if a 3 in a row pattern is presesnt to declare a winner //
    const winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7],
    [2,5,8], [0,4,8], [2,4,6]];
    const checkWin = (symbol, cell) => {
        
        const board = gameboard.getBoard();
        let winningCells = [];

        // only select the winning patterns that include the cell that was played //
        let possibleWins = winningPatterns.filter((pattern) => {
            return pattern.includes(cell);
        });

        // checking if a winning pattern exists on the board //
        for (let pw of possibleWins) {
            if (board[pw[0]] === symbol && board[pw[1]] === symbol
                && board[pw[2]] === symbol) {
                    winningCells = pw;
                    break;
                }
        }

        // if a player won, set playing state to false and view winning screen //
        if (winningCells.length > 0) {
            playing = false;
            displayController.displayWinner(winningCells, players[currentPlayer].name);
        }

    }

    return {start, turn};
})();


// module for viewing the board and getting player input through cell clicks //
const displayController = (() => {
    
    const boardCells = document.querySelectorAll('.board > *');
    const winningScreen = document.getElementById('winning-screen');
    const winningText = document.querySelector('.winning-text');
    const startMenu = document.getElementById('start-menu');
    const markButtons = document.querySelectorAll('.mark-buttons > button');
    const startButton = document.getElementById('start');
    const Names = document.querySelectorAll('.player-name');

    // listening for clicks on cells //
    boardCells.forEach((element) => {
        element.addEventListener('click', (e) => {
            game.turn(Number(e.target.id));
        })
        })


    // choosing mark buttons functionality //
    markButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            // removing selections that conflict with this selection //
            for (let but of markButtons) {
                if (but.textContent === button.textContent
                    || but.parentElement === button.parentElement) {
                    but.classList.remove('selected-mark');
                }
            }
            // adding selection class to the clicked button //
            button.classList.add('selected-mark');
        })
    })

    // update the board from the gameboard object to the DOM //
    const updateBoard = () => {
        const board = gameboard.getBoard()
        for (let i in board) {
            boardCells[i].textContent = board[i];
        }
    }

    // starting the game by clicking on the play button //
    startButton.addEventListener('click', () => {
        if (markButtons[1].classList.contains('selected-mark')
        || markButtons[2].classList.contains('selected-mark')) {
            game.start(player(Names[0].value, 'O'), player(Names[1].value, 'X'));
        } else {
            game.start(player(Names[0].value, 'X'), player(Names[1].value, 'O'));
        }
    })


    // methods for displaying game states //
    const displayBoard = () => {
        if (!startMenu.classList.contains('hidden')) {
            startMenu.classList.add('hidden');
        }
        if (!winningScreen.classList.contains('hidden')) {
            winningScreen.classList.add('hidden');
        }

        // clear winning class off cells //
        boardCells.forEach((cell) => {
            if (cell.classList.contains('winning-cell')) {
                cell.classList.remove('winning-cell');
            }
        })
    }

    const displayWinner = (winningCells, name) => {
        if (!startMenu.classList.contains('hidden')) {
            startMenu.classList.add('hidden');
        }
        if (winningScreen.classList.contains('hidden')) {
            winningScreen.classList.remove('hidden');
        }

        // highlight the winning cells //
        for (n of winningCells) boardCells[n].classList.add('winning-cell');
        // display winner's name //
        winningText.textContent = `${name} Won The Game!`;
    }

    const displayMenu = () => {
        if (startMenu.classList.contains('hidden')) {
            startMenu.classList.remove('hidden');
        }
        if (!winningScreen.classList.contains('hidden')) {
            winningScreen.classList.add('hidden');
        }
    }


    return {updateBoard, displayBoard, displayMenu, displayWinner};
})();

// player creator //
const player = (name, symbol) => {
    if (!['X', 'O'].includes(symbol)) return console.log('ERORR: bad symbol');
    name = name || `player with ${symbol}`;

    return {name, symbol};
}