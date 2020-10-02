const prompt = require('prompt-sync')({ sigint: true });

//** AI **/

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

const random_ai = function() {
    var random_number = Math.floor(Math.random() * 9) + 1;
    return random_number;
}

const findWinningMove_ai = function(board, player) {
    var i, j, markCount;
    for (i = 0; i < winningCombinations.length; i++) {
        markCount = 0;
        counter = 0;
        for (j = 0; j < winningCombinations[i].length; j++) {
            counter++;
            if (board[winningCombinations[i][j]] === player) {
                markCount++;
            }
            if (markCount === 2) {
                for (k = 0; k < winningCombinations[i].length; k++) {
                    if (board[winningCombinations[i][k]] === ' ') {
                        return winningCombinations[i][k];
                    }
                }
            }
        }
    }
    return random_ai();
}

const human_player = function(current_player_id) {
    position = prompt('Pick your move! ');
    return position;
}

module.exports = { human_player, findWinningMove_ai, random_ai }