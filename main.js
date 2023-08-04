document.addEventListener('DOMContentLoaded', function () {

});

// Query Selectors
var playerScore = document.querySelector(".player-score");
var computerScore = document.querySelector(".computer-score");
var result = document.querySelector(".result");
var changeGameBtn = document.querySelector(".change-game");
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

function getResult(game, choice, compChoice) {
    if (choice === compChoice) {
        return `DRAW! You both chose ${choice}.`// updateStatus(draw)
    }
    else if (choice === 'Rock' && compChoice === 'Scissors') {
        game.human.isWinner = true
        return `You win! Rock beats Scissors.` // updateStatus(win)
    }
    else if (choice === 'Paper' && compChoice === 'Rock') {
        game.human.isWinner = true
        return `You win! Paper beats Rock.` // updateStatus(win)
    }
    else if (choice === 'Scissors' && compChoice === 'Paper') {
        game.human.isWinner = true
        return `You win! Scissors beats paper.` // updateStatus(win)
    } else {
        game.computer.isWinner = true
        return `You lose. ${compChoice} beats ${choice}.`
    }
}

// update score and status
function updateScore(game) {
    if (game.human.isWinner === true && game.computer.isWinner === false) {
        gameData.playerScore += 1
        return game
    }
    if (game.human.isWinner === false && game.computer.isWinner === true) {
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
    var compChoice = getComputerChoice()
    if (choice) {
        human = createPlayer('Human', choice)
        computer = createPlayer('Computer', compChoice)
        var game = createGame(human, computer)
        console.log(getResult(game, choice, compChoice))
        updateScore(game)
        resetGame(game)
    }
}

function getComputerChoice() {
    var rps = ["Rock", "Paper", "Scissors"]
    var randomIndex = Math.floor(Math.random() * rps.length)
    var compChoice = rps[randomIndex]
    console.log(compChoice)
    return compChoice
}