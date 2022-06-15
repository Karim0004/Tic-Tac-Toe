const gameboard = (() => {
    let board = [null,null,null,null,null,null,null,null,null];

    // insert a symbol to the board //
    let insert = (symbol, index) => {
        // error checking index number and symbol //
        if (![0,1,2,3,4,5,6,7,8].includes(index)) return console.log('ERROR: bad index');
        if (!['X', 'O'].includes(symbol)) return console.log('ERROR: bad symbol');

        board[index] = symbol;
    }

    let clear = () => {
        board.fill(null, 0);
    }

    let getBoard = () => board;

    return {insert, clear, getBoard};
})();


// module controlling the game //
const game = (() => {
    const players = [null, null];
    let currentPlayer = 0;
    let playing = false;

    // starts the game //
    let start = (player1, player2) => {
        gameboard.clear();
        players[0] = player1;
        players[1] = player2;
        playing = true;
        displayController.displayBoard();
    }
    
    // takes a cell and plays a turn then switches current player for next turn //
    let turn = (cell) => {
        if (playing) {
            gameboard.insert(players[currentPlayer].symbol, cell);
            (currentPlayer === 0) ? currentPlayer = 1 : currentPlayer = 0;
            displayController.updateBoard();

            // TODO check if a player won //
        }
    } 

    return {start, turn};
})();


// module for viewing the board and getting player input through cell clicks //
const displayController = (() => {
    
    let boardCells = document.querySelectorAll('.board > *');
    let winningScreen = document.getElementById('winning-screen');
    let startMenu = document.getElementById('start-menu');
    let markButtons = document.querySelectorAll('.mark-buttons > button');
    let startButton = document.getElementById('start');
    let Names = document.querySelectorAll('.player-name');

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
    let updateBoard = () => {
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
    let displayBoard = () => {
        if (!startMenu.classList.contains('hidden')) {
            startMenu.classList.add('hidden');
        }
        if (!winningScreen.classList.contains('hidden')) {
            winningScreen.classList.add('hidden');
        }
    }

    let displayWinner = () => {
        if (!startMenu.classList.contains('hidden')) {
            startMenu.classList.add('hidden');
        }
        if (winningScreen.classList.contains('hidden')) {
            winningScreen.classList.remove('hidden');
        }
    }

    let displayMenu = () => {
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