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

// Buttons
var rock = document.querySelector("#rock");
var paper = document.querySelector("#paper");
var scissors = document.querySelector("#scissors");

// Event Listeners
main.addEventListener('click', getChoice)

// Global Variables

var gameData = {
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

// pass in game
// check for draw
// check win conditions
// update isWinner value
// return status (maybe another function)

function getResult(game, choice) {
    if (choice === game.computer.choice) {
        return `DRAW! You both chose ${choice}.`// updateStatus(draw)
    }
    else if (choice === 'Rock' && game.computer.choice === 'Scissors') {
        game.human.isWinner = true
        return `You win! Rock beats Scissors.` // updateStatus(win)
    }
    else if (choice === 'Paper' && game.computer.choice === 'Rock') {
        game.human.isWinner = true
        return `You win! Paper beats Rock.` // updateStatus(win)
    }
    else if (choice === 'Scissors' && game.computer.choice === 'Paper') {
        game.human.isWinner = true
        return `You win! Scissors beats paper.` // updateStatus(win)
    } else {
        return `You lose. ${game.computer.choice} beats ${choice}.`
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

function getChoice(event) {
    var choice = event.target.getAttribute("id")
    if (choice) {
        human = createPlayer('Human', choice)
        computer = createPlayer('Computer', 'Paper')
        var game = createGame(human, computer)
        console.log(getResult(game, choice))
        updateScore(game)
        resetGame(game)
    }
}