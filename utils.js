const get_opponent = function(who_am_i) {
    if (who_am_i == 'X') {
        return 'O'
    } else if (who_am_i == 'O') {
        return 'X'
    } else {
        throw new Error("Unknown player: " + who_am_i);
    }
}

var winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

const checkWinner = function(player, board) {
    var i, j, markCount;
    for (i = 0; i < winningCombinations.length; i++) {
        markCount = 0;
        for (j = 0; j < winningCombinations[i].length; j++) {
            if (board[winningCombinations[i][j]] === player) {
                markCount++;
            }
            if (markCount === 3) {
                return true;
            }
        }
    }
    return false;
}

const checkTie = function(board) {
    for (var i = 1; i <= Object.keys(board).length; i++) {
        if (board[i] === ' ') {
            return false;
        }
    }
    return true;
}

module.exports = { get_opponent, checkWinner, checkTie }