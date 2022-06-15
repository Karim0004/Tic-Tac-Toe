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

    let start = (player1, player2) => {
        gameboard.clear();
        players[0] = player1;
        players[1] = player2;
        playing = true;
    }
    
    let turn = (cell) => {
        if (playing) {
            gameboard.insert(players[currentPlayer].symbol, cell);
            (currentPlayer === 0) ? currentPlayer = 1 : currentPlayer = 0;
        }
    } 

    return {start, turn}
})();


// module for viewing the board and getting player input through cell clicks //
const displayController = (() => {
    
    let boardCells = document.querySelectorAll('.board > *');
    let winningScreen = document.getElementById('winning-screen');
    let startMenu = document.getElementById('start-menu');

    // listening for clicks on cells //
    boardCells.forEach((element) => {
        element.addEventListener('click', (e) => {
            game.turn(Number(e.target.id));
            updateBoard();
        })
    })


    let updateBoard = () => {
        const board = gameboard.getBoard()
        for (let i in board) {
            boardCells[i].textContent = board[i];
        }
    }

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


// const player = (name, symbol) => {
//     if (!['X', 'O'].includes(symbol)) return console.log('ERORR: bad symbol');
//     return {name, symbol};
// }

// let buttons = document.querySelectorAll('.mark-buttons > button');
// buttons.forEach((button) => {
//     button.addEventListener('click', (e) => {
//         e.target.classList.add('selected-mark');
//     })
// })