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

    return {insert, clear, getBoard}
})();


const game = () => {

}


const displayController = () => {

}


const player = (name, symbol) => {
    return {name, symbol}
}

