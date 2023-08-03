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
    playerScore: 0,
    computerScore: 0
}

// getChoice function
var human = createPlayer('Human', 'Rock')
var computer = createPlayer('Computer', 'Scissors')

// variables for tokens?
// var rock = 
// var paper =
// var scissors = 

// Game logic:
// Rock beats Scissors
// Scissors beats Paper
// Paper beats Rock

// Score and status update:
// Update win counter

// Reset and play again


// Functions
function createPlayer(name, choice) {
    var player = {
        name: name,
        choice: choice,
    }
    return player
}

function createGame(human, computer) {
    var game = {
        human: {
            choice: human.choice,
            isWinner: false,
        },
        computer: {
            choice: computer.choice,
            isWinner: false,
        }
    }
    return game
}

// get game instance
var game = createGame(human, computer)

// pass in game
// check for draw
// check win conditions
// update isWinner value
// return status (maybe another function)

function getResult(game) {
    if (game.human.choice === game.computer.choice) {
        return `DRAW! You both chose ${game.human.choice}.`// updateStatus(draw)
    }
    else if (game.human.choice === 'Rock' && game.computer.choice === 'Scissors') {
        game.human.isWinner = true
        return `You win! Rock beats Scissors.` // updateStatus(win)
    }
    else if (game.human.choice === 'Paper' && game.computer.choice === 'Rock') {
        game.human.isWinner = true
        return `You win! Paper beats Rock.` // updateStatus(win)
    }
    else if (game.human.choice === 'Scissors' && game.computer.choice === 'Paper') {
        game.human.isWinner = true
        return `You win! Scissors beats paper.` // updateStatus(win)
    } else {
        return `You lose. ${game.computer.choice} beats ${game.human.choice}.`
    }
}

// update score and status
function updateScore(game) {
    if (game.human.isWinner === true) {
        gameData.playerScore += 1
        return game
    } else if (game.computer.isWinner === false) {
        gameData.computerScore += 1
        return game
    }
}

// reset game
function resetGame(game) {
    game.human.isWinner = false
    game.computer.isWinner = false
    return game
}