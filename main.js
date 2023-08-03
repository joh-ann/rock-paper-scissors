document.addEventListener('DOMContentLoaded', function () {

});

// Query Selectors
var playerScore = document.querySelector(".player-score");
var computerScore = document.querySelector(".computer-score");
var prompt = document.querySelector(".status"); // status
var changeGameBtn = document.querySelector(".change-game"); // button
var intro = document.querySelector(".intro");
var choose = document.querySelector(".choose");
var main = document.querySelector("main");

// Event Listeners


// Global Variables

var gameData = {
    choices: ["rock", "paper", "scissors"],
    playerScore: 0,
    computerScore: 0
}

// Game logic:
// Rock beats Scissors
// Scissors beats Paper
// Paper beats Rock

// Score and status update:
// Update win counter

// Reset and play again


// Functions
function createPlayer(name, token, wins) {
    var player = {
        name: name,
        token: token,
        wins: wins || 0,
    }
    return player
}