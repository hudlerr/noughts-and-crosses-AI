const ai = require("./heuristic_ai.js");
const mm = require("./minimax_ai.js");
const utils = require("./utils");

function new_board() {
    var board = {
        1: ' ',
        2: ' ',
        3: ' ',
        4: ' ',
        5: ' ',
        6: ' ',
        7: ' ',
        8: ' ',
        9: ' '
    };
    return board;
}

function isInt(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

function validateMove(board, position) {
    return (isInt(position) && board[position] === ' ');
}

function make_move(board, position, mark) {
    board[position] = mark.toUpperCase();
    return board;
}

function get_move(board, current_player_id, algorithm_name) {
    var position;
    if (algorithm_name == 'random_ai') {
        position = ai.random_ai();
    } else if (algorithm_name == 'find_winning_move_ai') {
        position = ai.findWinningMove_ai(board, current_player_id);
    } else if (algorithm_name == 'human_player') {
        position = ai.human_player(current_player_id);
    } else if (algorithm_name == 'minimax_ai') {
        position = mm.minimax_ai(board, current_player_id);
    } else {
        throw new Error("Unknown algorithm_name: " + algorithm_name);
    }
    if (!validateMove(board, position)) {
        return get_move(board, current_player_id, algorithm_name);
    }
    return position;
}

function printBoard(board) {
    console.log('\n' +
        ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' --------- \n' +
        ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' --------- \n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n'
    );
}

// var winningCombinations = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//     [1, 4, 7],
//     [2, 5, 8],
//     [3, 6, 9],
//     [1, 5, 9],
//     [3, 5, 7]
// ];

// const checkWinner = function(player, board) {
//     var i, j, markCount;
//     for (i = 0; i < winningCombinations.length; i++) {
//         markCount = 0;
//         for (j = 0; j < winningCombinations[i].length; j++) {
//             if (board[winningCombinations[i][j]] === player) {
//                 markCount++;
//             }
//             if (markCount === 3) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }

// function checkTie(board) {
//     for (var i = 1; i <= Object.keys(board).length; i++) {
//         if (board[i] === ' ') {
//             return false;
//         }
//     }
//     return true;
// }

const play_game = function(p1_name, p2_name) {

    var board = new_board();
    var gameover = false;
    var turn_number = 0;

    while (!gameover) {

        if (turn_number % 2 == 0) {
            current_player_id = 'X';
            current_player_name = p1_name;
        } else {
            current_player_id = 'O';
            current_player_name = p2_name;
        }
        console.log('\x1b[36m%s\x1b[0m', current_player_id + " - " + current_player_name);
        //console.log("Your turn player: " + current_player_id + " - " + current_player_name);
        let position = get_move(board, current_player_id, current_player_name);

        if (validateMove(board, position) === true) {

            let new_board = make_move(board, position, current_player_id);
            printBoard(new_board);

            if (utils.checkWinner(current_player_id, new_board) === true) {
                console.log('\x1b[1m', "Player " + current_player_id + " - " + current_player_name + " Wins!");
                gameover = true;
                return;
            }

            if (utils.checkTie(new_board) === true) {
                console.log('\x1b[32m', 'Tie Game');
                return;
            }

            turn_number += 1;

        } else {
            console.log('\x1b[31m', "Incorrect input, please try again...");
        }
    }
}

console.log('\x1b[35m', "Welcome to Tic Tac Toe :) \n");
console.log('\x1b[32m', 'GAME STARTED... \n \n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');


module.exports = { play_game }