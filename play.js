const engine = require("./engine.js");

// For example:
// node play.js random_ai minimax_ai
var args = process.argv.slice(2);

var player1_name = args[0];
var player2_name = args[1];

engine.play_game(player1_name, player2_name);