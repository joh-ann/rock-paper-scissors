document.addEventListener('DOMContentLoaded', function () {

});

// Query Selectors
var playerScore = document.querySelector(".player-score");
var computerScore = document.querySelector(".computer-score");
var resultMsg = document.querySelector(".result");
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
            name: 'Human',
            choice: human.choice,
            isWinner: false,
        },
        computer: {
            name: 'Computer',
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
    var resDraw = `<strong>It's a DRAW!</strong> You both chose ${choice}.`
    var resWin = `<strong>You WIN!</strong> Computer chose ${compChoice}.`
    var resLoss = `<strong>You LOSE!</strong> Computer chose ${compChoice}.`

    if (choice === compChoice) {
        // return `DRAW! You both chose ${choice}.`
        updateStatus(resDraw)
    }
    else if (choice === 'Rock' && compChoice === 'Scissors') {
        game.human.isWinner = true
        // return `You win! Rock beats Scissors.`
        updateStatus(resWin)
    }
    else if (choice === 'Paper' && compChoice === 'Rock') {
        game.human.isWinner = true
        // return `You win! Paper beats Rock.`
        updateStatus(resWin)
    }
    else if (choice === 'Scissors' && compChoice === 'Paper') {
        game.human.isWinner = true
        // return `You win! Scissors beats paper.`
        updateStatus(resWin)
    } else {
        game.computer.isWinner = true
        // return `You lose. ${compChoice} beats ${choice}.`
        updateStatus(resLoss)
    }
}

// update score and status
function updateScore(game) {
    if (game.human.isWinner === true && game.computer.isWinner === false) {
        var human = game.human
        gameData.playerScore += 1
        updateWins(human)
        return game
    }
    if (game.human.isWinner === false && game.computer.isWinner === true) {
        var computer = game.computer
        gameData.computerScore += 1
        updateWins(computer)
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

function updateStatus(result) {
    resultMsg.innerHTML = result
}

function updateWins(winner) {
    if (winner.name === 'Human') {
        playerScore.innerText = gameData.playerScore
        playerScore.style.color = 'green'
        computerScore.style.color = 'black'
    }
    if (winner.name === 'Computer') {
        computerScore.innerText = gameData.computerScore
        computerScore.style.color = 'green'
        playerScore.style.color = 'black'
    }
}
    