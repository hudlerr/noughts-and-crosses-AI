const utils = require("./utils");

let scores = {
    X: 10,
    O: -10,
    tie: 0
};

const minimax_ai = function(board, who_am_i) {

    let bestScore = -Infinity;
    let bestMove;

    //loop through all empty moves in a board
    for (let i = 0; i < 9; i++) {
        // Is the spot available?
        if (board[i] === ' ') {
            //set postion to playerid
            board[i] = who_am_i;
            //recusivly call minimax to return score for each [i]
            let opp = utils.get_opponent(who_am_i)
            let score = minimax_score(board, 0, true, who_am_i); //(board, opp, who_am_i);
            board[i] = ' ';
            //check if score is > lastbestScore
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    //console.log("Best move " + bestMove);
    return bestMove;
}

function minimax_score(board, depth, isMaximizing, who_am_i) {
    /*var iswinner = utils.checkWinner(who_am_i, board);
    if (iswinner === true) {
        return 10;
    } else if (utils.checkTie(board)) {
        return 0;
    } else if (iswinner === false) {
        return -10;
    }*/

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            // Is the spot available?
            if (board[i] == ' ') {
                board[i] = who_am_i;
                let opp = utils.get_opponent(who_am_i);
                //console.log("max player opp " + opp);
                let score = minimax_score(board, depth + 1, false, opp); //, opp);
                board[i] = ' ';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            // Is the spot available?
            if (board[i] === ' ') {
                board[i] = who_am_i;
                let opp = utils.get_opponent(who_am_i);
                //console.log("min player opp " + opp);
                let score = minimax_score(board, depth + 1, true, opp); //, opp);
                board[i] = ' ';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}
/*
function minimax_score(board, player_to_move, player_to_optimize) {
    var iswinner = utils.checkWinner(player_to_optimize, board);
    if (iswinner === true) {
        return 10;
    } else if (utils.checkTie(board)) {
        return 0;
    } else if (iswinner === false) {
        return -10;
    }

    let bestScore = [];
    for (let i = 0; i < 9; i++) {
        // Is the spot available?
        if (board[i] == ' ') {
            board[i] = player_to_move;

            let opp = utils.get_opponent(player_to_move);
            let opp_best_response_score = minimax_score(board, opp, player_to_optimize);
            board[i] = ' ';
            bestScore.push(opp_best_response_score);
        }
    }
    if (player_to_move === player_to_optimize) {
        bestScore = Math.max(bestScore);
    } else {
        bestScore = Math.min(bestScore);
    }
    return bestScore;
}*/

module.exports = { minimax_ai }